import httpStatus from "http-status";
import sendResponse from "../../shared/sendResponse";
import catchAsync from "../../shared/catchAsync";
import { StatisticsServices } from "./Statistics.service";



const getTopRatedThisWeek = catchAsync(async (req, res) => {
    const result = await StatisticsServices.getTopRatedThisWeekFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Top rated retrieved successfully!",
        data: result
    });
});

const getNewlyAdded = catchAsync(async (req, res) => {
    const result = await StatisticsServices.getNewlyAddedFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Newly added retrieved successfully!",
        data: result
    });
});
const getEditorsPicks = catchAsync(async (req, res) => {
    const result = await StatisticsServices.getEditorsPicksFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Editor Picks retrieved successfully!",
        data: result
    });
});

export const StatisticsControllers = {
    getTopRatedThisWeek,
    getNewlyAdded,
    getEditorsPicks
}