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
exports.StatisticsServices = void 0;
const prisma_1 = __importDefault(require("../../shared/prisma"));
const getTotalMediaStatisticsForAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    // Count total movies
    const totalMovies = yield prisma_1.default.media.count({
        where: { status: 'MOVIE', isDeleted: false },
    });
    // Count total series
    const totalSeries = yield prisma_1.default.media.count({
        where: { status: 'SERIES', isDeleted: false },
    });
    // Total purchases (BUY + RENT)
    const totalPurchasedMedia = yield prisma_1.default.purchase.count();
    // Average media rating
    const averageMediaRatingResult = yield prisma_1.default.media.aggregate({
        _avg: {
            rating: true,
        },
        where: {
            isDeleted: false,
        },
    });
    // Average review rating
    const averageReviewRatingResult = yield prisma_1.default.review.aggregate({
        _avg: {
            rating: true,
        },
        where: {
            isDeleted: false,
            approved: true,
            published: true,
        },
    });
    // Total users
    const totalUsers = yield prisma_1.default.auth.count({
        where: {
            role: 'USER',
            status: 'ACTIVE',
        },
    });
    return {
        totalMovies,
        totalSeries,
        totalPurchasedMedia,
        averageMediaRating: (_a = averageMediaRatingResult._avg.rating) !== null && _a !== void 0 ? _a : 0,
        averageReviewRating: (_b = averageReviewRatingResult._avg.rating) !== null && _b !== void 0 ? _b : 0,
        totalUsers,
    };
});
const getTotalMediaStatisticsForUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    // Total purchased movies
    const totalPurchasedMovies = yield prisma_1.default.purchase.count({
        where: {
            userId,
            media: {
                status: 'MOVIE',
                isDeleted: false,
            },
        },
    });
    // Total purchased series
    const totalPurchasedSeries = yield prisma_1.default.purchase.count({
        where: {
            userId,
            media: {
                status: 'SERIES',
                isDeleted: false,
            },
        },
    });
    // Total watchlist items
    const totalWatchlist = yield prisma_1.default.watchList.count({
        where: { userId },
    });
    // Total published reviews
    const totalPublishedReviews = yield prisma_1.default.review.count({
        where: {
            userId,
            published: true,
            isDeleted: false,
        },
    });
    // Total unpublished reviews
    const totalUnpublishedReviews = yield prisma_1.default.review.count({
        where: {
            userId,
            published: false,
            isDeleted: false,
        },
    });
    return {
        totalPurchasedMovies,
        totalPurchasedSeries,
        totalWatchlist,
        totalPublishedReviews,
        totalUnpublishedReviews,
    };
});
const getHighestRatedMovieFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const topRatedMovie = yield prisma_1.default.media.findMany({
        where: {
            isDeleted: false,
            status: 'MOVIE'
        },
        orderBy: {
            rating: 'desc',
        },
        take: 10,
    });
    return topRatedMovie;
});
const getHighestRatedSeriesFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const topRatedSeries = yield prisma_1.default.media.findMany({
        where: {
            isDeleted: false,
            status: 'SERIES'
        },
        orderBy: {
            rating: 'desc',
        },
        take: 10,
    });
    return topRatedSeries;
});
const getTopRatedThisWeekFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const topRated = yield prisma_1.default.media.findMany({
        where: {
            createdAt: {
                gte: oneWeekAgo,
            },
            isDeleted: false,
        },
        orderBy: {
            rating: 'desc',
        },
        take: 10,
    });
    return topRated;
});
const getNewlyAddedFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const newlyAdded = yield prisma_1.default.media.findMany({
        where: {
            isDeleted: false,
        },
        orderBy: {
            createdAt: 'desc',
        },
        take: 10, // Limit to latest 10 entries
    });
    return newlyAdded;
});
const getEditorsPicksFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const picks = yield prisma_1.default.media.findMany({
        where: {
            isEditorsPick: true,
            isDeleted: false,
        },
        orderBy: {
            updatedAt: 'desc',
        },
        take: 10,
    });
    return picks;
});
const addEditorPicksIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const picks = yield prisma_1.default.media.update({
        where: {
            id,
            isDeleted: false,
        },
        data: payload
    });
    return picks;
});
const removeEditorPicksIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const picks = yield prisma_1.default.media.update({
        where: {
            id,
            isDeleted: false,
        },
        data: payload
    });
    return picks;
});
exports.StatisticsServices = {
    getTopRatedThisWeekFromDB,
    getNewlyAddedFromDB,
    getEditorsPicksFromDB,
    addEditorPicksIntoDB,
    removeEditorPicksIntoDB,
    getHighestRatedSeriesFromDB,
    getHighestRatedMovieFromDB,
    getTotalMediaStatisticsForAdmin,
    getTotalMediaStatisticsForUser
};
