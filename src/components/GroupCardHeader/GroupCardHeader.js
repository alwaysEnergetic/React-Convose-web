import { useCallback, useEffect, useRef, useState } from "react"
import ProfileImage from "../ProfileImage/ProfileImage"
import {
  ProfileImageWrapper,
  StyledButtonGroup,
  StyledButton,
  StyledName,
  StyledStatus,
  StyledLeaveButton,
  StyledContentPopup,
  Username,
  Wrapper,
  StyledPopupWrapper,
  StyledPopup,
  // StyledButtonJoinCall,
  StyledJoinCallContainer,
  StyledJoinCallText,
} from "./Styled"
import Icon from "../Icon"
import { DesktopDown, DesktopUp } from "../Responsive"
import GroupProfileImage from "../GroupProfileImage/index"
import { timeIsNotUp } from "../../utils/faye/helpers"
import { ButtonDownload } from "."
import { useDispatch, useSelector } from "react-redux"
import Tooltip from "../Tooltip"
import { makeGetCallInfo } from "../../redux/selectors/chats"
import { groupTabClosed } from "../../redux/actions/calling"
import ProfileCallBanner from "../GroupProfileImage/ProfileCallBanner"
import VoiceAnimation from "../VoiceAnimation"
const getCallInfo = makeGetCallInfo()
let groupCallTab = null

