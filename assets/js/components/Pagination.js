import React, { useState, useEffect } from 'react';


const PaginationItem = ({current, number, changePage}) => (
    <li className={current ? 'page-item active' : 'page-item'}>
        <a className="page-link" href="#/commits" onClick={() => changePage(number)}>
            { number }
        </a>
    </li>
)


const Pagination = props => {
    const { currentPage, changePage, count, previous, next} = props;
    const [paginationItems, setItems] = useState([])

    useEffect(() => {
        const newPaginationItems = []
        const totalPages = Math.ceil(count / 10)
        for(let i=1; i<=totalPages; i++) {
            newPaginationItems.push(<PaginationItem key={i} number={i} current={currentPage == i} changePage={changePage} />)
        }
        setItems(newPaginationItems)
    }, [count, currentPage])

    return (
        <nav>
            <ul className="pagination">
                <li key='previous' className={previous ? 'page-item' : 'page-item disabled'}>
                    <a className="page-link" href="#/commits" onClick={() => changePage(previous)}>
                        Previous
                    </a>
                </li>
                { paginationItems }
                <li key='next' className={next ? 'page-item' : 'page-item disabled'}>
                    <a className="page-link" href="#/commits" onClick={() => changePage(next)}>
                        Next
                    </a>
                </li>
            </ul>
        </nav>
    );
}

export default Pagination;