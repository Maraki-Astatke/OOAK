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

  const hasPreOrder = cart.items.some((item) => item.product.isPreOrder);

  let total = 0;
  for (const item of cart.items) {
    if (!item.product.isPreOrder && item.product.stock < item.quantity) {
      throw new Error(`Not enough stock for ${item.product.name}`);
    }
    total += Number(item.product.price) * item.quantity;
  }

  const depositAmount = hasPreOrder ? Number((total * 0.5).toFixed(2)) : null;
  const balanceDue = hasPreOrder
    ? Number((total - (depositAmount || 0)).toFixed(2))
    : null;

  const order = await prisma.$transaction(async (tx) => {
    const created = await tx.order.create({
      data: {
        userId,
        total,
        isPreOrder: hasPreOrder,
        depositAmount,
        balanceDue,
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

    for (const item of cart.items) {
      if (!item.product.isPreOrder) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } },
        });
      }
    }

    await tx.cartItem.deleteMany({ where: { cartId: cart.id } });

    return created;
  });

  return order;
};

// ============================================
// MARK BALANCE PAID
// ============================================

export const markBalancePaid = async (orderId: string) => {
  const order = await prisma.order.findUnique({ where: { id: orderId } });
  if (!order) throw new Error('Order not found');
  if (!order.isPreOrder) throw new Error('Not a pre-order');
  if (order.balancePaid) throw new Error('Balance already paid');

  return prisma.order.update({
    where: { id: orderId },
    data: {
      balancePaid: true,
      paymentStatus: 'PAID',
      status: 'CONFIRMED',
    },
    include: { items: true },
  });
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
      ...(filters.paymentStatus && {
        paymentStatus: filters.paymentStatus as any,
      }),
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

export const updateOrderStatus = async (orderId: string, status: string) => {
  return prisma.order.update({
    where: { id: orderId },
    data: { status: status as any },
    include: { items: true },
  });
};