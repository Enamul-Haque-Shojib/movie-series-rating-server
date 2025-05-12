import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { AdminActionServices } from "./AdminAction.service";


const editorPick = catchAsync(async (req, res) => {
    const result = await AdminActionServices.editorPickIntoDB(req.params.id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "editor pick  successfully!",
        data: result
    });
});
const approveReview = catchAsync(async (req, res) => {
    const result = await AdminActionServices.approveReviewIntoDB(req.params.id, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "review approved successfully!",
        data: result
    });
});
const publishReview = catchAsync(async (req, res) => {
    const result = await AdminActionServices.publishReviewIntoDB(req.params.id, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "review published successfully!",
        data: result
    });
});

const unpublishReview = catchAsync(async (req, res) => {
    const result = await AdminActionServices.unpublishReviewIntoDB(req.params.id, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "review unpublished successfully!",
        data: result
    });
});
const deleteReview = catchAsync(async (req, res) => {
    const result = await AdminActionServices.deleteReviewFromDB(req.params.id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Review deleted successfully!",
        data: result
    });
});

const getAllReviews = catchAsync(async (req, res) => {
    const result = await AdminActionServices.getAllReviewFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Reviews retrieved successfully!",
        data: result
    });
});

export const AdminActionControllers = {
getAllReviews,
    editorPick,
    approveReview,
    unpublishReview,
    publishReview,
    deleteReview
}