const joi = require('@hapi/joi')
const { set } = require('./app')
const validationMiddleware = require('./validationMiddleware')


/**
 * error(()=>{return {message : "client_id required"}})
 * label('Error')
 */
//.error(() =>{return error = {message : "client_id should be there"}})
//error(new Error('Give your error message here for first name'))

const client_id = joi.string().trim().required()
const firstName = joi.string().trim().required()
const lastName = joi.string().trim().required()
const username =joi.string().trim().required()
const password = joi.string().trim().min(8).max(15).required()
const grant_type = joi.string().trim().valid('password','email_otp','mobile_otp')
const email = joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
const service = joi.string().trim().required()
const otp_Id = joi.string().trim().required()
const phonenumber = joi.string().trim().regex(/^[0-9]{7,10}$/).required()
const countryCode = joi.string().trim().valid('91').required()
const deviceId = joi.string().trim().required()
const featureId = joi.string().trim().required()

// Authentication Endpoint
const getAccessTokenSchema = joi.object().keys(
    {
        client_id: client_id,
        username : username,
        password : password,
        grant_type :grant_type
    }
)
// Validation Schema for mobileOtpLogin router
const mobileOtpLoginSchema = joi.object().keys(
    {
        client_id : client_id,
        username: username,
        service : service 
    }
)


// Validation Schema for refreshToken router
const refreshTokenSchema = joi.object().keys(
    {
        client_id : client_id,
        refresh_token : joi.string().trim().required(),
        grant_type: joi.string().trim().valid('refresh_token').required()
    }
)

// Validation Schema for resendEmailOtp router
const resendEmailOtpSchema = joi.object().keys(
    {
        client_id : client_id,
        otpId : otp_Id
    }
)

// Validation Schema for resendPhoneOtp router
const resendPhoneOtpSchema_Client = joi.object().keys(
    {
        client_id : client_id,
        otpId  : otp_Id
    }
)


// Validation Schema for resetPasswordEmail router
const resetPasswordEmailSchema = joi.object().keys(
    {
        client_id : client_id,
        username : username
    }
)

// Validation Schema for setNewPassword router
const setNewPasswordSchema = joi.object().keys(
    {
        client_id : client_id,
        recoveryToken : joi.string().required(),
        password : password
    }
)

// Validation Schema for userLoginDetail router
const userLoginDetailSchema = joi.object().keys(
    {
        client_id : client_id,
        username : username,
        service : service
    }
)

// Validation Schema for usernameSuggestion router
const usernameSuggestionSchema = joi.object().keys(
    {
        client_id : client_id,
        email: email,
        firstName : firstName,
        lastName : lastName
    }
)

// Validation Schema for userRegistrationDetail router
const userRegistrationDetailSchema = joi.object().keys(
{
        client_id : client_id,
        firstName : firstName,
        lastName : lastName,
        password : password,
        email:email,
        countryCode : countryCode,
        phoneNumber : phonenumber,
        service : service
})


// End of Validation Schema for authentication Endpoint

// RESTRICTED ENDPOINT VALIDATION SCHEMA
// Validation Schema for changePassword router
const changePasswordSchema = joi.object().keys(
    {
        oldPassword:joi.string().min(8).max(15).required(),
        newPassword : joi.string().min(8).max(15).required()
           
    }
)

// Validation Schema for createUsername router
const createUsernameSchema = joi.object().keys(
    {
        username : username
        
    }
)

// Validation Schema for phoneNumberOtpValidation router
const phoneNumberOtpValidationSchema = joi.object().keys(
    {
        otpId : otp_Id,
        otp : joi.string().min(6).max(6).required() // new RegExp('^[0-9]*$')
    }
)

// Validation Schema for resendPhoneOtp router
const resendPhoneOtpSchema = joi.object().keys(
    {
        otpId : otp_Id
    }
)

// Validation Schema for saveFcmToken router
const saveFcmTokenSchema = joi.object().keys(
    {
        fcmToken : joi.string().trim().required()
    }
)

// Validation Schema for updateProfileSchema
const updateProfileSchema = joi.object().keys(
    {
        firstName: firstName,
        middleName: joi.string().trim().required(),
        lastName : lastName,
        countryCode:countryCode,
        phoneNumber: phonenumber,
        dateOfBirth : joi.string().trim().required(),
        gender: joi.string().valid('M','F','O').required(),
        profilePhoto : joi.string().trim().required()
    }
)
// End of all the Validation Schema


