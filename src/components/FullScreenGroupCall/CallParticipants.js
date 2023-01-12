//import { Icon } from "../../components"
//import { useMemo } from "react"
//import { columnsRows } from "../../utils/faye/helpers"
import EachParticipant from "./EachParticipant"
import {
  //StyledButton,
  //StyledMutedWrapper,
  //StyledName,
  //StyledParticipant,
  StyledParticipantsContainer,
  //StyledUserImage,
  StyledWrapperParticipant,
} from "./styled"

const usersd = [
  {
    name: "Ali",
    image: "https://xsgames.co/randomusers/assets/avatars/male/58.jpg",
  },
  {
    name: "Mahmood",
    image: "https://xsgames.co/randomusers/assets/avatars/male/58.jpg",
  },
  {
    name: "Ali",
    image: "https://xsgames.co/randomusers/assets/avatars/male/58.jpg",
  },
  {
    name: "Mahmood",
    image: "https://xsgames.co/randomusers/assets/avatars/male/58.jpg",
  },
]
const mutedUsers = [
  {
    name: "Mahmood",
    image: "https://xsgames.co/randomusers/assets/avatars/male/58.jpg",
  },
  {
    name: "Mohsen",
    image: "https://xsgames.co/randomusers/assets/avatars/male/58.jpg",
  },
  {
    name: "Farhad",
    image: "https://xsgames.co/randomusers/assets/avatars/male/58.jpg",
  },
  {
    name: "Ali",
    image: "https://xsgames.co/randomusers/assets/avatars/male/58.jpg",
  },
  {
    name: "Mahmood",
    image: "https://xsgames.co/randomusers/assets/avatars/male/58.jpg",
  },
  {
    name: "Mohsen",
    image: "https://xsgames.co/randomusers/assets/avatars/male/58.jpg",
  },
  {
    name: "Farhad",
    image: "https://xsgames.co/randomusers/assets/avatars/male/58.jpg",
  },
  {
    name: "Ali",
    image: "https://xsgames.co/randomusers/assets/avatars/male/58.jpg",
  },
  {
    name: "Mahmood",
    image: "https://xsgames.co/randomusers/assets/avatars/male/58.jpg",
  },
  {
    name: "Mohsen",
    image: "https://xsgames.co/randomusers/assets/avatars/male/58.jpg",
  },
  {
    name: "Farhad",
    image: "https://xsgames.co/randomusers/assets/avatars/male/58.jpg",
  },
  {
    name: "Ali",
    image: "https://xsgames.co/randomusers/assets/avatars/male/58.jpg",
  },
  {
    name: "Mahmood",
    image: "https://xsgames.co/randomusers/assets/avatars/male/58.jpg",
  },
  {
    name: "Mohsen",
    image: "https://xsgames.co/randomusers/assets/avatars/male/58.jpg",
  },
  {
    name: "Farhad",
    image: "https://xsgames.co/randomusers/assets/avatars/male/58.jpg",
  },
]

const isInGroupCalling = false
const CallParticipants = ({
  users,
  muteUserAudio = null,
  isVideoEnabled,
  activeId,
  isMuted,
  info_users,
}) => {
  const count = users.length
  // const { rows, columns } = useMemo(() => columnsRows(count), [count])
  const firstColumns = users.filter(
    (x) =>
      x.audioTrack ||
      x.videoTrack ||
      (x.local && isVideoEnabled) ||
      (x.local && !isMuted)
  ).length
  const showFirstRow = (user) =>
    user?.audioTrack ||
    user?.videoTrack ||
    (user.local && isVideoEnabled) ||
    (user.local && !isMuted) ||
    false
  const showSecondRow = (user) =>
    (!user?.audioTrack && !user?.videoTrack && !user?.local) ||
    (user.local && isMuted && !isVideoEnabled) ||
    false
  // console.log("info_users", info_users)
  // console.log("users", users)
  return (
    <>
      <StyledWrapperParticipant>
        <StyledParticipantsContainer rows={1} columns={firstColumns}>
          {users.map((user) => {
            const info = info_users.filter((x) => x.id == user.uid)[0]
            {
              return showFirstRow(user) ? (
                <EachParticipant
                  key={user.uid}
                  info={info}
                  isInGroupCalling={isInGroupCalling}
                  user={user}
                  muteUserAudio={muteUserAudio}
                  isVideoEnabled={isVideoEnabled}
                  activeId={activeId == user.uid ? true : undefined}
                />
              ) : null
            }
          })}
        </StyledParticipantsContainer>

        {/* <StyledMutedWrapper>
        <StyledParticipantsContainer muted>
          {mutedUsers.map((user, index) => (
            <StyledParticipant width={60} height={60} key={index}>
              <StyledName fontSize="10">{user.name}</StyledName>
              <StyledUserImage src={user.image} />
              <StyledButton
                themeColor="mic"
                onClick={toggleMuteAudio}
                lightHover={isInGroupCalling ? isAudioMuted : !isAudioMuted}
                isInGroupCalling={isInGroupCalling}
                muted
              >
                <Icon iconId="micMutedcall" width="15px" />
              </StyledButton>
            </StyledParticipant>
          ))}
        </StyledParticipantsContainer>
      </StyledMutedWrapper> */}

        <StyledParticipantsContainer
          muted={true}
          rows={1}
          columns={count - firstColumns}
        >
          {users.map((user) => {
            const info = info_users.filter((x) => x.id == user.uid)[0]
            {
              return showSecondRow(user) ? (
                <EachParticipant
                  key={`${user.uid}`}
                  isInGroupCalling={isInGroupCalling}
                  user={user}
                  muteUserAudio={muteUserAudio}
                  isVideoEnabled={isVideoEnabled}
                  activeId={activeId == user.uid ? true : undefined}
                  muted={true}
                  info={info}
                />
              ) : null
            }
          })}
        </StyledParticipantsContainer>

        {/* <StyledMutedWrapper>
        <StyledParticipantsContainer muted>
          {mutedUsers.map((user, index) => (
            <StyledParticipant width={60} height={60} key={index}>
              <StyledName fontSize="10">{user.name}</StyledName>
              <StyledUserImage src={user.image} />
              <StyledButton
                themeColor="mic"
                onClick={toggleMuteAudio}
                lightHover={isInGroupCalling ? isAudioMuted : !isAudioMuted}
                isInGroupCalling={isInGroupCalling}
                muted
              >
                <Icon iconId="micMutedcall" width="15px" />
              </StyledButton>
            </StyledParticipant>
          ))}
        </StyledParticipantsContainer>
      </StyledMutedWrapper> */}
      </StyledWrapperParticipant>
    </>
  )
}

export default CallParticipants
