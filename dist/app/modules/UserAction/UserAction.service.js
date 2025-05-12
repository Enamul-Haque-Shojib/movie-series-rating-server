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
exports.UserActionServices = void 0;
const prisma_1 = __importDefault(require("../../shared/prisma"));
const addReviewIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, mediaId } = payload;
    const isExistReview = yield prisma_1.default.review.findUnique({
        where: {
            user_media_review_unique: {
                userId,
                mediaId,
                isDeleted: false,
            },
        },
    });
    if (isExistReview) {
        throw new Error("You have already added a review for this media.");
    }
    // Create new review
    const newReview = yield prisma_1.default.review.create({
        data: {
            userId,
            mediaId,
            content: payload.content,
            tags: payload.tags,
            spoiler: payload.spoiler,
            rating: payload.rating,
        },
    });
    return newReview;
});
const addWatchListIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistMedia = yield prisma_1.default.watchList.findUnique({
        where: {
            userId_mediaId: {
                userId: payload.userId,
                mediaId: payload.mediaId,
            },
        },
    });
    if (isExistMedia) {
        throw new Error("You have already added this to your watchlist");
    }
    const result = yield prisma_1.default.watchList.create({
        data: {
            userId: payload.userId,
            mediaId: payload.mediaId,
        },
    });
    return result;
});
const addLikeIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Step 1: Check if the user already liked the media
    const isExistLike = yield prisma_1.default.like.findUnique({
        where: {
            user_media_like_unique: {
                userId: payload.userId,
                mediaId: payload.mediaId,
            },
        },
    });
    if (isExistLike) {
        throw new Error("You have already liked this media");
    }
    // Step 2: Check if the user has unliked the media
    const isExistUnLike = yield prisma_1.default.unlike.findUnique({
        where: {
            user_media_unlike_unique: {
                userId: payload.userId,
                mediaId: payload.mediaId,
            },
        },
    });
    // Step 3: If unlike exists, remove it
    if (isExistUnLike) {
        yield prisma_1.default.unlike.delete({
            where: {
                user_media_unlike_unique: {
                    userId: payload.userId,
                    mediaId: payload.mediaId,
                },
            },
        });
    }
    // Step 4: Create like entry
    const result = yield prisma_1.default.like.create({
        data: {
            userId: payload.userId,
            mediaId: payload.mediaId,
        },
    });
    return result;
});
const addUnLikeIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Step 1: Check if the user already unliked the media
    const isExistUnLike = yield prisma_1.default.unlike.findUnique({
        where: {
            user_media_unlike_unique: {
                userId: payload.userId,
                mediaId: payload.mediaId,
            },
        },
    });
    if (isExistUnLike) {
        throw new Error("You have already unliked this media");
    }
    // Step 2: Check if the user has liked the media
    const isExistLike = yield prisma_1.default.like.findUnique({
        where: {
            user_media_like_unique: {
                userId: payload.userId,
                mediaId: payload.mediaId,
            },
        },
    });
    // Step 3: If like exists, remove it
    if (isExistLike) {
        yield prisma_1.default.like.delete({
            where: {
                user_media_like_unique: {
                    userId: payload.userId,
                    mediaId: payload.mediaId,
                },
            },
        });
    }
    // Step 4: Create unlike entry
    const result = yield prisma_1.default.unlike.create({
        data: {
            userId: payload.userId,
            mediaId: payload.mediaId,
        },
    });
    return result;
});
const addCommentIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.comment.create({
        data: {
            userId: payload.userId,
            mediaId: payload.mediaId,
            userComment: payload.userComment
        },
    });
    return result;
});
const addReviewLikeIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(payload);
    const isExistLike = yield prisma_1.default.reviewLike.findUnique({
        where: {
            user_review_like_unique: {
                userId: payload.userId,
                reviewId: payload.reviewId,
            },
        },
    });
    if (isExistLike) {
        throw new Error("You have already liked this review");
    }
    const result = yield prisma_1.default.reviewLike.create({
        data: {
            userId: payload.userId,
            reviewId: payload.reviewId,
        },
    });
    return result;
});
const addReviewCommentIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.reviewComment.create({
        data: {
            userId: payload.userId,
            reviewId: payload.reviewId,
            userComment: payload.userComment
        },
        include: {
            user: true
        }
    });
    return result;
});
const getCommentsByMediaIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.comment.findMany({
        where: {
            mediaId: id,
        },
        select: {
            id: true,
            userComment: true,
            createdAt: true,
            user: {
                select: {
                    name: true,
                    photoUrl: true,
                },
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
    });
    return result;
});
const getReviewCommentsByMediaIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.reviewComment.findMany({
        where: {
            reviewId: id,
        },
        select: {
            id: true,
            userComment: true,
            createdAt: true,
            user: {
                select: {
                    name: true,
                    photoUrl: true,
                },
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
    });
    return result;
});
const getAllWatchListByUserIdFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.watchList.findMany({
        where: {
            userId,
        },
        include: {
            media: true, // This fetches the full media info for each watchlist item
        },
    });
    return result;
});
const getAllReviewByMediaIdFromDB = (mediaId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.review.findMany({
        where: {
            mediaId,
            approved: true,
            published: true,
            isDeleted: false
        },
        include: {
            user: true,
            reviewLike: true,
            reviewComment: true
        },
    });
    return result;
});
const getAllReviewByUserIdFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.review.findMany({
        where: {
            userId,
            isDeleted: false
        },
        include: {
            user: true,
            media: true,
            reviewLike: true,
            reviewComment: true
        },
    });
    return result;
});
const deleteReviewFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const reviewDelete = yield prisma_1.default.review.update({
        where: {
            id,
            published: false
        },
        data: { isDeleted: true }
    });
    return reviewDelete;
});
const getReviewFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const reviewData = yield prisma_1.default.review.findUnique({
        where: {
            id,
            published: false
        },
    });
    return reviewData;
});
const updateReviewIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const reviewData = yield prisma_1.default.review.update({
        where: {
            id,
        },
        data: payload
    });
    return reviewData;
});
exports.UserActionServices = {
    addWatchListIntoDB,
    getAllWatchListByUserIdFromDB,
    addLikeIntoDB,
    addUnLikeIntoDB,
    addCommentIntoDB,
    getCommentsByMediaIdFromDB,
    addReviewIntoDB,
    getAllReviewByMediaIdFromDB,
    deleteReviewFromDB,
    addReviewCommentIntoDB,
    addReviewLikeIntoDB,
    getReviewCommentsByMediaIdFromDB,
    getAllReviewByUserIdFromDB,
    getReviewFromDB,
    updateReviewIntoDB
};
