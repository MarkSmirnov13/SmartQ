/* eslint-disable no-param-reassign */
import produce from "immer"

import { MembersActionTypes, LoadingState } from "../actions/members"

const initialState = {
  members: [],
  loadingState: LoadingState.NotLoaded
}

export const membersReducer = produce((draft, action) => {
  if (!action) {
    return
  }

  const { payload } = action

  switch (action.type) {
    case MembersActionTypes.SET_MEMBERS:
      draft.members = payload.members
      break

    case MembersActionTypes.SET_LOADING_STATE:
      draft.loadingState = payload.loadingState
      break

    default:
      break
  }
}, initialState)
