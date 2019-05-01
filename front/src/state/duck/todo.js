import { baseURL, request } from '../util';

export const types = {
  TODO_ADD : 'todo/add',
  TODO_SET : 'todo/set',
};

const initialState = [];

// Reducer
const reducer = (state = initialState, action) => {

  switch (action.type) {

    case types.TODO_SET: {
      state = action.payload;
      break;
    }

    case types.TODO_ADD: {
      state = [...state, action.payload];
      break;
    }

    default: {}
  }
  return state;
};

export default reducer;

export const setTodos = (todos) => ({
  type: types.TODO_SET,
  payload: todos
});

export const addTodoAction = (todo) => ({
  type: types.TODO_ADD,
  payload: todo
});

// Action Creators
export const addTodo = (data) => {
  return (dispatch, getState) => {

    const { user } = getState();
    
    console.log(data);    
    return request({
      method: 'post',
      url: `${baseURL}/users/${user.id}/todos`,
      data
    })
    .then(res => {
      dispatch(addTodoAction(res));
      return res;
    })
    .catch(err => {
      console.log('data', data);
      console.log(err);
      alert('Error', JSON.stringify(err));
    });
  }
}

export const selectTodo = () => {

  return(dispatch, getState) => {

    const { user } = getState();

    return request({
      method: 'get',
      url: `${baseURL}/users/${user.id}/todos`
    })
    .then(res => {
      dispatch(setTodos(res));
      return res;
    })
    .catch(err => {
      console.log(err);
    });
  }
}




