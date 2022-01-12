import knex from '../utils/db.js';
import otpGen from '../utils/otpGenerator.js';
export default {
    async createOTP(email){
        const otp = otpGen();
        await knex('otpCode').insert({'email': email, 'sendTime': new Date(), 'otp': otp});
        return otp;
    },
    async findOtp(email){
        const otp = await knex.raw(`SELECT otp FROM otpCode WHERE email='${email}' ORDER BY sendTime DESC LIMIT 1`);
        if(otp.length === 0){
            return null;
        }
        return otp[0][0];
    }
}