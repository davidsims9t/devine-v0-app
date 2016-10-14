/**
 * Generates a random 24 character string.
 *
 * @return {string} random string
 */
export function generateRandomString() {
  let text = ""
  const possibleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

  for (let i = 0; i < 24; i++) {
    text += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length))
  }

  return text
}

/**
 * Returns a truncated text string.
 *
 * @param {string} text - the text to truncate
 * @param {integer} maxLength - the max length the string can be
 * @return {string} truncated text
 */
export function truncateText(text, maxLength) {
  const msgLength = String(text).trim().length
  const wordArr = String(text).trim().split(/\W+/g)
  let truncatedText = ""

  if (msgLength > maxLength) {
    for (let i = 0, j = wordArr.length; i < j; i++) {
      const totalLength = truncatedText + wordArr[i]

      if (totalLength.length > maxLength) {
        truncatedText = truncatedText.trim()
        break
      } else {
        truncatedText += truncatedText[i] + ' '
      }
    }
  } else {
    truncatedText = text
  }

  return truncatedText
}

/**
 * Converts a JSON object to a url-encoded query string.
 *
 * @param {object} params - parameters to convert
 * @return {string} url encoded query string
 */
export function urlEncode(params) {
  let paramsArr = []

  for (let key in params) {
    let value = encodeURIComponent(params[key])

    paramsArr.push(`${key}=${value}`)
  }

  return paramsArr.join('&')
}

/**
 * Takes a string to match for tags and returns an array of tags derived from the string
 *
 * @param {string} rawText - the string to parse
 * @return {array} tags
 */
export function createTagsArray(rawText) {
  let matches = String(rawText).match(/\s*#[a-z]{1}[a-z0-9_]+/ig)

  if (matches) {
    for (var i = 0, j = matches.length; i < j; i++) {
      matches[i] = matches[i].replace('#', '')
    }
  }

  return matches
}
