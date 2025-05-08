import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { AdminUserActionServices } from "./AdminUserAction.service";


const deleteReview = catchAsync(async (req, res) => {
    const result = await AdminUserActionServices.deleteReviewFromDB(req.params.id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Review deleted successfully!",
        data: result
    });
});

export const AdminUserActionControllers = {

}