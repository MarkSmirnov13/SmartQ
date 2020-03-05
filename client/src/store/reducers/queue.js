/* eslint-disable no-param-reassign */
import produce from "immer"

import { QueueActionTypes, LoadingState } from "../actions/queue"

const initialState = {
  uuid: null,
  name: null,
  members: [],
  loadingState: LoadingState.NotLoaded
}

export const queueReducer = produce((draft, action) => {
  if (!action) {
    return
  }

  const { payload } = action

  switch (action.type) {
    case QueueActionTypes.SET_QUEUE:
      draft.queue = payload.queue
      break

    case QueueActionTypes.SET_LOADING_STATE:
      draft.loadingState = payload.loadingState
      break

    default:
      break
  }
}, initialState)
