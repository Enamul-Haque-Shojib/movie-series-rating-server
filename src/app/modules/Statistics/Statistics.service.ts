import prisma from "../../shared/prisma";



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



export const getEditorsPicksFromDB = async () => {
  
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



export const StatisticsServices = {
    getTopRatedThisWeekFromDB,
    getNewlyAddedFromDB,
    getEditorsPicksFromDB
}
