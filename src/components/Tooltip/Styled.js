import styled from "styled-components/macro"
import ReactTooltip from "react-tooltip"

const StyledTooltip = styled(ReactTooltip)`
  padding-top: 0.1rem;
  padding-bottom: 0.1rem;
  padding: 8px 12px !important;
  border-radius: 0.7rem !important;
  text-align: center;
  line-height: 14px;
  opacity: 1 !important;
`
const StyledTooltipMicrophone = styled(ReactTooltip)`
  padding-top: 0.1rem;
  padding-bottom: 0.1rem;
  padding: 8px 12px !important;
  border-radius: 0.7rem !important;
  text-align: center;
  line-height: 14px;
  opacity: 1 !important;
  width: 156px;
  height: 96px;
  line-height: 23px;
  font-weight: 400;
  font-size: 14px;
  color: #fff;
  pointer-events: visible !important;
`
export { StyledTooltip, StyledTooltipMicrophone }
