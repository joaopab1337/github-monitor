import React from 'react';
import PropTypes from 'prop-types';

const CommitList = (props) => {
  const {commits, filterBy} = props;
  return (
    <div>
      {commits.length !== 0 && (
        <div>
          <div className="card card-outline-secondary my-4">
            <div className="card-body">
              {commits.map((commit, index) => (
                <div key={commit.sha}>
                  <div className="avatar">
                    <img alt={commit.author} className="img-author" src={commit.avatar || 'https://raw.github.com/hashdog/node-identicon-github/master/examples/images/github.png'} />
                  </div>
                  <div className="commit-details">
                    <p className="mb-0">
                      {commit.message}
                    </p>
                    <small className="text-muted">
                      <span onClick={() => filterBy({ author: commit.author })} className={ commit.author ? 'filter-link' : ''}>
                        {commit.author || 'someone'}
                      </span>
                      {' '}
                      authored
                      {' '}
                      on
                      {' '}
                      <span onClick={() => filterBy({ repository: commit.repository })} className='filter-link'>
                        {commit.repository}
                      </span>
                      {' '}
                      at
                      {' '}
                      {commit.date}
                    </small>
                    {index !== commits.length - 1 && <hr />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {commits.length === 0 && (
        <div className="my-4">
          <h4>There are no commits to show.</h4>
        </div>
      )}
    </div>
  );
};

CommitList.propTypes = {
  commits: PropTypes.arrayOf(PropTypes.object).isRequired,
  filterBy: PropTypes.func,
};

export default CommitList;
