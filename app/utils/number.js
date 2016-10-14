/**
 * Converts a standard 10 digit US phone number to an integer and adds a leading 1 for the country code.
 *
 * @param string rawPhone the formatted phone number
 * @return integer
 */
export function normalizePhone(rawPhone) {
  if (!rawPhone.match(/^[0-9]$/)) {
    return false
  }

  let phone = String(rawPhone).replace(/[^0-9]+/g, '')
  if (phone.indexOf(1) != 0) {
    phone = '1' + phone
  }

  if (parseInt(phone) != 1) {
    return parseInt(phone)
  } else {
    return false
  }
}
