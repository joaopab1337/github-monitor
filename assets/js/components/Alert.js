import React from 'react';
import PropTypes from 'prop-types';

const Alert = (props) => {
    let successful = props.successful ? 'alert-success' : 'alert-danger';
    let className = `alert ${successful}`;
    return (
        <div className={className} role="alert">
            {props.message || 'Repository added successfully'}
        <button type="button" className="close" onClick={props.onCloseHandler}>
            <span aria-hidden="true">&times;</span>
        </button>
        </div>
    );
};

Alert.propTypes = {
    successful: PropTypes.bool,
    message: PropTypes.string,
};

export default Alert;