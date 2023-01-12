/* eslint-disable react/require-default-props */

import PropTypes from "prop-types"
import { StyledWrapper } from "./Styled"
import { focusInterestInput } from "../../redux/actions/interests"

import Icon from "../Icon"
import { useDispatch } from "react-redux"

const TextInput = (props) => {
  const {
    iconConfig,
    highlightOnMount,
    refCallback,
    value,
    small,
    focusInput,
    ...otherProps
  } = props
  const dispatch = useDispatch()

  return (
    <StyledWrapper
      value={value}
      highlightOnMount={highlightOnMount}
      small={small}
      focusInput={focusInput}
    >
      <Icon width="20px" height="20px" {...iconConfig} />
      <input
        onClick={() => dispatch(focusInterestInput(true))}
        value={value}
        {...otherProps}
        ref={refCallback}
      />
    </StyledWrapper>
  )
}

TextInput.propTypes = {
  refCallback: PropTypes.func,
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  iconConfig: PropTypes.objectOf(PropTypes.string),
  color: PropTypes.string,
  small: PropTypes.bool,
  highlightOnMount: PropTypes.bool,
}

TextInput.defaultProps = {
  highlightOnMount: false,
  small: false,
}

export default TextInput
