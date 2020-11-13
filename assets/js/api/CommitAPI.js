import axios from 'axios';
import store from '../store';
import {
  getCommitsSuccess,
} from '../actions/CommitActions';

export const getCommits = (filters=null) => {
  if(filters === null) {
    axios.get(`/api/commits/`)
      .then((response) => {
        store.dispatch(getCommitsSuccess({...response.data}));
      });
  }
  else {
    axios.get(`/api/commits/`, { params: filters })
      .then((response) => {
        store.dispatch(getCommitsSuccess({...response.data}));
      });
  }
}
