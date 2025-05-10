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
const approveReviewIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const reviewUpdate = yield prisma_1.default.review.update({
        where: { id },
        data: { approved: true },
    });
    return reviewUpdate;
});
const publishReviewIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const reviewUpdate = yield prisma_1.default.review.update({
        where: { id },
        data: { published: true },
    });
    return reviewUpdate;
});
const unpublishReviewIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const reviewUpdate = yield prisma_1.default.review.update({
        where: { id },
        data: { published: false },
    });
    return reviewUpdate;
});
const deleteReviewFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const reviewDelete = yield prisma_1.default.review.delete({
        where: { id },
    });
    return reviewDelete;
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
