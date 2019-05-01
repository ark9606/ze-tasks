import { baseURL, request } from '../util';

export const types = {
  USER_SET : 'user/set',
};

const initialState = {};

// Reducer
const reducer = (state = initialState, action) => {

  switch (action.type) {

    case types.USER_SET: {
      state = action.payload;
      break;
    }

    default: {}
  }
  return state;
};

export default reducer;



export const setUser = (user) => ({
  type: types.USER_SET,
  payload: user
});


// Action Creators
export const loginFB = (userData) => {
  return (dispatch) => {
    const { accessToken, email, name, id, picture } = userData;

    request({
      method: 'post',
      url: `${baseURL}/users`,
      data: {
        accessToken,
        email,
        fbID: id,
        name,
        avatar: picture.data.url
      }
    })
    .then(res => {
      dispatch(setUser(res));
    })
    .catch(err => {
      console.log(err);
    });
  }
}






