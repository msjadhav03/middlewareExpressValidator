const express = require('express')
const joi = require('@hapi/joi')

const Schema = require('./schema')
const { mobileOtpLoginSchema } = require('./schema')

var schemaToBeEvaluate = mobileOtpLoginSchema

const validationMiddleware = (req,res,next)=>
{   
    switch(req.url.slice(1,))
    {
        case "getAccessToken" : 
            schemaToBeEvaluate = Schema.getAccessTokenSchema
            break
        case "mobileOtpLogin" : 
            schemaToBeEvaluate = Schema.mobileOtpLoginSchema
            break
        case "refreshToken" : 
            schemaToBeEvaluate = Schema.refreshTokenSchema
            break
        case "resendEmailOtp":
            schemaToBeEvaluate = Schema.resendEmailOtpSchema
            break;
        case "resendPhoneOtp":
            schemaToBeEvaluate = Schema.resendPhoneOtpSchema_Client
            break;
        case "resetPasswordEmail": 
            schemaToBeEvaluate = Schema.resetPasswordEmailSchema
            break;
        case "setNewPassword":
            schemaToBeEvaluate = Schema.setNewPasswordSchema
            break;
        case "userLoginDetail":
            schemaToBeEvaluate = Schema.userLoginDetailSchema 
            break;
        case "usernameSuggestion":
            schemaToBeEvaluate = Schema.usernameSuggestionSchema
            break;
        case "userRegistrationDetail":
            schemaToBeEvaluate = Schema.userRegistrationDetailSchema
            break;
        case "changePassword":
            schemaToBeEvaluate =  Schema.changePasswordSchema
            break;
        case "createUsername":
            schemaToBeEvaluate =  Schema.createUsernameSchema
            break;
        case "phoneNumberOtpValidation": 
            schemaToBeEvaluate = Schema.phoneNumberOtpValidationSchema
            break;
        case "addDeviceUserRequest":
            schemaToBeEvaluate = Schema.addDeviceUserRequestSchema
            break;
        case "saveFcmToken":
            schemaToBeEvaluate =  Schema.saveFcmTokenSchema
            break;
        case "checkDeviceActivation":
            schemaToBeEvaluate = Schema.checkDeviceActivationSchema
            break;
        case "changeWidgetType":
            schemaToBeEvaluate = Schema.changeWidgetTypeSchema
            break;
        case "controlDevice":
            schemaToBeEvaluate =  Schema.controlDeviceSchema
            break;
        case "fetchDeviceUsers":
            schemaToBeEvaluate =  Schema.fetchDeviceUsersSchema
            break;
        case "removeDevice":
            schemaToBeEvaluate = Schema.removeDeviceSchema
            break;
        case "resolveUserNotification":
            schemaToBeEvaluate = Schema.resolveUserNotificationSchema
            break;
        case "setDeviceFeatureUnit":
            schemaToBeEvaluate = Schema.setDeviceFeatureUnitSchema
            break;
        case "viewedNotificationsList":
            schemaToBeEvaluate =  Schema.viewedNotificationsListSchema
            break;
        case "initializeDeveloperServiceForUser":
            schemaToBeEvaluate =  Schema.initializeDeveloperServiceForUserSchema
            break;
        case "initializeDevice":
            schemaToBeEvaluate =  Schema.initializeDeviceSchema
            break;
        case "resendPhoneOTP":
            schemaToBeEvaluate = Schema.resendPhoneOtpSchema
            break;
        case "updateProfile":
            schemaToBeEvaluate = Schema.updateProfileSchema
            break;
        
    }
    const results =  schemaToBeEvaluate.validate(req.body,{abortEarly:false})
   
 
    if(results.hasOwnProperty('error'))
    {
       res.status(422).json(
           {
               error : results.error
           }
       )
    }
    else
    {
        res.status(200).json(
            {
                message : "done",
                value : results
            }
        )
    }
    //console.log(results)
}

module.exports = validationMiddleware

