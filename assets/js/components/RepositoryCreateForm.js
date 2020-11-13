import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {Field, reduxForm} from 'redux-form';

import Alert from './Alert'

import { renderField } from './FormComponents';

const RepoCreateForm = (props) => {
  const {
    createStatus, handleSubmit, pristine, submitting,
  } = props;

  const [alert, toggleAlert] = useState(false)

  useEffect(() => {
    toggleAlert(true)
  }, [createStatus])

  return (
    <div>
      {createStatus.responseMessage && alert
        && (
          <Alert successful={createStatus.success} message={createStatus.response.detail} onCloseHandler={() => toggleAlert(false)} />
        )}
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="col-10">
            <Field
              name="name"
              placeholder="Enter the repository name, must match {user}/{repo}"
              className="form-control"
              component={renderField}
              type="text"
            />
          </div>
          <div className="col-2">
            <button disabled={pristine || submitting} className="btn btn-block btn-primary" type="submit">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

RepoCreateForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  createStatus: PropTypes.object.isRequired,
};

const validate = (values) => {
  const {username} = document.getElementById('main').dataset;
  const errors = {};
  if (!values.name || !values.name.startsWith(`${username}/`)) {
    errors.name = `Repository must belong to you (eg: ${username}/repo-name)`;
  }
  return errors;
};

export default reduxForm({
  form: 'repoCreate',
  validate,
})(RepoCreateForm);
