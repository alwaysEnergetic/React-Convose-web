import ACTION_TYPES from "../actions/actionTypes"

export const initialCallState = {
  agoraAppId: "",
  callingChannel: "",
  isCaller: false,
  peers: [],
  isGroup: false,
  chatUser: [],
  isMuted: true,
  isAudioToggeling: false,
  isVideoEnabled: false,
  isVideoToggeling: false,
  isInCallingScreen: false,
  joinCall: {},
  callStatus: false,
  chatId: null,
  shareScreen: false,
  closeGroupCallTab: false,
  isCallAccepted: false,
  groupInfo: { broadcasters: [], audience: [] },
}

export default function (state = initialCallState, action) {
  const { payload } = action

  switch (action.type) {
    case ACTION_TYPES.SET_CALLING_CHANNEL:
      return {
        ...state,
        callingChannel: payload.callingChannel,
        isGroup: payload.isGroup,
        isCaller: payload.isCaller,
        chatUser: payload.chatUser,
        closeGroupCallTab: false,
      }
    case ACTION_TYPES.SET_CALLING_GROUP_INFO:
      return {
        ...state,
        groupInfo: payload
          ? { ...payload }
          : { broadcasters: [], audience: [] },
      }
    case ACTION_TYPES.Call_BUSY: {
      const { callStatus, chatId } = action.payload
      return {
        ...state,
        callStatus,
        chatId,
      }
    }
    case ACTION_TYPES.SET_IS_IN_CALLING_SCREEN: {
      const { status, callStatus, chatId } = action.payload
      return {
        ...state,
        isInCallingScreen: status,
        callStatus: callStatus ? callStatus : status,
        chatId: status ? chatId : null,
      }
    }

    case ACTION_TYPES.SET_IS_CALLER: {
      const { status } = action.payload
      return {
        ...state,
        isCaller: status,
      }
    }
    case ACTION_TYPES.CLOSE_GROUP_CALL_TAB: {
      return {
        ...state,
        closeGroupCallTab: true,
        update: action.payload ? true : false,
      }
    }
    case ACTION_TYPES.GROUP_CALL_TAB_CLOSED: {
      return {
        ...state,
        closeGroupCallTab: false,
        isInCallingScreen: state.update ? false : state.isInCallingScreen,
        chatId: state.update ? null : state.chatId,
        groupInfo: state.update
          ? { broadcasters: [], audience: [] }
          : state.groupInfo,
      }
    }

    case ACTION_TYPES.SET_CALLER: {
      const { sender } = action.payload
      return {
        ...state,
        caller: sender,
      }
    }

    case ACTION_TYPES.CALL_CANCELLED:
    case ACTION_TYPES.CALL_ENDED:
    case ACTION_TYPES.LEAVE_CALLING_CHANNEL:
      return { ...initialCallState }

    case ACTION_TYPES.TOGGLE_MUTE_MODE: {
      const others = action.payload?.others || false
      if ((others && state.isMuted) || state.isAudioToggeling) return state
      return {
        ...state,
        isMuted: !state.isMuted,
        isAudioToggeling: true,
      }
    }
    case ACTION_TYPES.TOGGLE_AUDIO_COMPLETED: {
      return {
        ...state,
        isAudioToggeling: false,
      }
    }
    case ACTION_TYPES.CALL_ACCEPTED: {
      const { profile } = action.payload
      return {
        ...state,
        isCallAccepted: true,
        groupInfo: profile
          ? {
              ...state.groupInfo,
              broadcasters: [...state.groupInfo.broadcasters, profile],
            }
          : state.groupInfo,
      }
    }
    case ACTION_TYPES.TOGGLE_VIDEO_MODE: {
      const others = action.payload?.others || false
      if ((others && !state.isVideoEnabled) || state.isVideoToggeling)
        return state
      return {
        ...state,
        isVideoEnabled: !state.isVideoEnabled,
        isVideoToggeling: true,
      }
    }
    case ACTION_TYPES.TOGGLE_VIDEO_COMPLETED: {
      return {
        ...state,
        isVideoToggeling: false,
      }
    }
    case ACTION_TYPES.SET_CALLING_STATUS:
      return {
        ...state,
        callingStatus: payload.status,
      }

    default:
      return state
  }
}
