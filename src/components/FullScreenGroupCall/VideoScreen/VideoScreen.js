import CallingBar from "../../CallingBar/CallingBar"
//import Icon from "../../Icon"
//import MediaPlayer from "../../MediaPlayer/MediaPlayer"
// import MediaPlayerActive from "../../MediaPlayer/MediaPlayerActive"
// import { StyledButton, StyledName } from "../styled"
import {
  CallingBarWrapper,
  //StyledNameMicWrapper,
  // StyledVideoContainer,
  StyledWrapper,
} from "./styled"

const VideoScreen = ({
  onPressEndCall,

  //speaking,
  toggleMuteAudio,
  toggleMuteVideo,
  isMuted,
  isVideoEnabled,
  shareScreen,
  isScreenShared,
  // toggleSpeakingUser,
}) => {
  return (
    <StyledWrapper>
      {/* <StyledVideoContainer>
        <StyledNameMicWrapper>
          <StyledName>{"Farhad"}</StyledName>
          {!speaking?.local && (
            <StyledButton
              themeColor="mic"
              onClick={() => toggleSpeakingUser(speaking)}
              lightHover={true}
              isInGroupCalling
            >
              {speaking?.audioTrack ? (
                <Icon iconId="miccall" width="20px" />
              ) : (
                <Icon iconId="micMutedcall" width="15px" />
              )}
            </StyledButton>
          )}
        </StyledNameMicWrapper>

        <MediaPlayerActive
          audioTrack={speaking?.audioTrack}
          videoTrack={speaking?.videoTrack}
        />
      </StyledVideoContainer> */}
      <CallingBarWrapper>
        <CallingBar
          endCall={onPressEndCall}
          toggleMuteAudio={toggleMuteAudio}
          toggleMuteVideo={toggleMuteVideo}
          isAudioMuted={isMuted}
          isVideoMuted={!isVideoEnabled}
          shareScreen={shareScreen}
          isScreenShared={isScreenShared}
          isInGroupCalling={true}
        />
      </CallingBarWrapper>
    </StyledWrapper>
  )
}

export default VideoScreen
