import prisma from '../config/prisma.js';
import { getOrCreateCart } from './cart.service.js';

// ============================================
// CREATE ORDER FROM CART
// ============================================

export const createOrderFromCart = async (
  userId: string,
  shipping: {
    name: string;
    phone: string;
    address: string;
    notes?: string;
  }
) => {
  const cart = await getOrCreateCart(userId);

  if (!cart.items.length) {
    throw new Error('Cart is empty');
  }

  // Calculate total + check stock
  let total = 0;
  for (const item of cart.items) {
    if (item.product.stock < item.quantity) {
      throw new Error(`Not enough stock for ${item.product.name}`);
    }
    total += Number(item.product.price) * item.quantity;
  }

  // Create order + items in a transaction
  const order = await prisma.$transaction(async (tx) => {
    const created = await tx.order.create({
      data: {
        userId,
        total,
        shippingName: shipping.name,
        shippingPhone: shipping.phone,
        shippingAddr: shipping.address,
        notes: shipping.notes,
        items: {
          create: cart.items.map((item) => ({
            productId: item.productId,
            productName: item.product.name,
            price: item.product.price,
            quantity: item.quantity,
          })),
        },
      },
      include: { items: true },
    });

    // Deduct stock
    for (const item of cart.items) {
      await tx.product.update({
        where: { id: item.productId },
        data: { stock: { decrement: item.quantity } },
      });
    }

    // Clear cart
    await tx.cartItem.deleteMany({ where: { cartId: cart.id } });

    return created;
  });

  return order;
};

// ============================================
// LIST ORDERS (customer)
// ============================================

export const listUserOrders = async (userId: string) => {
  return prisma.order.findMany({
    where: { userId },
    include: { items: true },
    orderBy: { createdAt: 'desc' },
  });
};

// ============================================
// GET ORDER BY ID (must belong to user)
// ============================================

export const getUserOrderById = async (userId: string, orderId: string) => {
  return prisma.order.findFirst({
    where: { id: orderId, userId },
    include: { items: true },
  });
};

// ============================================
// ADMIN: LIST ALL ORDERS
// ============================================

export const listAllOrders = async (filters: {
  status?: string;
  paymentStatus?: string;
}) => {
  return prisma.order.findMany({
    where: {
      ...(filters.status && { status: filters.status as any }),
      ...(filters.paymentStatus && { paymentStatus: filters.paymentStatus as any }),
    },
    include: {
      items: true,
      user: { select: { id: true, email: true, name: true } },
    },
    orderBy: { createdAt: 'desc' },
  });
};

// ============================================
// ADMIN: GET ORDER BY ID
// ============================================

export const getOrderById = async (orderId: string) => {
  return prisma.order.findUnique({
    where: { id: orderId },
    include: {
      items: true,
      user: { select: { id: true, email: true, name: true } },
    },
  });
};

// ============================================
// ADMIN: UPDATE STATUS
// ============================================

export const updateOrderStatus = async (
  orderId: string,
  status: string
) => {
  return prisma.order.update({
    where: { id: orderId },
    data: { status: status as any },
    include: { items: true },
  });
};