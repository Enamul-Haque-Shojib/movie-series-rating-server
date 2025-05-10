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
exports.PurchaseServices = exports.stripe = void 0;
const prisma_1 = __importDefault(require("../../shared/prisma"));
const stripe_1 = __importDefault(require("stripe"));
const config_1 = __importDefault(require("../../config"));
exports.stripe = new stripe_1.default(config_1.default.payment_secret_key);
const addPurchaseIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(payload);
    const result = yield prisma_1.default.purchase.create({
        data: payload,
    });
    return result;
});
const createPaymentIntoStripe = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const mediaData = yield prisma_1.default.media.findUnique({
        where: {
            id: payload.id
        }
    });
    if (!mediaData) {
        throw new Error('Media not found');
    }
    const totalCostBooking = parseInt(mediaData.buy_price) * 100;
    const paymentIntent = yield exports.stripe.paymentIntents.create({
        amount: totalCostBooking,
        currency: 'usd',
        description: `Car rental booking for ${mediaData.id}`, // ✅ Required for Indian transactions
        automatic_payment_methods: { enabled: true },
        shipping: {
            name: 'Unknown User',
            address: {
                line1: '123 Default St',
                city: 'Default City',
                state: 'Default State',
                postal_code: '000000',
                country: 'IN', // Change to the user's actual country
            }
        }
    });
    return { clientSecret: paymentIntent.client_secret };
});
const getAllPurchaseByUserIdFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.purchase.findMany({
        where: { userId },
        include: {
            media: {
                select: {
                    title: true,
                    image: true,
                    buy_price: true,
                    rent_price: true,
                    genre: true,
                    streamingLinks: true,
                    streamingPlatform: true,
                    status: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
    return result;
});
const getAllPurchaseFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.purchase.findMany({
        include: {
            user: {
                select: {
                    name: true,
                    photoUrl: true
                }
            },
            media: {
                select: {
                    title: true,
                    image: true,
                    buy_price: true,
                    rent_price: true,
                    genre: true,
                    streamingLinks: true,
                    streamingPlatform: true,
                    status: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
    return result;
});
exports.PurchaseServices = {
    addPurchaseIntoDB,
    getAllPurchaseByUserIdFromDB,
    getAllPurchaseFromDB,
    createPaymentIntoStripe
};
