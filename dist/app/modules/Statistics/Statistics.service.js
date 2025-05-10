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
exports.StatisticsServices = exports.getEditorsPicksFromDB = void 0;
const prisma_1 = __importDefault(require("../../shared/prisma"));
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
exports.getEditorsPicksFromDB = getEditorsPicksFromDB;
exports.StatisticsServices = {
    getTopRatedThisWeekFromDB,
    getNewlyAddedFromDB,
    getEditorsPicksFromDB: exports.getEditorsPicksFromDB
};
