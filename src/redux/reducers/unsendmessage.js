import ACTION_TYPES from "../actions/actionTypes"

const initialState = {
  messages: [],
}

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.STORE_UNSEND_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, ...[action.payload]],
      }
    case ACTION_TYPES.REMOVE_UNSEND_MESSAGE: {
      const { messages } = action.payload

      return {
        messages: messages || [],
      }
    }

    default:
      return state
  }
}
