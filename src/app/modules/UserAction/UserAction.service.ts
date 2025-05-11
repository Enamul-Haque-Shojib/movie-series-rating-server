import { Review, WatchList } from "@prisma/client";
import prisma from "../../shared/prisma";


const addReviewIntoDB = async (payload: Review) => {
  const { userId, mediaId } = payload;

  const isExistReview = await prisma.review.findUnique({
    where: {
      user_media_review_unique: {
        userId,
        mediaId,
        isDeleted: false,
      },
    },
  });

  if (isExistReview) {
    throw new Error("You have already added a review for this media.");
  }

  // Create new review
  const newReview = await prisma.review.create({
    data: {
      userId,
      mediaId,
      content: payload.content,
      tags: payload.tags,
      spoiler: payload.spoiler,
      rating: payload.rating,
    },
  });



  return newReview;
};


const addWatchListIntoDB = async (payload: { userId: string; mediaId: string }) => {
  const isExistMedia = await prisma.watchList.findUnique({
    where: {
      userId_mediaId: {
        userId: payload.userId,
        mediaId: payload.mediaId,
      },
    },
  });

  if (isExistMedia) {
    throw new Error("You have already added this to your watchlist");
  }

  const result = await prisma.watchList.create({
    data: {
      userId: payload.userId,
      mediaId: payload.mediaId,
    },
  });

  return result;
};


const addLikeIntoDB = async (payload: { userId: string; mediaId: string }) => {
  // Step 1: Check if the user already liked the media
  const isExistLike = await prisma.like.findUnique({
    where: {
      user_media_like_unique: {
        userId: payload.userId,
        mediaId: payload.mediaId,
      },
    },
  });

  if (isExistLike) {
    throw new Error("You have already liked this media");
  }

  // Step 2: Check if the user has unliked the media
  const isExistUnLike = await prisma.unlike.findUnique({
    where: {
      user_media_unlike_unique: {
        userId: payload.userId,
        mediaId: payload.mediaId,
      },
    },
  });

  // Step 3: If unlike exists, remove it
  if (isExistUnLike) {
    await prisma.unlike.delete({
      where: {
        user_media_unlike_unique: {
          userId: payload.userId,
          mediaId: payload.mediaId,
        },
      },
    });
  }

  // Step 4: Create like entry
  const result = await prisma.like.create({
    data: {
      userId: payload.userId,
      mediaId: payload.mediaId,
    },
  });

  return result;
};

const addUnLikeIntoDB = async (payload: { userId: string; mediaId: string, reviewId: string }) => {
  // Step 1: Check if the user already unliked the media
  const isExistUnLike = await prisma.unlike.findUnique({
    where: {
      user_media_unlike_unique: {
        userId: payload.userId,
        mediaId: payload.mediaId,
      },
    },
  });

  if (isExistUnLike) {
    throw new Error("You have already unliked this media");
  }

  // Step 2: Check if the user has liked the media
  const isExistLike = await prisma.like.findUnique({
    where: {
      user_media_like_unique: {
        userId: payload.userId,
        mediaId: payload.mediaId,
      },
    },
  });

  // Step 3: If like exists, remove it
  if (isExistLike) {
    await prisma.like.delete({
      where: {
        user_media_like_unique: {
          userId: payload.userId,
          mediaId: payload.mediaId,
        },
      },
    });
  }

  // Step 4: Create unlike entry
  const result = await prisma.unlike.create({
    data: {
      userId: payload.userId,
      mediaId: payload.mediaId,
    },
  });

  return result;
};

const addCommentIntoDB = async (payload: { userId: string; mediaId: string; userComment: string }) => {
  
  const result = await prisma.comment.create({
    data: {
      userId: payload.userId,
      mediaId: payload.mediaId,
      userComment: payload.userComment
    },
  });

  return result;
};

const addReviewLikeIntoDB = async (payload: { userId: string; reviewId: string }) => {
  
  console.log(payload)
  const isExistLike = await prisma.reviewLike.findUnique({
    where: {
      user_review_like_unique: {
        userId: payload.userId,
        reviewId: payload.reviewId,
      },
    },
  });

  if (isExistLike) {
    throw new Error("You have already liked this review");
  }

  const result = await prisma.reviewLike.create({
    data: {
      userId: payload.userId,
      reviewId: payload.reviewId,
    },
  });

  return result;
};
const addReviewCommentIntoDB = async (payload: { userId: string; reviewId: string; userComment: string }) => {
  
  const result = await prisma.reviewComment.create({
    data: {
      userId: payload.userId,
      reviewId: payload.reviewId,
      userComment: payload.userComment
    },
  });

  return result;
};

const getCommentsByMediaIdFromDB = async (id: string): Promise<any[]> => {
  const result = await prisma.comment.findMany({
    where: {
      mediaId: id,
    },
    select: {
      id: true,
      userComment: true,
      createdAt: true,
      user: {
        select: {
          name: true,
          photoUrl: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return result;
};
const getReviewCommentsByMediaIdFromDB = async (id: string): Promise<any[]> => {
  const result = await prisma.reviewComment.findMany({
    where: {
      reviewId: id,
    },
    select: {
      id: true,
      userComment: true,
      createdAt: true,
      user: {
        select: {
          name: true,
          photoUrl: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return result;
};


const getAllWatchListByUserIdFromDB = async (userId: string)=> {
    const result = await prisma.watchList.findMany({
      where: {
        userId,
      },
      include: {
        media: true, // This fetches the full media info for each watchlist item
      },
    });
  
    return result;
  };

const getAllReviewByMediaIdFromDB = async (mediaId: string) => {
    const result = await prisma.review.findMany({
      where: {
        mediaId,
        approved: true,
        published: true,
        isDeleted: false
      },
      include: {
        user: true,
        reviewLike: true,
        reviewComment: true
      },
    });
  
    return result;
  };
const getAllReviewByUserIdFromDB = async (userId: string) => {
    const result = await prisma.review.findMany({
      where: {
        userId,
        isDeleted: false
      },
      include: {
        user: true,
        media: true,
        reviewLike: true,
        reviewComment: true
      },
    });
  
    return result;
  };

  const deleteReviewFromDB = async (id: string)  => {

    const reviewDelete = await prisma.review.update({
        where: { 
          id,
          published: false
         },
         data:{isDeleted: true}
      });

    return reviewDelete;
 
};
  const getReviewFromDB = async (id: string)  => {

    const reviewData = await prisma.review.findUnique({
        where: { 
          id,
          published: false
         },
      });

    return reviewData;
 
};

  const updateReviewIntoDB = async (id: string, payload: Partial<Review>)  => {

    const reviewData = await prisma.review.update({
        where: { 
          id,
         },
         data: payload
      });

    return reviewData;
 
};
  


export const UserActionServices = {
    addWatchListIntoDB,
    getAllWatchListByUserIdFromDB,
    addLikeIntoDB,
    addUnLikeIntoDB,
    addCommentIntoDB,
    getCommentsByMediaIdFromDB,
    addReviewIntoDB,
    getAllReviewByMediaIdFromDB,
    deleteReviewFromDB,
    addReviewCommentIntoDB,
    addReviewLikeIntoDB,
    getReviewCommentsByMediaIdFromDB,
    getAllReviewByUserIdFromDB,
    getReviewFromDB,
    updateReviewIntoDB
    
}
