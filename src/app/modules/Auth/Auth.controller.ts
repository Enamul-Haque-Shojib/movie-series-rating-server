import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
import { AuthServices } from "./Auth.service";
import sendResponse from "../../shared/sendResponse";


const registerAuth = catchAsync(async (req, res) => {

    const result = await AuthServices.registerAuthIntoDB(req);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Auth Created successfully!",
        data: result
    })
});
const loginAuth = catchAsync(async (req, res) => {

    const result = await AuthServices.loginAuthIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Auth logged in successfully!",
        data: result
    })
});


const getSingleAuth = catchAsync(async (req, res) => {
    const result = await AuthServices.getSingleAuthFromDB(req.params.email);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Auth one retrieved successfully',
      data: result,
    });
  });


const refreshToken = catchAsync(async (req, res) => {
    const { refreshToken } = req.cookies;

    const result = await AuthServices.refreshToken(refreshToken);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Access token genereted successfully!",
        data: result
    })
});

export const AuthControllers = {
    registerAuth,
    loginAuth,
    refreshToken,
    getSingleAuth
}