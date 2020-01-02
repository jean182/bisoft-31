import React from "react"
import Toggle from "react-toggle"
import PropTypes from "prop-types"
import "react-toggle/style.css"

const Switch = props => {
  const { isOn, handleToggle } = props
  return <Toggle defaultChecked={isOn} icons={false} onChange={handleToggle} />
}

Switch.propTypes = {
  isOn: PropTypes.bool.isRequired,
  handleToggle: PropTypes.func.isRequired,
}

export default Switch
