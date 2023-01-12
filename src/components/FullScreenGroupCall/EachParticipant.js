import Icon from "../Icon"

import MediaPlayerActive from "../MediaPlayer/MediaPlayerActive"
import {
  StyledButtonParticipant,
  StyledName,
  StyledParticipant,
  StyledVideoWrapper,
} from "./styled"

const EachParticipant = ({
  user,
  isInGroupCalling,
  muteUserAudio,
  isVideoEnabled,
  activeId,
  muted = false,
  info,
}) => {
  return (
    <StyledParticipant muted={muted}>
      <StyledName
        nomic={user.local}
        muted={muted}
        theme_color={info?.theme_color}
      >
        {info?.username}
      </StyledName>

      <StyledVideoWrapper isVideoEnabled={user?.videoTrack} activeId={activeId}>
        <MediaPlayerActive
          audioTrack={user?.audioTrack}
          videoTrack={user?.videoTrack}
          isVideoEnabled={isVideoEnabled}
          local={user.local}
          avatar={info?.avatar}
        />
      </StyledVideoWrapper>
      {!user.local && muteUserAudio && (
        <StyledButtonParticipant
          themeColor="mic"
          onClick={() => muteUserAudio(user)}
          lightHover={true}
          isInGroupCalling={isInGroupCalling}
          muted={muted}
        >
          {user?.audioTrack ? (
            <Icon iconId="miccall" width="20px" />
          ) : (
            <Icon iconId="micMutedcall" width="15px" />
          )}
        </StyledButtonParticipant>
      )}
    </StyledParticipant>
  )
}

export default EachParticipant