const GroupCardHeader = ({
  avatar,
  defaultAvatar,
  group_name,
  isTyping,
  themeColor,
  isActive,
  showCloseButton,
  onClose,
  onClick,
  onProfileImageClick,
  isGroup,
  onGroupChatClick,
  onLeaveGroupClick,
  onStartGroupCall,
  groupInfo,
  chatId,
}) => {
  const [leaveIsVisible, setLeaveIsVisible] = useState(false)
  const [joinCall, setJoinCall] = useState(false)
  const showProfile = useSelector(
    ({ chats }) => chats[chatId]?.showProfile || false
  )
  const callInfo = useSelector((state) => getCallInfo(state, { chatId }))
  const dispatch = useDispatch()
  const { isInCallingScreen = false, closeGroupCallTab = false } = callInfo
  const ref = useRef(null)
  const {
    audience = [],
    audience_total = 0,
    broadcasters = [],
    channel_exist = true,
  } = groupInfo

  const groupCallProfiles = [...audience, ...broadcasters].map(
    (user) => user?.avatar?.url
  )

  const clickListener = useCallback(
    (e) => {
      if (ref.current && ref.current.id !== e.target.id) {
        setLeaveIsVisible(false)
      }
    },
    {
      /* eslint-disable-line react-hooks/exhaustive-deps */
    }[ref.current]
  )
  const optionsClickHandler = () => setLeaveIsVisible(!leaveIsVisible)
  useEffect(() => {
    document.addEventListener("click", clickListener)
    return () => {
      document.removeEventListener("click", clickListener)
    }
  }, [clickListener])

  const closeHandler = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (showProfile) {
      onProfileImageClick()
    } else {
      onClose()
    }
  }

  const startCallHandler = () => {
    groupCallTab = window.open(
      `/call/${chatId}/${isInCallingScreen ? 1 : 0}`,
      "_blank"
    )
    groupCallTab.focus()
  }
  useEffect(() => {
    if (closeGroupCallTab) {
      groupCallTab && groupCallTab.close()
      groupCallTab = null
      dispatch(groupTabClosed())
    }
  }, [groupCallTab, closeGroupCallTab])
  return (
    <Wrapper showProfile={showProfile} showCloseButton={showCloseButton}>
      <DesktopDown>
        {showCloseButton && (
          <StyledButton
            blank
            small
            onClick={closeHandler}
            themeColor={themeColor}
          >
            <span>Back</span>
            <Icon iconId="back" width="20px" />
          </StyledButton>
        )}
      </DesktopDown>
      <ProfileImageWrapper
        showCloseButton={showCloseButton}
        onClick={onProfileImageClick}
        {...(onProfileImageClick && {
          title: "Click here to toggle between Profile and Chat",
        })}
      >
        {avatar?.length < 2 ? (
          <ProfileImage
            url={defaultAvatar.url}
            isActive={isActive}
            onClick={onClick}
            isGroup={isGroup}
          />
        ) : (
          <GroupProfileImage url={avatar} size={"40"} />
        )}
      </ProfileImageWrapper>

      <Username
        onClick={onProfileImageClick || onClick}
        showCloseButton={showCloseButton}
      >
        <StyledName showCloseButton={showCloseButton} themeColor={themeColor}>
          {group_name}
        </StyledName>
        {showCloseButton && isTyping.typing && timeIsNotUp(isTyping.date) && (
          <StyledStatus>Typing...</StyledStatus>
        )}
      </Username>

      {showCloseButton && !showProfile && (
        <StyledButtonGroup>
          <DesktopUp>
            {/* {!isInCallingScreen ? (
              <> */}
            <StyledButton
              onClick={startCallHandler}
              data-tip
              data-for="voiceCall"
            >
              <Icon iconId="cardCall" width="22px" />
            </StyledButton>
            <Tooltip id="voiceCall" title="Call" />
            {/* </>
            ) : (
              <>
                <StyledButtonJoinCall
                  data-tip
                  data-for="joinCall"
                  onClick={startCallHandler}
                >
                  <Icon iconId="cardCall" width="22px" /> Join call
                </StyledButtonJoinCall>
                <Tooltip id="joinCall" title="Join call" />
              </>
            )} */}

            <StyledButton
              onClick={() => onGroupChatClick()}
              data-tip
              data-for="addToGroupButton"
            >
              <Icon iconId="cardGroupChat" width="22px" />
            </StyledButton>
            <Tooltip id="addToGroupButton" title="Add to group" />
          </DesktopUp>
          <DesktopDown>
            <StyledButtonGroup style={{ marginRight: "15px" }}>
              <StyledButton small onClick={() => setJoinCall(true)}>
                <Icon iconId="cardCall" width="22px" />
              </StyledButton>
            </StyledButtonGroup>
          </DesktopDown>
          <StyledButton
            small
            onClick={optionsClickHandler}
            ref={ref}
            id="options"
            data-tip
            data-for="groupOptions"
          >
            <Icon iconId="cardOptions" width="22px" />
          </StyledButton>
          <Tooltip id="groupOptions" title="Menu" />
          <DesktopUp>
            <StyledButton
              last
              onClick={closeHandler}
              themeColor={themeColor}
              data-tip
              data-for="groupMinimizeChat"
            >
              <span>Close</span>
              <Icon iconId="cardClose" width="22px" />
            </StyledButton>
            <Tooltip id="groupMinimizeChat" title="Minimize" />
          </DesktopUp>
        </StyledButtonGroup>
      )}

      {isInCallingScreen ? (
        <StyledJoinCallContainer onClick={startCallHandler}>
          <StyledButton>
            <Icon iconId="cardCallWhite" width="16px" />
          </StyledButton>

          {groupCallProfiles.length !== 0 && (
            <>
              <ProfileCallBanner url={groupCallProfiles.slice(0, 3)} />
              {groupCallProfiles.length - 3 > 0 && (
                <span
                  style={{
                    marginLeft: "9px",
                    fontWeight: "bold",
                    color: "#fff",
                  }}
                >
                  {" "}
                  +{groupCallProfiles.length - 3}
                </span>
              )}
            </>
          )}

          <StyledJoinCallText> join call</StyledJoinCallText>
          <VoiceAnimation />
        </StyledJoinCallContainer>
      ) : null}

      {leaveIsVisible && (
        <StyledLeaveButton onClick={onLeaveGroupClick}>
          <Icon iconId="chatExit" width="22px" />
          <p>Leave group</p>
        </StyledLeaveButton>
      )}
      <DesktopDown>
        {joinCall && (
          <StyledPopupWrapper onClick={() => setJoinCall(false)}>
            <StyledPopup>
              <StyledContentPopup>
                That function is currently only available on the Convose app or
                convose.com on computer
              </StyledContentPopup>
              <ButtonDownload />
            </StyledPopup>
          </StyledPopupWrapper>
        )}
      </DesktopDown>
    </Wrapper>
  )
}

export default GroupCardHeader
