import { forwardRef } from "react"
import { StyledTooltip, StyledTooltipMicrophone } from "./Styled"

const Tooltip = ({ id, title, offset, place, children }) => (
  <StyledTooltip
    id={id}
    offset={offset || { top: -5, left: 0 }}
    effect="solid"
    multiline={true}
    backgroundColor="rgba(80, 83, 85, 1)"
    place={place || "top"}
  >
    <p>{title || children}</p>
  </StyledTooltip>
)
export const TooltipMicrophone = forwardRef(
  ({ innerRef, id, title, offset, place, children }) => (
    <StyledTooltipMicrophone
      id={id}
      offset={offset || { top: -5, left: 0 }}
      effect="solid"
      multiline={true}
      backgroundColor="#008ECD"
      place={place || "top"}
      ref={innerRef}
    >
      <p>{title || children}</p>
    </StyledTooltipMicrophone>
  )
)

export default Tooltip
