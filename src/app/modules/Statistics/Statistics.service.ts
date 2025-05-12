import prisma from "../../shared/prisma";



const getTotalMediaStatisticsForAdmin = async () => {
  // Count total movies
  const totalMovies = await prisma.media.count({
    where: { status: 'MOVIE', isDeleted: false },
  });

  // Count total series
  const totalSeries = await prisma.media.count({
    where: { status: 'SERIES', isDeleted: false },
  });

  // Total purchases (BUY + RENT)
  const totalPurchasedMedia = await prisma.purchase.count();

  // Average media rating
  const averageMediaRatingResult = await prisma.media.aggregate({
    _avg: {
      rating: true,
    },
    where: {
      isDeleted: false,
    },
  });

  // Average review rating
  const averageReviewRatingResult = await prisma.review.aggregate({
    _avg: {
      rating: true,
    },
    where: {
      isDeleted: false,
      approved: true,
      published: true,
    },
  });

  // Total users
  const totalUsers = await prisma.auth.count({
    where: {
      role: 'USER',
      status: 'ACTIVE',
    },
  });

  return {
    totalMovies,
    totalSeries,
    totalPurchasedMedia,
    averageMediaRating: averageMediaRatingResult._avg.rating ?? 0,
    averageReviewRating: averageReviewRatingResult._avg.rating ?? 0,
    totalUsers,
  };
};

const getTotalMediaStatisticsForUser = async (userId: string) => {
  // Total purchased movies
  const totalPurchasedMovies = await prisma.purchase.count({
    where: {
      userId,
      media: {
        status: 'MOVIE',
        isDeleted: false,
      },
    },
  });

  // Total purchased series
  const totalPurchasedSeries = await prisma.purchase.count({
    where: {
      userId,
      media: {
        status: 'SERIES',
        isDeleted: false,
      },
    },
  });

  // Total watchlist items
  const totalWatchlist = await prisma.watchList.count({
    where: { userId },
  });

  // Total published reviews
  const totalPublishedReviews = await prisma.review.count({
    where: {
      userId,
      published: true,
      isDeleted: false,
    },
  });

  // Total unpublished reviews
  const totalUnpublishedReviews = await prisma.review.count({
    where: {
      userId,
      published: false,
      isDeleted: false,
    },
  });

  return {
    totalPurchasedMovies,
    totalPurchasedSeries,
    totalWatchlist,
    totalPublishedReviews,
    totalUnpublishedReviews,
  };
};


const getHighestRatedMovieFromDB = async () => {
  const topRatedMovie = await prisma.media.findMany({
    where: {
      isDeleted: false,
       status: 'MOVIE'
    },
    orderBy: {
      rating: 'desc',
    },
    take: 10,
  });

  return topRatedMovie;
};

const getHighestRatedSeriesFromDB = async () => {
  const topRatedSeries = await prisma.media.findMany({
    where: {
      isDeleted: false,
       status: 'SERIES'
    },
    orderBy: {
      rating: 'desc',
    },
    take: 10,
  });

  return topRatedSeries;
};


const getTopRatedThisWeekFromDB = async () => {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const topRated = await prisma.media.findMany({
    where: {
      createdAt: {
        gte: oneWeekAgo,
      },
      isDeleted: false,
    },
    orderBy: {
      rating: 'desc',
    },
    take: 10,
  });

  return topRated;
};


const getNewlyAddedFromDB = async () => {

    const newlyAdded = await prisma.media.findMany({
      where: {
        isDeleted: false,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 10, // Limit to latest 10 entries
    });

    return newlyAdded;
 
};



const getEditorsPicksFromDB = async () => {
  
    const picks = await prisma.media.findMany({
      where: {
        isEditorsPick: true,
        isDeleted: false,
      },
      orderBy: {
        updatedAt: 'desc',
      },
      take: 10, 
    });

    return picks;
 
};

const addEditorPicksIntoDB = async (id: string, payload: {isEditorsPick:boolean}) => {
  
    const picks = await prisma.media.update({
      where: {
        id,
        isDeleted: false,
      },
      data: payload
    });

    return picks;
 
};
const removeEditorPicksIntoDB = async (id: string, payload: {isEditorsPick:boolean}) => {
  
    const picks = await prisma.media.update({
      where: {
        id,
        isDeleted: false,
      },
      data: payload
    });

    return picks;
 
};



export const StatisticsServices = {
    getTopRatedThisWeekFromDB,
    getNewlyAddedFromDB,
    getEditorsPicksFromDB,
    addEditorPicksIntoDB,
    removeEditorPicksIntoDB,
    getHighestRatedSeriesFromDB,
    getHighestRatedMovieFromDB,
    getTotalMediaStatisticsForAdmin,
    getTotalMediaStatisticsForUser
}
