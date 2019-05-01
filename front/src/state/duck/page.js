export const types = {
  SET_PAGE : 'page/set',
};

const initialState = {};

// Reducer
const reducer = (state = initialState, action) => {

  switch (action.type) {

    case types.SET_PAGE: {
      state = action.payload;
      break;
    }

    default: {}
  }
  return state;
};

export default reducer;

// Action Creators
export const loginFB = () => {
  return (dispatch) => {
    dispatch({
      type: types.USER_SET,
      payload: {}
    });
  }
}




