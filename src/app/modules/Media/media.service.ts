import { Media, Prisma } from "@prisma/client";
import prisma from "../../shared/prisma";
import { paginationHelper } from "../../helpars/paginationHelper";
import { IPaginationOptions } from "../../interfaces/pagination";
import { TMediaFilterRequest } from "./media.interface";
import { mediaSearchableFields } from "./media.constant";


const addMediaIntoDB = async (payload: Media) => {

let url = "";
if(payload.streamingPlatform==="netflix"){
  url = "https://www.netflix.com/bd/"
}else if(payload.streamingPlatform==="amazon_prime_video"){
  url = "https://www.primevideo.com/offers/nonprimehomepage/ref=dv_web_force_root"
}
    
    const result = await prisma.media.create({
        data: {
          ...payload,
          streamingLinks:url
        }
    })

    return result;
};


const updateMediaIntoDB = async (id: string, payload: Partial<Media>):Promise<Media> => {

    await prisma.media.findUniqueOrThrow({
        where: {
            id,
        }
    });

    let url = "";
if(payload.streamingPlatform==="netflix"){
  url = "https://www.netflix.com/bd/"
}else if(payload.streamingPlatform==="amazon_prime_video"){
  url = "https://www.primevideo.com/offers/nonprimehomepage/ref=dv_web_force_root"
}else{
  url="empty"
}
    
    const result = await prisma.media.update({
        where:{
            id
        },
        data: {
          ...payload,
          streamingLinks:url
        }
    })

    return result;
};


const getAllMediaFromDB = async (
    filters: TMediaFilterRequest,
    options: IPaginationOptions,
  ) => {
    const { limit, page, skip } = paginationHelper.calculatePagination(options);
    const { searchTerm, ...filterData } = filters;
  
   
    const andConditions = [];
  
    if (searchTerm) {
      andConditions.push({
        OR: mediaSearchableFields.map(field => ({
          [field]: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        })),
      });
    }
  
    if (Object.keys(filterData).length > 0) {
      andConditions.push({
        AND: Object.keys(filterData).map(key => {
          return {
            [key]: {
              equals: (filterData as any)[key],
            },
          };
        }),
      });
    }
    andConditions.push({
      isDeleted: false,
    });
  
    const whereConditions: Prisma.MediaWhereInput =
      andConditions.length > 0 ? { AND: andConditions } : {};
  
    const result = await prisma.media.findMany({
      where: whereConditions,
      skip,
      take: limit,
      orderBy:
        options.sortBy && options.sortOrder
          ? { [options.sortBy]: options.sortOrder }
          : {
            createdAt: 'desc',
          },
      include: {
        like: true,
        unlike: true,
        comment: true
        
      }
    });
    const total = await prisma.media.count({
      where: whereConditions,
    });
  
    return {
      meta: {
        total,
        page,
        limit,
      },
      data: result,
    };
  };

  const getOneMediaFromDB = async (id: string): Promise<Media | null> => {
    const result = await prisma.media.findUnique({
      where: {
        id,
        isDeleted: false,
      },
      include: {
        like: true,
        unlike: true,
        comment: true,
        review: true
      }
    });
    return result;
  };



  const deleteMediaFromDB = async (id: string) => {

    await prisma.media.findUniqueOrThrow({
        where: {
          id,
        }
    });
    
    const result = await prisma.media.update({
        where:{
            id
        },
        data:{isDeleted:true}
        
    })
return result;
    
};



export const MediaServices = {
    addMediaIntoDB,
    updateMediaIntoDB,
    getAllMediaFromDB,
    getOneMediaFromDB,
    deleteMediaFromDB
}