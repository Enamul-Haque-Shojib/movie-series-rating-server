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
exports.AdminActionServices = void 0;
const prisma_1 = __importDefault(require("../../shared/prisma"));
const editorPickIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const newlyAdded = yield prisma_1.default.media.update({
        where: { id },
        data: { isEditorsPick: true },
    });
    return newlyAdded;
});
const approveReviewIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const reviewUpdate = yield prisma_1.default.review.update({
        where: { id },
        // data: { approved: true },
        data: payload,
    });
    const allReviews = yield prisma_1.default.review.findMany({
        where: {
            mediaId: reviewUpdate.mediaId,
            isDeleted: false,
            approved: true, // Optional: only include approved reviews
        },
        select: {
            rating: true,
        },
    });
    // Calculate average rating
    const totalRating = allReviews.reduce((sum, r) => sum + r.rating, 0);
    const averageRating = allReviews.length > 0 ? totalRating / allReviews.length : 0;
    // Update Media with new average rating
    yield prisma_1.default.media.update({
        where: {
            id: reviewUpdate.mediaId
        },
        data: { rating: averageRating },
    });
    return reviewUpdate;
});
const publishReviewIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const reviewUpdate = yield prisma_1.default.review.update({
        where: { id },
        // data: { published: true },
        data: payload,
    });
    return reviewUpdate;
});
const unpublishReviewIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const reviewUpdate = yield prisma_1.default.review.update({
        where: { id },
        // data: { published: false },
        data: payload,
    });
    return reviewUpdate;
});
const deleteReviewFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        yield tx.reviewLike.deleteMany({
            where: {
                reviewId: id
            }
        });
        yield tx.reviewComment.deleteMany({
            where: {
                reviewId: id
            }
        });
        const deleteReview = yield tx.review.delete({
            where: { id },
        });
        return deleteReview;
    }));
    return result;
});
const getAllReviewFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const reviewDelete = yield prisma_1.default.review.findMany({
        include: {
            user: true,
            media: true,
        }
    });
    return reviewDelete;
});
exports.AdminActionServices = {
    editorPickIntoDB,
    approveReviewIntoDB,
    publishReviewIntoDB,
    unpublishReviewIntoDB,
    deleteReviewFromDB,
    getAllReviewFromDB
};
