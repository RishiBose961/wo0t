import { rateLimit } from 'express-rate-limit'


export const loginRateLimit = rateLimit({
    windowMs: 1 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 100 requests per windowMs
    skipSuccessfulRequests: true,
    
    message: "Too many login requests, please try again after 15 minutes"
})