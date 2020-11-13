import React from 'react';
import PropTypes from 'prop-types';

const RepositoryList = (props) => {
  const {repositories} = props;

  return (
    <div>
      {repositories.length !== 0 && (
        <div>
          <div className="card card-outline-secondary my-4">
            <div className="card-header">
              <h4>Repository List</h4>
            </div>

            <div className="card-body">
              {repositories.map((repository, index) => (
                <div key={index}>
                  <div className="row">
                    <div className="col-10">
                      <span>{repository.name}</span>
                    </div>
                    <div className="col-2">
                      <span>Commits: {repository.amount}</span>
                    </div>
                  </div>
                  {index !== repositories.length - 1 && <hr />}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

RepositoryList.propTypes = {
  repositories: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default RepositoryList;
