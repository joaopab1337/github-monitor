import * as types from './ActionTypes';

export const createRepositorySuccess = (response, responseMessage) => ({
    type: types.CREATE_REPOSITORY_SUCCESS,
    payload: { response, responseMessage, success: true },
});

export const createRepositoryFailure = (response, responseMessage) => ({
    type: types.CREATE_REPOSITORY_FAILURE,
    payload: { response, responseMessage, success: false },
})

export const getRepositoriesSuccess = repositories => ({
    type: types.GET_REPOSITORIES_SUCCESS,
    payload: repositories,
});