// developer app endpoint validation Schema

const addDeviceUserRequestSchema = joi.object().keys(
    {
        deviceId : deviceId,
        email:email,
        role:joi.string().trim().valid('A','M','V').required()

    }
)
const nestedSchemaChangeWidget = joi.object().keys(
    {
        min : joi.number().required(),
        max:joi.number().required(),
        interval : joi.number().required()
    }
)
const changeWidgetTypeSchema = joi.object().keys(
    {
        deviceId: deviceId,
        featureId: featureId,
        widgetCode : joi.string().trim().required(),
        widgetData: nestedSchemaChangeWidget

    }
)

const checkDeviceActivationSchema = joi.object().keys(
    {
            deviceToken : joi.string().trim().required()
    }
)

const controlDeviceSchema = joi.object().keys(
    {
        deviceId : deviceId,
        featureId: featureId,
        controlActionValue: joi.string().trim().required()
    }
)
const fetchDeviceUsersSchema = joi.object().keys(
{
    deviceId : deviceId
}
)



const removeDeviceSchema = joi.object().keys(
    {
        deviceId : deviceId
    }
)

const resolveUserNotificationSchema = joi.object().keys({
    notificationId : joi.string().trim().required(),
    action : joi.string().trim().valid('1','2','3').required()
})

const setDeviceFeatureUnitSchema = joi.object().keys(
    {
        deviceId : deviceId,
        featureId : joi.string().trim().required(),
        unit: joi.string().trim().required()
    }
)


const viewedNotificationsListSchema = joi.object().keys(
    {
        viewedNotificationsList : joi.array().items(joi.string().trim().required())
    }
)

const initializeDeveloperServiceForUserSchema = joi.object().keys(
    {
        termsAccepted: joi.bool().required()
    }
)

//end of developer app endpoint validation Schema


// developer device endpoint validation Schema
const deviceNames = joi.object().keys(
    {
        deviceName : joi.string().trim().required()
    }
)
const feature = joi.object().keys({
    name : joi.string().trim().required(),
    type : joi.string().trim().valid('pub','pubsub').required(),
    versionCode : joi.number().required(),
    identifier : joi.string().trim().required()
})
const initializeDeviceSchema = joi.object().keys(
    {
        deviceName : deviceNames,
        features : joi.array().items(feature)
    }
)

// end of developer device endpoint validation Schema

module.exports = {
    // Authentication Endpoint
    getAccessTokenSchema : getAccessTokenSchema,
    mobileOtpLoginSchema: mobileOtpLoginSchema,
    refreshTokenSchema : refreshTokenSchema,
    resendEmailOtpSchema : resendEmailOtpSchema,
    resendPhoneOtpSchema_Client: resendPhoneOtpSchema_Client,
    resetPasswordEmailSchema : resetPasswordEmailSchema,
    setNewPasswordSchema: setNewPasswordSchema,
    userLoginDetailSchema: userLoginDetailSchema,
    usernameSuggestionSchema : usernameSuggestionSchema,
    userRegistrationDetailSchema: userRegistrationDetailSchema,
    // starting of restricted endpoint validation schema
    changePasswordSchema : changePasswordSchema,
    createUsernameSchema : createUsernameSchema,
    phoneNumberOtpValidationSchema: phoneNumberOtpValidationSchema,
    resendPhoneOtpSchema : resendPhoneOtpSchema,
    saveFcmTokenSchema : saveFcmTokenSchema,
    updateProfileSchema : updateProfileSchema,
    // starting of developer app endpoint validation schema
    addDeviceUserRequestSchema : addDeviceUserRequestSchema,
    changeWidgetTypeSchema : changeWidgetTypeSchema,
    checkDeviceActivationSchema : checkDeviceActivationSchema,
    controlDeviceSchema : controlDeviceSchema,
    fetchDeviceUsersSchema : fetchDeviceUsersSchema,
    removeDeviceSchema : removeDeviceSchema,
    resolveUserNotificationSchema : resolveUserNotificationSchema,
    setDeviceFeatureUnitSchema : setDeviceFeatureUnitSchema,
    viewedNotificationsListSchema : viewedNotificationsListSchema,
    initializeDeveloperServiceForUserSchema : initializeDeveloperServiceForUserSchema,
    // developer device end point validation Schema 
    initializeDeviceSchema : initializeDeviceSchema
}