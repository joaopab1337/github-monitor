import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';

import * as commitAPI from '../api/CommitAPI';
import * as repositoryAPI from '../api/RepositoryAPI';


import CommitFilterForm from '../components/CommitFilterForm';
import CommitList from '../components/CommitList';
import Pagination from '../components/Pagination';


const CommitsContainer = props => {

  const [currentPage, setPage] = useState(1);
  const [searchTerms, setSearchTerms] = useState([]);

  const fetchData = () => {
    commitAPI.getCommits();
    repositoryAPI.getRepositories();
  }

  const filterCommits = (values=null) => {
    if(values) {
      let author = values['author'] ? `Author: ${values.author}` : ''
      let repo = values['repository'] ? `Repository: ${values.repository}`: ''
      setSearchTerms([author, repo])
    }
    commitAPI.getCommits(values)
  }

  const changePage = (page) => {
    // Condition to extract page number from Django's pagination URL
    let pageNumber = typeof page == 'number' ? page : page.split('page=')[1] || 1;
    commitAPI.getCommits({ page: pageNumber });
    setPage(pageNumber);
  }

  useEffect(() => {
    fetchData();
    setInterval(() => {
      fetchData();
    }, 60000);
  }, []);


  return (
    <div>
      <CommitFilterForm 
        onSubmit={filterCommits}
        repositoryOptions={props.repositories.results}
        submitting={false}
      />
      <div className="my-4">
        { searchTerms.map((s, index) => s ? <p key={index}>{s}</p> : '')}
      </div>
      <CommitList filterBy={filterCommits} commits={props.commits.results || []} />
      <Pagination 
        currentPage={currentPage}
        changePage={changePage}
        count={props.commits.count}
        previous={props.commits.previous}
        next={props.commits.next} 
      />
    </div>
  );
}


CommitsContainer.propTypes = {
  commits: PropTypes.object.isRequired,
  repositories: PropTypes.object.isRequired,
};

const mapStateToProps = store => ({
  commits: store.commitState.commits,
  repositories: store.repositoryState.repositories
});

export default connect(mapStateToProps)(CommitsContainer);
