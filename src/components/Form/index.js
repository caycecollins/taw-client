import React from 'react'
import PropTypes from 'prop-types'

// DO NOT USE { form } from cerebral/forms !!!!
// It will cause all form children to re-render when any fields are updated via onChange!

const Form = props =>
  <form onSubmit={(e) => e.preventDefault()}>
    {props.children}
  </form>

Form.propTypes = {
  children: PropTypes.node,
}

export default Form
