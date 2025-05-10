// import dotenv from 'dotenv';
// import path from 'path';

// dotenv.config({ path: path.join(process.cwd(), '.env') });

// export default {
//   env: process.env.NODE_ENV,
//   port: process.env.PORT,
//   jwt: {
//       jwt_secret: process.env.JWT_SECRET,
//       expires_in: process.env.EXPIRES_IN ,
//       refresh_token_secret: process.env.REFRESH_TOKEN_SECRET,
//       refresh_token_expires_in: process.env.REFRESH_TOKEN_EXPIRES_IN ?? "30d",
//       reset_pass_secret: process.env.RESET_PASS_TOKEN,
//       reset_pass_token_expires_in: process.env.RESET_PASS_TOKEN_EXPIRES_IN ?? '30d'
//   },
//   reset_pass_link: process.env.RESET_PASS_LINK,
//   emailSender: {
//       email: process.env.EMAIL,
//       app_pass: process.env.APP_PASS
//   },
//   payment_secret_key:process.env.PAYMENT_SECRET_KEY
  
// };

import dotenv from 'dotenv';
import path from 'path';
import { SignOptions } from 'jsonwebtoken';

dotenv.config({ path: path.join(process.cwd(), '.env') });
type JWTExpiresIn = `${number}${'s' | 'm' | 'h' | 'd'}`;

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  jwt: {
    jwt_secret: process.env.JWT_SECRET,
    expires_in: process.env.EXPIRES_IN as JWTExpiresIn,
    refresh_token_secret: process.env.REFRESH_TOKEN_SECRET,
    refresh_token_expires_in: process.env.REFRESH_TOKEN_EXPIRES_IN as JWTExpiresIn,
    reset_pass_secret: process.env.RESET_PASS_TOKEN,
    reset_pass_token_expires_in: process.env.RESET_PASS_TOKEN_EXPIRES_IN as JWTExpiresIn,
  },
  reset_pass_link: process.env.RESET_PASS_LINK,
  emailSender: {
    email: process.env.EMAIL,
    app_pass: process.env.APP_PASS
  },
  payment_secret_key: process.env.PAYMENT_SECRET_KEY
};
