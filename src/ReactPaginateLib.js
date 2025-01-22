import React from "react";
import ReactPaginate from "react-paginate";
import './App.css';

const ReactPaginateLib = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageClick = (data) => {
    onPageChange(data.selected + 1); // Pass 1-indexed page number
  };

  const postsPerPage = 16;


  return (
    <ReactPaginate
      previousLabel={"Previous"}
      nextLabel={"Next"}
      pageCount={totalPages} // Total number of pages
      forcePage={currentPage - 1} // Set current page (0-indexed)
      marginPagesDisplayed={2} // Pages at the start and end
      pageRangeDisplayed={3} // Pages around the current page
      onPageChange={handlePageClick} // Handle page click
      containerClassName={"pagination"} // CSS class for pagination container
      activeClassName={"active"} // CSS class for the active page
    />
  );
};

export default ReactPaginateLib;
