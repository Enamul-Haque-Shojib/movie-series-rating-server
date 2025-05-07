import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { AdminActionServices } from "./AdminAction.service";


const editorPick = catchAsync(async (req, res) => {
    const result = await AdminActionServices.editorPickIntoDB(req.params.id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Top rated retrieved successfully!",
        data: result
    });
});

export const AdminActionControllers = {

    editorPick
}