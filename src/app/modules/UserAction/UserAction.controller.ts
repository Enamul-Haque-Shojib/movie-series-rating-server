import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { UserActionServices } from "./UserAction.service";



const addReview = catchAsync(async (req, res) => {
    const result = await UserActionServices.addReviewIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Review added successfully!",
        data: result
    });
});
const addWatchList = catchAsync(async (req, res) => {
    const result = await UserActionServices.addWatchListIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "watch list added successfully!",
        data: result
    });
});
const addLike = catchAsync(async (req, res) => {
    const result = await UserActionServices.addLikeIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Like added successfully!",
        data: result
    });
});
const addUnLike = catchAsync(async (req, res) => {
    const result = await UserActionServices.addUnLikeIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Unlike added successfully!",
        data: result
    });
});
const addComment = catchAsync(async (req, res) => {
    const result = await UserActionServices.addCommentIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Comment added successfully!",
        data: result
    });
});
const addReviewComment = catchAsync(async (req, res) => {
    const result = await UserActionServices.addReviewCommentIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Review Comment added successfully!",
        data: result
    });
});
const addReviewLike = catchAsync(async (req, res) => {
    const result = await UserActionServices.addReviewLikeIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Review Like added successfully!",
        data: result
    });
});
const getAllCommentsByMediaId = catchAsync(async (req, res) => {
    const result = await UserActionServices.getCommentsByMediaIdFromDB(req.params.id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "All comments retrieved successfully!",
        data: result
    });
});
const getReviewCommentsByReviewId = catchAsync(async (req, res) => {
    const result = await UserActionServices.getReviewCommentsByMediaIdFromDB(req.params.id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "All comments retrieved successfully!",
        data: result
    });
});
const getAllWatchListByUserId = catchAsync(async (req, res) => {
    const result = await UserActionServices.getAllWatchListByUserIdFromDB(req.params.id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "watch list retrieved successfully!",
        data: result
    });
});
const getAllReviewByMediaId = catchAsync(async (req, res) => {
    const result = await UserActionServices.getAllReviewByMediaIdFromDB(req.params.id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Review retrieved successfully!",
        data: result
    });
});

const deleteReview = catchAsync(async (req, res) => {
    const result = await UserActionServices.deleteReviewFromDB(req.params.id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Review deleted successfully!",
        data: result
    });
});

export const UserActionControllers = {
    addWatchList,
    getAllWatchListByUserId,
    addLike,
    addComment,
    addUnLike,
    getAllCommentsByMediaId,
    addReview,
    getAllReviewByMediaId,
    deleteReview,
    addReviewComment,
    addReviewLike,
    getReviewCommentsByReviewId
}