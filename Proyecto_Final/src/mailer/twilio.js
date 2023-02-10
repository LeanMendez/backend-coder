import twilio from "twilio";
import * as dotenv from "dotenv"
dotenv.config()


export const smsClient = twilio( process.env.TWILIO_ACCOUNT_ID,  process.env.TWILIO_AUTH_TOKEN );