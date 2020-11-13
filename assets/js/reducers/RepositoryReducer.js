import * as types from '../actions/ActionTypes';

const initialState = {
  createStatus: {},
  repositories: {},
};

const repositoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_REPOSITORY_SUCCESS: {
      return {...state, createStatus: action.payload};
    }
    case types.CREATE_REPOSITORY_FAILURE: {
      return {...state, createStatus: action.payload};
    }
    case types.GET_REPOSITORIES_SUCCESS: {
      return {
        ...state,
        repositories: action.payload,
      };
    }
    
    default:
      return state;
  }
};

export default repositoryReducer;
