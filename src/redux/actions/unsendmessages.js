import ACTION_TYPES from "./actionTypes"
export const storeUnsendMessage = (payload) => ({
  type: ACTION_TYPES.STORE_UNSEND_MESSAGE,
  payload,
})
export const removeUnsendMessage = (payload) => (dispatch, getState) => {
  const { unsendmessages } = getState()
  const messages = unsendmessages.messages.filter(
    (message) => message.uuid !== payload?.uuid
  )
  dispatch({
    type: ACTION_TYPES.REMOVE_UNSEND_MESSAGE,
    payload: messages || [],
  })
}
