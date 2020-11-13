import React from 'react';

const Select = ({ placeholderOption, options }) => (
    <select
        className="custom-select mr-2"
    >
        <option defaultValue>{ placeholderOption }</option>
        { options && options.map(o => <option key={o.name} value={o.name}>{o.name}</option>)}
    </select>
)

export default Select;