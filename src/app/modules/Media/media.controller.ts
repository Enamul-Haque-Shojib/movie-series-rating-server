import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { MediaServices } from "./media.service";
import pick from "../../shared/pick";
import { mediaFilterableFields } from "./media.constant";



const addMedia = catchAsync(async (req, res) => {
    const result = await MediaServices.addMediaIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Media added successfully!",
        data: result
    });
});
const updateMedia = catchAsync(async (req, res) => {
    const result = await MediaServices.updateMediaIntoDB(req.params.id, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Media updated successfully!",
        data: result
    });
});

const getAllMedia = catchAsync(async (req, res) => {
    const filters = pick(req.query, mediaFilterableFields);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  
    const result = await MediaServices.getAllMediaFromDB(filters, options);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Media retrieval successfully',
      meta: result.meta,
      data: result.data,
    });
  });

  const getOneMedia = catchAsync(async (req, res) => {

    const { id } = req.params;
    const result = await MediaServices.getOneMediaFromDB(id);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Media retrieval successfully',
      data: result,
    });
  });
  const deleteMedia = catchAsync(async (req, res) => {

    const { id } = req.params;
    const result = await MediaServices.deleteMediaFromDB(id);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Media deleted successfully',
      data: result,
    });
  });


export const MediaControllers = {
    addMedia,
    updateMedia,
    getAllMedia,
    getOneMedia,
    deleteMedia
}
