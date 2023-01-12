import {
  StyledButtonGroup,
  StyledButton,
  StyledTooltipContent,
  StyledCloseTooltip,
} from "./styled"
import Icon from "../Icon"
import { TooltipMicrophone } from "../Tooltip"
import { useEffect } from "react"
import ReactTooltip from "react-tooltip"
import { useRef } from "react"
const CallingBar = (props) => {
  const {
    toggleMuteAudio,
    toggleScreenShare,
    toggleMuteVideo,
    endCall,
    isAudioMuted,
    isScreenShared,
    isVideoMuted,
    isInGroupCalling,
    shareScreen,
  } = props
  let refTooltipMicrophone = null
  const Tooltip = useRef(null)
  useEffect(() => {
    if (refTooltipMicrophone && isAudioMuted) {
      ReactTooltip.show(refTooltipMicrophone)
    }
  }, [refTooltipMicrophone, isAudioMuted])
  const closeTooltipMicrophone = () => {
    const current = Tooltip.current
    current.tooltipRef = null
    ReactTooltip.hide()
  }
  return (
    <StyledButtonGroup>
      <StyledButton
        data-tip
        data-for="muteAudio"
        ref={(ref) => {
          refTooltipMicrophone = ref
        }}
        themeColor="mic"
        onClick={toggleMuteAudio}
        backgroundColor={isAudioMuted ? "#19B6ED" : "rgba(0, 0, 0, 0)"}
        lightHover={!isAudioMuted}
      >
        <Icon iconId={isAudioMuted ? "micMuted" : "mic"} width="29px" />
      </StyledButton>
      {isInGroupCalling && (
        <TooltipMicrophone innerRef={Tooltip} id="muteAudio">
          <StyledTooltipContent>
            <StyledCloseTooltip onClick={closeTooltipMicrophone}>
              &times;
            </StyledCloseTooltip>

            <div>{isAudioMuted ? "Unmute mic here(or press M)" : "Mute"}</div>
          </StyledTooltipContent>
        </TooltipMicrophone>
      )}

      {/* <StyledButton
        themeColor="mic"
        onClick={shareScreen}
        backgroundColor={
          isInGroupCalling
            ? isScreenShared
              ? "rgba(0, 0, 0, 0)"
              : "#19B6ED"
            : isScreenShared
            ? "#19B6ED"
            : "rgba(0, 0, 0, 0)"
        }
        lightHover={isInGroupCalling ? isScreenShared : !isScreenShared}
        isInGroupCalling={isInGroupCalling}
      >
        <Icon
          iconId={isScreenShared ? "screenShared" : "screenShare"}
          width={isScreenShared ? "40px" : "35px"}
        />
      </StyledButton> */}
      <StyledButton
        themeColor="video"
        onClick={toggleMuteVideo}
        backgroundColor={isVideoMuted ? "rgba(0, 0, 0, 0)" : "#19B6ED"}
        lightHover={isVideoMuted}
      >
        <Icon
          iconId={isVideoMuted ? "videoMuted" : "video"}
          width={isScreenShared ? "40px" : "35px"}
        />
      </StyledButton>
      <StyledButton
        themeColor="hangUp"
        onClick={endCall}
        backgroundColor="#FF6F6F"
      >
        <Icon iconId="hangUp" width="35px" />
      </StyledButton>
    </StyledButtonGroup>
  )
}

export default CallingBar
