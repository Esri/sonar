// Returns tokens and metadata about the Alexa devices

function askPermission() {
  return response.card({
    type: "AskForPermissionsConsent",
    permissions: [ "read::alexa:device:all:address" ] // full address
  });
}

function get(request) {

    console.log("env 1: " + JSON.stringify(request))
    // console.log("env 2: " + JSON.stringify(originalRequest))

    var deviceId = request.originalRequest.context.System.device.deviceId
    var userId = request.originalRequest.context.System.user.userId

    console.log("user: " + userId + " | device: " + deviceId)
    console.log("user: " + JSON.stringify(request.originalRequest.context.System.user))

    var consentToken = request.originalRequest.context.System.user.permissions.consentToken
    console.log("consentToken: " + consentToken)

    return {deviceId, userId, consentToken}
}

module.exports = {get, askPermission};
