import PropTypes from "prop-types";
import RCPagination from "rc-pagination";
import React from "react";

import "rc-pagination/assets/index.css";

import withAppSearch from "../app-search/withAppSearch";

// App search is currently limited to 100 pages, so we need to make sure
// that our pager only shows up to 100 pages.
function limitedTo100Pages(totalResults, resultsPerPage) {
  return Math.min(resultsPerPage * 100, totalResults);
}

function Paging({ current, resultsPerPage, setCurrent, totalResults }) {
  if (totalResults === 0) return null;

  return (
    <div>
      <RCPagination
        pageSize={resultsPerPage}
        current={current}
        total={limitedTo100Pages(totalResults, resultsPerPage)}
        onChange={setCurrent}
      />
    </div>
  );
}

Paging.propTypes = {
  current: PropTypes.number.isRequired,
  resultsPerPage: PropTypes.number.isRequired,
  searchTerm: PropTypes.string.isRequired,
  setCurrent: PropTypes.func.isRequired,
  totalResults: PropTypes.number.isRequired
};

export default withAppSearch(Paging);
