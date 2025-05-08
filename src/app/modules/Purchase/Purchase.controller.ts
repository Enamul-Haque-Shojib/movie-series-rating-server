import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { PurchaseServices } from "./Purchase.service";



const addPurchase = catchAsync(async (req, res) => {
    const result = await PurchaseServices.addPurchaseIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Purchase added successfully!",
        data: result
    });
});
const getAllPurchaseByUserId = catchAsync(async (req, res) => {
    const result = await PurchaseServices.getAllPurchaseByUserIdFromDB(req.params.id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Purchases retrieved by user id successfully!",
        data: result
    });
});
const getAllPurchase = catchAsync(async (req, res) => {
    const result = await PurchaseServices.getAllPurchaseFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Purchases retrieved successfully!",
        data: result
    });
});

export const PurchaseControllers = {
    addPurchase,
    getAllPurchaseByUserId,
    getAllPurchase
}