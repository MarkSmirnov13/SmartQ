export const LoadingState = {
  NotLoaded: 0,
  Loading: 1,
  Loaded: 2
}

export const QueueActionTypes = {
  SET_QUEUE: "QUEUE:SET_QUEUE",
  SET_LOADING_STATE: "QUEUE:SET_LOADING_STATE"
}

export const setQueue = queue => ({
  type: QueueActionTypes.SET_QUEUE,
  payload: {
    queue
  }
})

export const setLoadingQueueState = loadingState => ({
  type: QueueActionTypes.SET_LOADING_STATE,
  payload: {
    loadingState
  }
})

export const loadQueue = socket => dispatch => {
  dispatch(setLoadingQueueState(LoadingState.Loading))
  socket.on("queueLoaded", queue => {
    dispatch(setQueue(queue))
    dispatch(setLoadingQueueState(LoadingState.Loaded))
  })
}

export const enterQueue = socket => dispatch => {
  socket.on("")
  dispatch()
}
