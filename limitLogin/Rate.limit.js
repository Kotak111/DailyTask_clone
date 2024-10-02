const rateLimit = require('express-rate-limit');


const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,   // 15 minutes
    max: 5,                    
    message: {
        success: false,
        message: "Too many login attempts from this IP, please try again after 15 minutes.",
    },
    headers: true,  
});

module.exports = loginLimiter;
