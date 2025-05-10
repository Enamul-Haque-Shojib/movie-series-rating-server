"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.AuthServices = void 0;
const bcrypt = __importStar(require("bcrypt"));
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../../shared/prisma"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../config"));
const jwtHelpers_1 = require("../../helpars/jwtHelpers");
const registerAuthIntoDB = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield prisma_1.default.auth.findUnique({
        where: {
            email: req.body.email,
            status: client_1.AuthStatus.ACTIVE,
        },
    });
    if (existingUser) {
        throw new AppError_1.default(http_status_1.default.NOT_ACCEPTABLE, 'Email is already registered');
    }
    const hashedPassword = yield bcrypt.hash(req.body.password, 12);
    const userData = {
        name: req.body.name,
        email: req.body.email,
        photoUrl: req.body.photoUrl,
        password: hashedPassword,
    };
    const isUserCreated = yield prisma_1.default.auth.create({
        data: userData
    });
    return yield exports.AuthServices.loginAuthIntoDB({
        email: userData === null || userData === void 0 ? void 0 : userData.email,
        password: req.body.password,
    });
});
const loginAuthIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield prisma_1.default.auth.findUnique({
        where: {
            email: payload.email,
            status: client_1.AuthStatus.ACTIVE
        }
    });
    if (!existingUser) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User is not found!');
    }
    const { password } = existingUser, userWithoutPassword = __rest(existingUser, ["password"]);
    const isCorrectPassword = yield bcrypt.compare(payload.password, existingUser.password);
    if (!isCorrectPassword) {
        throw new Error("Password incorrect!");
    }
    console.log('Login successfully');
    const accessToken = jwtHelpers_1.jwtHelpers.generateToken({
        email: existingUser.email,
        role: existingUser.role
    }, config_1.default.jwt.jwt_secret, config_1.default.jwt.expires_in);
    const refreshToken = jwtHelpers_1.jwtHelpers.generateToken({
        email: existingUser.email,
        role: existingUser.role
    }, config_1.default.jwt.refresh_token_secret, config_1.default.jwt.refresh_token_expires_in);
    return {
        user: userWithoutPassword,
        accessToken,
        refreshToken,
    };
});
const getSingleAuthFromDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield prisma_1.default.auth.findUnique({
        where: {
            email,
            status: client_1.AuthStatus.ACTIVE
        }
    });
    if (!existingUser) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'This user is not found!');
    }
    return existingUser;
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let decodedData;
    try {
        decodedData = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.refresh_token_secret);
    }
    catch (err) {
        throw new Error("You are not authorized!");
    }
    const userData = yield prisma_1.default.auth.findUniqueOrThrow({
        where: {
            email: decodedData.email,
            status: client_1.AuthStatus.ACTIVE
        }
    });
    const accessToken = jwtHelpers_1.jwtHelpers.generateToken({
        email: userData.email,
        role: userData.role
    }, config_1.default.jwt.jwt_secret, config_1.default.jwt.expires_in);
    return {
        accessToken,
    };
});
exports.AuthServices = {
    registerAuthIntoDB,
    loginAuthIntoDB,
    refreshToken,
    getSingleAuthFromDB
};
