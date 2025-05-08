import prisma from "../../shared/prisma";



const editorPickIntoDB = async (id: string)  => {

  
    const newlyAdded = await prisma.media.update({
        where: { id },
        data: { isEditorsPick: true },
      });

    return newlyAdded;
 
};
const approveReviewIntoDB = async (id: string)  => {

  
    const reviewUpdate = await prisma.review.update({
        where: { id },
        data: { approved: true },
      });

    return reviewUpdate;
 
};
const publishReviewIntoDB = async (id: string)  => {

    const reviewUpdate = await prisma.review.update({
        where: { id },
        data: { published: true },
      });

    return reviewUpdate;
 
};
const unpublishReviewIntoDB = async (id: string)  => {

    const reviewUpdate = await prisma.review.update({
        where: { id },
        data: { published: false },
      });

    return reviewUpdate;
 
};

const deleteReviewFromDB = async (id: string)  => {

    const reviewDelete = await prisma.review.delete({
        where: { id },
      });

    return reviewDelete;
 
};

export const AdminActionServices = {
  editorPickIntoDB,
  approveReviewIntoDB,
  publishReviewIntoDB,
  unpublishReviewIntoDB,
  deleteReviewFromDB
}


  