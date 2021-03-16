
const {validationResult,body} = require('express-validator')
const getAccessToken = [
    body('client_id').isString().notEmpty(),
    console.log('validation done'),
    body('username').isString().notEmpty(),
    body('password').isString().isStrongPassword().isEmpty().notEmpty(),
    body('grant_type').isString().isEmpty().notEmpty()
]

const mobileOtpLogin = [
    body('client_id').isString().notEmpty(),
    console.log('validation done'),
    body('username').isString().isEmpty().notEmpty(),
    body('password').isString().isStrongPassword().isEmpty().notEmpty(),
    body('grant_type').isString().isEmpty().isEmpty().notEmpty()
]

const refreshToken =    [
    body('client_id').isString().notEmpty(),
    body('refresh_token').isString().notEmpty(),
    body('grant_type').isString().notEmpty(),
    
   ] 
const  resendEmailOtp =  [
    body('client_id').isString().notEmpty(),
    body('otpId').isString().notEmpty()
    
   ] 
const resendPhoneOtp = [
    body('client_id').isString().notEmpty(),
    body('otpId').isString().notEmpty()
    
]
const resetPasswordEmail =    [
    body('client_id').isString().notEmpty(),
    body('username').isString().notEmpty()
    
   ] 
const setNewPassword = [
    body('client_id').isString().notEmpty(),
    body('recoveryToken').isString().notEmpty(),
    body('password').isString().notEmpty()
]

const userLoginDetail = [
    body('client_id').isString().notEmpty(),
    body('username').isString().notEmpty(),
    body('service').isString().notEmpty(),
]

const userRegistrationDetail = [
    body('client_id').isString().notEmpty(),
    body('firstName').isString().notEmpty(),
    body('lastName').isString().notEmpty(),
    body('password').isString().isStrongPassword().isEmpty().notEmpty(),
    body('email').isString().isEmail().notEmpty(),
    body('countryCode').isString().notEmpty(),
    body('phoneNumber').isString().notEmpty(),
    body('service').isString().notEmpty()
]

const usernameSuggestion = [
    body('client_id').isString().notEmpty(),
    body('email').isString().isEmail().notEmpty(),
    body('firstName').isString().notEmpty(),
    body('lastName').isString().notEmpty() 
]



module.exports = {
    getAccessToken : getAccessToken,
    mobileOtpLogin : mobileOtpLogin,
    refreshToken : refreshToken,
    resendPhoneOtp : resendPhoneOtp,
    resendEmailOtp : resendEmailOtp,
    resetPasswordEmail: resetPasswordEmail,
    setNewPassword : setNewPassword,
    userLoginDetail : userLoginDetail,
    userRegistrationDetail : userRegistrationDetail,
    usernameSuggestion : usernameSuggestion
}