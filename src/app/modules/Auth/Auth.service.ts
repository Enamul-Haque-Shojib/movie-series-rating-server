import { Request } from "express";
import * as bcrypt from 'bcrypt'
import { AuthRole, AuthStatus } from "@prisma/client";
import prisma from "../../shared/prisma";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import config from "../../config";
import { Secret } from "jsonwebtoken";
import { jwtHelpers } from "../../helpars/jwtHelpers";

const registerAuthIntoDB = async (req: Request) => {

    const existingUser = await prisma.auth.findUnique({
        where: {
          email : req.body.email,
          status: AuthStatus.ACTIVE,
        },
      });

    if (existingUser) {
      throw new AppError(httpStatus.NOT_ACCEPTABLE, 'Email is already registered');
    }

    const hashedPassword: string = await bcrypt.hash(req.body.password, 12);

    const userData = {
        name: req.body.name,
        email: req.body.email,
        photoUrl: req.body.photoUrl,
        password: hashedPassword,
    }


  
    const isUserCreated = await prisma.auth.create({
        data: userData
    });

        return await AuthServices.loginAuthIntoDB({
            email: userData?.email,
            password: req.body.password,
          });
    
    
  };


  const loginAuthIntoDB = async (payload: {
    email: string,
    password: string
}) => {
    const existingUser = await prisma.auth.findUnique({
        where: {
            email: payload.email,
            status: AuthStatus.ACTIVE
        }
    });

    if (!existingUser) {
        throw new AppError(httpStatus.NOT_FOUND, 'User is not found!');
    }

    const { password, ...userWithoutPassword } = existingUser;

    const isCorrectPassword: boolean = await bcrypt.compare(payload.password, existingUser.password);

    if (!isCorrectPassword) {
        throw new Error("Password incorrect!")
    }

    console.log('Login successfully');

    const accessToken = jwtHelpers.generateToken({
      email: existingUser.email,
      role: existingUser.role
  },
      config.jwt.jwt_secret as Secret,
      config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.generateToken({
      email: existingUser.email,
      role: existingUser.role
  },
      config.jwt.refresh_token_secret as Secret,
      config.jwt.refresh_token_expires_in as string
  );

  return {
    user:userWithoutPassword,
    accessToken,
    refreshToken,
      
  };
};

const getSingleAuthFromDB = async (email: string) => {

    const existingUser = await prisma.auth.findUnique({
        where: {
            email,
            status: AuthStatus.ACTIVE
        }
    });
 
    if (!existingUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'This user is not found!');
    }
    return existingUser;
  };


const refreshToken = async (token: string) => {
    let decodedData;
    try {
        decodedData = jwtHelpers.verifyToken(token, config.jwt.refresh_token_secret as Secret);
    }
    catch (err) {
        throw new Error("You are not authorized!")
    }

    const userData = await prisma.auth.findUniqueOrThrow({
        where: {
            email: decodedData.email,
            status: AuthStatus.ACTIVE
        }
    });

    const accessToken = jwtHelpers.generateToken({
        email: userData.email,
        role: userData.role
    },
        config.jwt.jwt_secret as Secret,
        config.jwt.expires_in as string
    );

    return {
        accessToken,
        
    };

};

  export const AuthServices = {
    registerAuthIntoDB,
    loginAuthIntoDB,
    refreshToken,
    getSingleAuthFromDB
  }