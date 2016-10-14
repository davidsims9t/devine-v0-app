import t from 'tcomb-form-native'

export const Username = t.subtype(t.Str, s => { return s.length && s.length < 30 }, 'Username')
export const Title = t.subtype(t.Str, s => { return s.length && s.length < 80 }, 'Title')
export const Description = t.subtype(t.Str, s => { return s.length < 141 }, 'Description')
export const Email = t.subtype(t.Str, s => {
  return /^(([^<>()[\]\.,:\s@\"]+(\.[^<>()[\]\.,:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,:\s@\"]+\.)+[^<>()[\]\.,:\s@\"]{2,})$/i.test(s)
})
export const Password = t.subtype(t.Str, (s) => {
  return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(s)
})
export const Website = t.subtype(t.Str, (s) => {
  return /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(s)
})

/**
 * [checkValidation description]
 * @param  {[type]} props [description]
 * @return {[type]}       [description]
 */
export function checkValidation(props) {
  if (props.isRequired && !props.field.state.value) {
    return false
  }

  if (props.isRequired || props.field.state.value) {
    let value = props.field.state.value
    if (props.rule == t.Num) {
      value = parseInt(value)
    }

    const isValid = !t.validate(value, props.rule).errors.length
    props.field.setState({
      hasError: !isValid
    })

    return props.field.state.value
  }

  return true
}
