import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as repositoryAPI from '../api/RepositoryAPI';

import Form from '../components/RepositoryCreateForm';
import RepositoryList from '../components/RepositoryList';


const RepositoriesContainer = props => {
  const {createStatus, repositories} = props

  const getRepositories = () => repositoryAPI.getRepositories();

  const submit = (values, dispatch) => {
    const token = document.getElementById('main').dataset.csrftoken;
    const name = values.name.split('/')[1];
    const v = {...values, name};
    repositoryAPI.createRepository(v, {'X-CSRFToken': token}, dispatch);
  };

  useEffect(() => {
    getRepositories()
  }, [createStatus])

  return (
    <div>
      <Form onSubmit={submit} createStatus={createStatus} />
      <RepositoryList repositories={repositories.results || []} />
    </div>
  );
}

RepositoriesContainer.propTypes = {
  createStatus: PropTypes.object.isRequired,
  repositories: PropTypes.object.isRequired,
};

const mapStateToProps = store => ({
  createStatus: store.repositoryState.createStatus,
  repositories: store.repositoryState.repositories,
});

export default connect(mapStateToProps)(RepositoriesContainer);
