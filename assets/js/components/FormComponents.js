import React from 'react';
import PropTypes from 'prop-types';

export const renderField = ({
    input, placeholder, className, type, meta: {touched, error, invalid},
  }) => (
    <div>
    <input
        {...input}
        placeholder={placeholder}
        className={`${className} ${touched && invalid ? 'is-invalid' : ''}`}
        type={type}
    />
    {touched
        && ((error && (
        <div className="invalid-feedback">
            {error}
        </div>
        )))
    }
    </div>
);

// renderField.propTypes = {
//     input: PropTypes.object.isRequired,
//     placeholder: PropTypes.string.isRequired,
//     className: PropTypes.string.isRequired,
//     type: PropTypes.string.isRequired,
//     meta: PropTypes.object.isRequired,
// };
