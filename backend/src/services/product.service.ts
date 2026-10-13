import prisma from '../config/prisma.js';

export const listProducts = async (filters: {
  categoryId?: string;
  search?: string;
  isActive?: boolean;
}) => {
  return prisma.product.findMany({
    where: {
      ...(filters.isActive !== undefined && { isActive: filters.isActive }),
      ...(filters.categoryId && { categoryId: filters.categoryId }),
      ...(filters.search && {
        OR: [
          { name: { contains: filters.search, mode: 'insensitive' } },
          { description: { contains: filters.search, mode: 'insensitive' } },
        ],
      }),
    },
    include: { category: true },
    orderBy: { createdAt: 'desc' },
  });
};

export const getProductById = async (id: string) => {
  return prisma.product.findUnique({
    where: { id },
    include: { category: true },
  });
};

export const getProductBySlug = async (slug: string) => {
  return prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  });
};

export const createProduct = async (data: any) => {
  return prisma.product.create({
    data,
    include: { category: true },
  });
};

export const updateProduct = async (id: string, data: any) => {
  return prisma.product.update({
    where: { id },
    data,
    include: { category: true },
  });
};

export const deleteProduct = async (id: string) => {
  return prisma.product.delete({ where: { id } });
};

// Categories
export const listCategories = async () => {
  return prisma.category.findMany({ orderBy: { name: 'asc' } });
};

export const createCategory = async (data: any) => {
  return prisma.category.create({ data });
};