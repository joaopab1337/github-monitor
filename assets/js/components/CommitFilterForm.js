import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import { renderField } from './FormComponents';
import RepositorySelect from './RepositorySelect';



const CommitFilterForm = props => {
    const { repositoryOptions, handleSubmit, submitting, pristine } = props;

    return (
            <form onSubmit={handleSubmit}>
                <div className="form-row align-items-end">
                    <div className="col-3">
                        <label htmlFor="message">Commit message</label>
                        <Field
                            name="message"
                            component={renderField}
                            className="form-control mr-2"
                            type="text"
                            placeholder="e.g. updating foo function"
                        />
                    </div>
                    <div className="col-3">
                        <label htmlFor="author">Author</label>
                        <Field
                            name="author"
                            component={renderField}
                            className="form-control mr-2"
                            type="text"
                            placeholder="e.g. johndoe123"
                        />
                    </div>
                    <div className="col-3">
                        <label htmlFor="repository">Repository</label>
                        <Field name="repository" className="custom-select mr-2" component="select">
                            <option value="">All repositories</option>
                            { repositoryOptions && repositoryOptions.map(o => <option key={o.name} value={o.name}>{o.name}</option>)}
                        </Field>
                    </div>
                    <div className="col-3">
                        <button disabled={submitting} type="submit" className="btn btn-primary">Search</button>
                    </div>
                </div>
            </form>
    )
}

CommitFilterForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
};

export default reduxForm({
    form: 'commitFilter'
})(CommitFilterForm);
