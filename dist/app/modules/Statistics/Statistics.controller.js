"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatisticsControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const sendResponse_1 = __importDefault(require("../../shared/sendResponse"));
const catchAsync_1 = __importDefault(require("../../shared/catchAsync"));
const Statistics_service_1 = require("./Statistics.service");
const getTotalStatisticsForAdmin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Statistics_service_1.StatisticsServices.getTotalMediaStatisticsForAdmin();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Total media statistics for admin retrieved successfully!",
        data: result
    });
}));
const getTotalStatisticsForUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Statistics_service_1.StatisticsServices.getTotalMediaStatisticsForUser(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Total media statistics for user retrieved successfully!",
        data: result
    });
}));
const getHighestRatedMovies = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Statistics_service_1.StatisticsServices.getHighestRatedMovieFromDB();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Movies retrieved successfully!",
        data: result
    });
}));
const getHighestRatedSeries = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Statistics_service_1.StatisticsServices.getHighestRatedSeriesFromDB();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Series retrieved successfully!",
        data: result
    });
}));
const getTopRatedThisWeek = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Statistics_service_1.StatisticsServices.getTopRatedThisWeekFromDB();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Top rated retrieved successfully!",
        data: result
    });
}));
const getNewlyAdded = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Statistics_service_1.StatisticsServices.getNewlyAddedFromDB();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Newly added retrieved successfully!",
        data: result
    });
}));
const getEditorsPicks = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Statistics_service_1.StatisticsServices.getEditorsPicksFromDB();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Editor Picks retrieved successfully!",
        data: result
    });
}));
const addEditorsPicks = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Statistics_service_1.StatisticsServices.addEditorPicksIntoDB(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Editor Picks added successfully!",
        data: result
    });
}));
const removeEditorsPicks = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Statistics_service_1.StatisticsServices.removeEditorPicksIntoDB(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Editor Picks removed successfully!",
        data: result
    });
}));
exports.StatisticsControllers = {
    getTopRatedThisWeek,
    getNewlyAdded,
    getEditorsPicks,
    addEditorsPicks,
    removeEditorsPicks,
    getHighestRatedMovies,
    getHighestRatedSeries,
    getTotalStatisticsForAdmin,
    getTotalStatisticsForUser
};
