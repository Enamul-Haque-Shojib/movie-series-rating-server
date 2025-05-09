import { Purchase } from "@prisma/client";
import prisma from "../../shared/prisma";

import Stripe from 'stripe';
import config from "../../config";
export const stripe = new Stripe(config.payment_secret_key as string);

const addPurchaseIntoDB = async (payload: Purchase) => {
  console.log(payload)
    const result = await prisma.purchase.create({
      data: payload,
    });
  
    return result;
  };

  
const createPaymentIntoStripe = async (payload: { id: string }) => {
  const mediaData = await prisma.media.findUnique({
    where:{
      id: payload.id
    } 
  });
  if (!mediaData) {
      throw new Error('Media not found');
  }

  const totalCostBooking = parseInt(mediaData.buy_price) * 100;

  const paymentIntent = await stripe.paymentIntents.create({
      amount: totalCostBooking,
      currency: 'usd',  
      description: `Car rental booking for ${mediaData.id}`,  // ✅ Required for Indian transactions
      automatic_payment_methods: { enabled: true },
      shipping: {   // ✅ Required for Indian transactions
          name:  'Unknown User',
          address: {
              line1: '123 Default St',
              city:  'Default City',
              state: 'Default State',
              postal_code:  '000000',
              country: 'IN',  // Change to the user's actual country
          }
      }
  });

  return { clientSecret: paymentIntent.client_secret };
};

  const getAllPurchaseByUserIdFromDB = async (userId: string) => {
    const result = await prisma.purchase.findMany({
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
  };
  const getAllPurchaseFromDB = async () => {
    const result = await prisma.purchase.findMany({
      include: {
        user:{
          select:{
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
  };
  

  export const PurchaseServices = {
    addPurchaseIntoDB,
    getAllPurchaseByUserIdFromDB,
    getAllPurchaseFromDB,
    createPaymentIntoStripe
  }