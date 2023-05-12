export const SET_USER = 'SET_USER';
export const SET_SNAPSHOT = 'SET_SNAPSHOT';

export const setUser = (user) => (dispatch) => {
  dispatch({
    type: SET_USER,
    payload: user,
  });
};

export const setSnapshot = (snapshotVariable) => (dispatch) => {
  dispatch({
    type: SET_SNAPSHOT,
    payload: snapshotVariable,
  });
};