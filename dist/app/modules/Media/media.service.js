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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaServices = void 0;
const prisma_1 = __importDefault(require("../../shared/prisma"));
const paginationHelper_1 = require("../../helpars/paginationHelper");
const media_constant_1 = require("./media.constant");
const addMediaIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    let url = "";
    if (payload.streamingPlatform === "netflix") {
        url = "https://www.netflix.com/bd/";
    }
    else if (payload.streamingPlatform === "amazon_prime_video") {
        url = "https://www.primevideo.com/offers/nonprimehomepage/ref=dv_web_force_root";
    }
    else if (payload.streamingPlatform === "disney+") {
        url = "https://www.disneyinternational.com/";
    }
    else if (payload.streamingPlatform === "hbo") {
        url = "https://www.hbo.com/";
    }
    else if (payload.streamingPlatform === "apple_tv") {
        url = "https://tv.apple.com/";
    }
    else if (payload.streamingPlatform === "Peacock") {
        url = "https://www.peacocktv.com/unavailable";
    }
    else if (payload.streamingPlatform === "paramount") {
        url = "https://www.paramountplus.com/intl/";
    }
    else if (payload.streamingPlatform === "hulu") {
        url = "https://www.hulu.com/welcome";
    }
    const result = yield prisma_1.default.media.create({
        data: Object.assign(Object.assign({}, payload), { streamingLinks: url })
    });
    return result;
});
const updateMediaIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.media.findUniqueOrThrow({
        where: {
            id,
        }
    });
    let url = "";
    if (payload.streamingPlatform === "netflix") {
        url = "https://www.netflix.com/bd/";
    }
    else if (payload.streamingPlatform === "amazon_prime_video") {
        url = "https://www.primevideo.com/offers/nonprimehomepage/ref=dv_web_force_root";
    }
    else if (payload.streamingPlatform === "disney+") {
        url = "https://www.disneyinternational.com/";
    }
    else if (payload.streamingPlatform === "hbo") {
        url = "https://www.hbo.com/";
    }
    else if (payload.streamingPlatform === "apple_tv") {
        url = "https://tv.apple.com/";
    }
    else if (payload.streamingPlatform === "Peacock") {
        url = "https://www.peacocktv.com/unavailable";
    }
    else if (payload.streamingPlatform === "paramount") {
        url = "https://www.paramountplus.com/intl/";
    }
    else if (payload.streamingPlatform === "hulu") {
        url = "https://www.hulu.com/welcome";
    }
    const result = yield prisma_1.default.media.update({
        where: {
            id
        },
        data: Object.assign(Object.assign({}, payload), { streamingLinks: url })
    });
    return result;
});
const getAllMediaFromDB = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = paginationHelper_1.paginationHelper.calculatePagination(options);
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: media_constant_1.mediaSearchableFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    }
    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map(key => {
                return {
                    [key]: {
                        equals: filterData[key],
                    },
                };
            }),
        });
    }
    andConditions.push({
        isDeleted: false,
    });
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.media.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : {
                createdAt: 'desc',
            },
        include: {
            like: true,
            unlike: true,
            comment: true
        }
    });
    const total = yield prisma_1.default.media.count({
        where: whereConditions,
    });
    return {
        meta: {
            total,
            page,
            limit,
        },
        data: result,
    };
});
const getOneMediaFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.media.findUnique({
        where: {
            id,
            isDeleted: false,
        },
        include: {
            like: true,
            unlike: true,
            comment: true,
            review: true
        }
    });
    return result;
});
const deleteMediaFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.media.findUniqueOrThrow({
        where: {
            id,
        }
    });
    const result = yield prisma_1.default.media.update({
        where: {
            id
        },
        data: { isDeleted: true }
    });
    return result;
});
exports.MediaServices = {
    addMediaIntoDB,
    updateMediaIntoDB,
    getAllMediaFromDB,
    getOneMediaFromDB,
    deleteMediaFromDB
};
