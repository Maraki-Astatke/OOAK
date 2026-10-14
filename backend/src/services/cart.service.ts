import prisma from '../config/prisma.js';

// ============================================
// GET OR CREATE CART
// ============================================

export const getOrCreateCart = async (userId: string) => {
  let cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: { product: true },
        orderBy: { createdAt: 'asc' },
      },
    },
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: { userId },
      include: {
        items: {
          include: { product: true },
          orderBy: { createdAt: 'asc' },
        },
      },
    });
  }

  return cart;
};

// ============================================
// ADD ITEM
// ============================================

export const addItemToCart = async (
  userId: string,
  productId: string,
  quantity: number
) => {
  const cart = await getOrCreateCart(userId);

  // Check if product exists and is active
  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product || !product.isActive) {
    throw new Error('Product not found');
  }

  if (product.stock < quantity) {
    throw new Error('Not enough stock');
  }

  // Upsert: create or increment quantity
  const existing = await prisma.cartItem.findUnique({
    where: { cartId_productId: { cartId: cart.id, productId } },
  });

  if (existing) {
    return prisma.cartItem.update({
      where: { id: existing.id },
      data: { quantity: existing.quantity + quantity },
      include: { product: true },
    });
  }

  return prisma.cartItem.create({
    data: { cartId: cart.id, productId, quantity },
    include: { product: true },
  });
};

// ============================================
// UPDATE ITEM QUANTITY
// ============================================

export const updateCartItem = async (
  userId: string,
  itemId: string,
  quantity: number
) => {
  const cart = await getOrCreateCart(userId);

  const item = await prisma.cartItem.findUnique({
    where: { id: itemId },
  });

  if (!item || item.cartId !== cart.id) {
    throw new Error('Cart item not found');
  }

  if (quantity <= 0) {
    return prisma.cartItem.delete({ where: { id: itemId } });
  }

  return prisma.cartItem.update({
    where: { id: itemId },
    data: { quantity },
    include: { product: true },
  });
};

// ============================================
// REMOVE ITEM
// ============================================

export const removeCartItem = async (userId: string, itemId: string) => {
  const cart = await getOrCreateCart(userId);

  const item = await prisma.cartItem.findUnique({
    where: { id: itemId },
  });

  if (!item || item.cartId !== cart.id) {
    throw new Error('Cart item not found');
  }

  return prisma.cartItem.delete({ where: { id: itemId } });
};

// ============================================
// CLEAR CART
// ============================================

export const clearCart = async (userId: string) => {
  const cart = await getOrCreateCart(userId);
  return prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
};