import prisma from '../config/prisma.js';

// ============================================
// PARTNER: SUBMIT PRODUCT
// ============================================

export const submitProduct = async (
  partnerId: string,
  data: {
    name: string;
    description: string;
    category: string;
    price: number;
    images: string[];
  }
) => {
  return prisma.partnerSubmission.create({
    data: {
      partnerId,
      ...data,
    },
  });
};

// ============================================
// PARTNER: MY SUBMISSIONS
// ============================================

export const listMySubmissions = async (partnerId: string) => {
  return prisma.partnerSubmission.findMany({
    where: { partnerId },
    orderBy: { createdAt: 'desc' },
  });
};

// ============================================
// ADMIN: LIST ALL SUBMISSIONS
// ============================================

export const listAllSubmissions = async (status?: string) => {
  return prisma.partnerSubmission.findMany({
    where: status ? { status: status as any } : {},
    include: {
      partner: { select: { id: true, email: true, name: true } },
    },
    orderBy: { createdAt: 'desc' },
  });
};

// ============================================
// ADMIN: REVIEW SUBMISSION
// ============================================

export const reviewSubmission = async (
  submissionId: string,
  status: 'APPROVED' | 'REJECTED',
  adminNote?: string
) => {
  return prisma.$transaction(async (tx) => {
    const submission = await tx.partnerSubmission.update({
      where: { id: submissionId },
      data: {
        status,
        adminNote,
        reviewedAt: new Date(),
      },
    });

    // If approved → create a Product
    if (status === 'APPROVED') {
      // Build a unique slug
      const baseSlug = submission.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
      const uniqueSlug = `${baseSlug}-${submission.id.slice(-6)}`;

      const product = await tx.product.create({
        data: {
          name: submission.name,
          slug: uniqueSlug,
          description: submission.description,
          price: submission.price,
          stock: 0, // Partner decides stock later, or admin updates
          images: submission.images,
          isActive: true,
        },
      });

      await tx.partnerSubmission.update({
        where: { id: submissionId },
        data: { approvedProductId: product.id },
      });
    }

    return submission;
  });
};