import React, { NativeModules } from 'react-native'
const CameraRollConvert = NativeModules.CameraRollConvert

/**
 * Returns either photo or video based on the extension of the asset.
 *
 * @param  {string} assetUri - the URI of the asset
 * @return {string|false}
 */
export function getType(assetUri) {
  if (assetUri && assetUri.toLowerCase().indexOf("jpg") != -1) {
    return 'photo'
  } else if (assetUri && assetUri.indexOf("mov") != -1) {
    return 'video'
  } else {
    return false
  }
}

/**
 * Converts an asset file from the camera roll into a base64 encoded string.
 *
 * @param {string} uri - the asset URI
 * @param {string} type - the type of asset (jpg or mov)
 * @param {number} width - the width of the asset
 * @param {number} height - the height of the asset
 * @param {function} {callback} - function to call after the asset has been transformed
 * @return {void}
 */
export function convertMedia(uri, type, width, height, callback) {
  const fileType = type == 'photo' ? 'jpg' : 'mov'
  const fileName = guid() + '.' + fileType

  CameraRollConvert.read(uri, width, height, (base64) => {
    if (base64) {
      const file = new Parse.File(fileName, {base64: base64})
      file.save({
        success(isSaved) {
          callback(isSaved)
        },
        error(error) {
          callback(error)
        }
      })
    } else {
      callback(false)
    }
  })
}

/**
 * Returns a 16-digit GUID.
 *
 * @return {string} guid
 */
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
  }

  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4()
}
