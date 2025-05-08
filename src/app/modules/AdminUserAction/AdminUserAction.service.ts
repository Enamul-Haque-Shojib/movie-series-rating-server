import prisma from "../../shared/prisma";

const deleteReviewFromDB = async (id: string)  => {

    const reviewDelete = await prisma.review.delete({
        where: { id },
      });

    return reviewDelete;
 
};

export const AdminUserActionServices = {
    deleteReviewFromDB
}