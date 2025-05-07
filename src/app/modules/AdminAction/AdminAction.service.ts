import prisma from "../../shared/prisma";



const editorPickIntoDB = async (id: string)  => {

  
    const newlyAdded = await prisma.media.update({
        where: { id },
        data: { isEditorsPick: true },
      });

    return newlyAdded;
 
};

export const AdminActionServices = {
  editorPickIntoDB
}


  