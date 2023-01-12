/* eslint-disable no-nested-ternary */
import { useEffect, useState } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { withRouter } from "react-router-dom"
import { UserShape } from "../../components"
import { makeGetGroupByChatId } from "../../redux/selectors/users"
import { history as historyShape } from "react-router-prop-types"
import {
  StyledContainer,
  StyledLeftContainer,
  StyledRightContainer,
} from "./styled"

import VideoScreen from "./VideoScreen"
import ChatboxScreen from "./ChatboxScreen"
import CallParticipants from "./CallParticipants"
import { sendMessage } from "../../redux/actions/chats"
import {
  setIsCaller,
  startedCall,
  toggleUserVideo,
  toggleUserAudio,
} from "../../redux/actions/calling"
import { makeGetCallInfo, makeGetIsChatOpen } from "../../redux/selectors/chats"
import { makeGetChannel } from "../../redux/selectors/calling"
import { makeGetIsMobileOrTabletView } from "../../redux/selectors/viewport"
import { getProfile } from "../../redux/reducers"
import { setIsInCallingScreen } from "../../redux/actions/calling"
import AgoraRTC from "agora-rtc-sdk-ng"
import { AppIds } from "../../const"
const APP_ID = AppIds.AGORA_APP_ID
import useAgora from "../../hooks/useAgora"
import { generateCallMessage, shortenChannelId } from "../../utils/faye/helpers"
import {
  CALL_SIGNAL_CALL,
  CALL_SIGNAL_CALL_JOINED,
  GROUP_CALL,
  CALL_SIGNAL_MUTE,
  CALL_SIGNAL_END_CALL,
  GROUP_CALL_END,
} from "../../redux/constants"
import useScreenShare from "../../hooks/useScreenShare"

const client = AgoraRTC.createClient({ codec: "h264", mode: "live" })
const FullScreenGroupCall = (props) => {
  const {
    myProfile,
    chatId,
    group,
    setIsInCallingScreen,
    setIsCaller,
    sendMessage,
    startedCall,
    history,
    callInfo,
    toggleUserVideo,
    toggleUserAudio,
    start,
  } = props
  const [screenId, setScreenId] = useState(null)
  const {
    isMuted = true,
    isVideoEnabled = false,
    groupInfo = { broadcasters: [], audience: [] },
  } = callInfo
  const info_users = [
    myProfile,
    ...groupInfo.broadcasters,
    ...groupInfo.audience,
  ]

  const {
    localVideoTrack,
    leave,
    join,
    joinState,
    volumes,
    remoteUsers,
    toggleMuteAudio,
    toggleMuteVideo,
  } = useAgora(client, history, screenId)
  const { localVideoScreenTrack, shareScreen, isScreenShared } =
    useScreenShare()

  useEffect(() => {
    client.setClientRole("host", function (e) {
      if (!e) {
        console.log("setHost success")
      } else {
        console.log("setHost error", e)
      }
    })
    const { id, username } = myProfile
    let message
    if (start != "0") {
      message = generateCallMessage({
        type: CALL_SIGNAL_CALL_JOINED,
        text: `${username} joined the call`,
        me: myProfile,
        callType: GROUP_CALL,
      })
    } else {
      // client.setClientRole("audience", function (e) {
      //   if (!e) {
      //     console.log("audience success")
      //   } else {
      //     console.log("audience error", e)
      //   }
      // })
      message = generateCallMessage({
        type: CALL_SIGNAL_CALL,
        text: `Call started by ${username}`,
        me: myProfile,
        callType: GROUP_CALL,
      })
      setIsCaller({ chatId, status: true })
      startedCall()
    }
    setIsInCallingScreen({ chatId, status: true })
    setTimeout(() => {
      sendMessage({ chatId, message })
    }, 3000)
    join(APP_ID, shortenChannelId(chatId), null, id)
    return () => {
      const handleLeave = async () => {
        await leave()
      }
      handleLeave()
      setIsInCallingScreen({ chatId, status: false })
      setIsCaller({ chatId, status: false })
    }
  }, [])
  useEffect(() => {
    toggleMuteAudio(isMuted)
  }, [isMuted])
  useEffect(() => {
    toggleMuteVideo(isVideoEnabled)
  }, [isVideoEnabled])
  const handleShareScreen = () => {
    if (!setScreenId) {
      const randomId = Math.floor(Math.random() * 9000)
      setScreenId(randomId)
    }

    shareScreen(APP_ID, shortenChannelId(chatId), null, screenId)
  }
  const handleMuteUser = (user) => {
    const text = `${Math.random() * 5000}${CALL_SIGNAL_MUTE} ${user.uid}`
    const message = generateCallMessage({
      type: CALL_SIGNAL_MUTE,
      text,
      me: myProfile,
    })
    sendMessage({ chatId, message })
  }
  const handleToggleAudio = () => {
    console.log("toggle audio")
    toggleUserAudio()
  }
  const handleToggleVideo = () => {
    toggleUserVideo()
  }

  const users = joinState
    ? [
        ...remoteUsers,
        { uid: myProfile.id, videoTrack: localVideoTrack, local: true },
      ]
    : [...remoteUsers]
  const activeId =
    volumes.length > 0
      ? volumes.sort((a, b) => a.level - b.level)[volumes.length - 1]?.uid
      : null

  const onPressEndCall = async () => {
    let message = generateCallMessage({
      type: users.length > 1 ? CALL_SIGNAL_END_CALL : GROUP_CALL_END,
      text: `Call ended`,
      me: myProfile,
    })
    sendMessage({ chatId, message })
    await leave()
  }

  return (
    <StyledContainer>
      <StyledLeftContainer>
        <ChatboxScreen chatId={chatId} />
      </StyledLeftContainer>
      <StyledRightContainer>
        <CallParticipants
          activeId={activeId}
          isVideoEnabled={isVideoEnabled}
          isMuted={isMuted}
          users={users}
          muteUserAudio={handleMuteUser}
          info_users={info_users}
        />
        <VideoScreen
          toggleMuteAudio={handleToggleAudio}
          isMuted={isMuted}
          isVideoEnabled={isVideoEnabled}
          toggleMuteVideo={handleToggleVideo}
          shareScreen={handleShareScreen}
          isScreenShared={isScreenShared}
          onPressEndCall={onPressEndCall}
        />
      </StyledRightContainer>
    </StyledContainer>
  )
}

FullScreenGroupCall.propTypes = {
  chatId: PropTypes.string.isRequired,
  group: UserShape,
  isInCallingScreen: PropTypes.bool.isRequired,
  history: historyShape.isRequired,
}

FullScreenGroupCall.defaultProps = {
  group: null,
  isInCallingScreen: false,
}

const mapDispatchToProps = {
  sendMessage,
  setIsInCallingScreen,
  setIsCaller,
  startedCall,
  toggleUserVideo,
  toggleUserAudio,
}
const makeMapStateToProps = () => {
  const getGroupByChatId = makeGetGroupByChatId()
  const getIsChatOpen = makeGetIsChatOpen()
  const getChannel = makeGetChannel()
  const getIsMobileOrTabletView = makeGetIsMobileOrTabletView()
  const getCallInfo = makeGetCallInfo()
  return (state, props) => ({
    group: getGroupByChatId(state, props),
    myProfile: getProfile(state),
    isOpen: getIsChatOpen(state, props) && !getIsMobileOrTabletView(state),
    channel: getChannel(state, props),
    callInfo: getCallInfo(state, props),
  })
}

export default withRouter(
  connect(makeMapStateToProps, mapDispatchToProps)(FullScreenGroupCall)
)
