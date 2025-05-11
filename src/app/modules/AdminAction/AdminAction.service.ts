import prisma from "../../shared/prisma";



const editorPickIntoDB = async (id: string)  => {

  
    const newlyAdded = await prisma.media.update({
        where: { id },
        data: { isEditorsPick: true },
      });

    return newlyAdded;
 
};
const approveReviewIntoDB = async (id: string, payload:{approved:boolean})  => {

  
    const reviewUpdate = await prisma.review.update({
        where: { id },
        // data: { approved: true },
        data: payload,
      });


       const allReviews = await prisma.review.findMany({
    where: {
      mediaId: reviewUpdate.mediaId,
      isDeleted: false,
      approved: true, // Optional: only include approved reviews
    },
    select: {
      rating: true,
    },
  });

  // Calculate average rating
  const totalRating = allReviews.reduce((sum, r) => sum + r.rating, 0);
  const averageRating = allReviews.length > 0 ? totalRating / allReviews.length : 0;


  // Update Media with new average rating
  await prisma.media.update({
    where: { 
      id: reviewUpdate.mediaId
     },
    data: { rating: averageRating },
  });


    return reviewUpdate;
 
};
const publishReviewIntoDB = async (id: string, payload:{published:boolean})  => {

    const reviewUpdate = await prisma.review.update({
        where: { id },
        // data: { published: true },
        data: payload,
      });

    return reviewUpdate;
 
};
const unpublishReviewIntoDB = async (id: string, payload:{published:boolean})  => {

    const reviewUpdate = await prisma.review.update({
        where: { id },
        // data: { published: false },
        data: payload,
      });

    return reviewUpdate;
 
};

const deleteReviewFromDB = async (id: string) => {
  const result = await prisma.$transaction(async (tx) => {
    await tx.reviewLike.deleteMany({
      where: {
        reviewId: id
      }
    });

    await tx.reviewComment.deleteMany({
      where: {
        reviewId: id
      }
    });

    const deleteReview = await tx.review.delete({
      where: { id },
    });
    return deleteReview;

  });

  return result;
};


const getAllReviewFromDB = async ()  => {

    const reviewDelete = await prisma.review.findMany({
     
      include:{
        user: true,
        media: true,
        
      }
      
    });

    return reviewDelete;
 
};

export const AdminActionServices = {
  editorPickIntoDB,
  approveReviewIntoDB,
  publishReviewIntoDB,
  unpublishReviewIntoDB,
  deleteReviewFromDB,
  getAllReviewFromDB
}


  