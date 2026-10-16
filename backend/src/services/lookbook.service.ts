import prisma from '../config/prisma.js';

// ============================================
// PUBLIC
// ============================================

export const listLookbooks = async () => {
  return prisma.lookbook.findMany({
    where: { isActive: true },
    include: {
      hotspots: {
        include: {
          product: {
            select: {
              id: true,
              name: true,
              slug: true,
              price: true,
              images: true,
            },
          },
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });
};

export const getLookbookById = async (id: string) => {
  return prisma.lookbook.findUnique({
    where: { id },
    include: {
      hotspots: {
        include: { product: true },
      },
    },
  });
};

// ============================================
// ADMIN
// ============================================

export const createLookbook = async (data: {
  title: string;
  imageUrl: string;
  isActive: boolean;
  hotspots: { productId: string; x: number; y: number }[];
}) => {
  const { hotspots, ...rest } = data;

  return prisma.lookbook.create({
    data: {
      ...rest,
      hotspots: { create: hotspots },
    },
    include: {
      hotspots: { include: { product: true } },
    },
  });
};

export const updateLookbook = async (id: string, data: any) => {
  const { hotspots, ...rest } = data;

  if (hotspots) {
    await prisma.lookbookHotspot.deleteMany({ where: { lookbookId: id } });
  }

  return prisma.lookbook.update({
    where: { id },
    data: {
      ...rest,
      ...(hotspots && { hotspots: { create: hotspots } }),
    },
    include: {
      hotspots: { include: { product: true } },
    },
  });
};

export const deleteLookbook = async (id: string) => {
  return prisma.lookbook.delete({ where: { id } });
};