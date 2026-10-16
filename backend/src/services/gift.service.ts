import prisma from '../config/prisma.js';

// ============================================
// PUBLIC
// ============================================

export const listGiftPackages = async () => {
  return prisma.giftPackage.findMany({
    where: { isActive: true },
    include: {
      items: {
        include: { product: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  });
};

export const getGiftPackageById = async (id: string) => {
  return prisma.giftPackage.findUnique({
    where: { id },
    include: {
      items: {
        include: { product: true },
      },
    },
  });
};

export const getGiftPackageBySlug = async (slug: string) => {
  return prisma.giftPackage.findUnique({
    where: { slug },
    include: {
      items: {
        include: { product: true },
      },
    },
  });
};

// ============================================
// ADMIN
// ============================================

export const createGiftPackage = async (data: {
  name: string;
  slug: string;
  description: string;
  price: number;
  images: string[];
  isActive: boolean;
  items: { productId: string; quantity: number }[];
}) => {
  const { items, ...rest } = data;

  return prisma.giftPackage.create({
    data: {
      ...rest,
      items: {
        create: items,
      },
    },
    include: {
      items: { include: { product: true } },
    },
  });
};

export const updateGiftPackage = async (id: string, data: any) => {
  const { items, ...rest } = data;

  // If items provided → replace them
  if (items) {
    await prisma.giftItem.deleteMany({ where: { packageId: id } });
  }

  return prisma.giftPackage.update({
    where: { id },
    data: {
      ...rest,
      ...(items && {
        items: { create: items },
      }),
    },
    include: {
      items: { include: { product: true } },
    },
  });
};

export const deleteGiftPackage = async (id: string) => {
  return prisma.giftPackage.delete({ where: { id } });
};