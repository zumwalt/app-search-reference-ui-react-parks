import React, { Component } from "react";

import Header from "./components/Header";
import Body from "./components/Body";
import AppSearchProvider from "./app-search/AppSearchProvider";
import AppSearchDriver from "./app-search/AppSearchDriver";
import {
  buildSearchOptionsFromConfig,
  getConfig
} from "./config/config-helper";

function createDriver() {
  const { hostIdentifier, searchKey, engineName } = getConfig();
  return new AppSearchDriver({
    hostIdentifier,
    searchKey,
    engineName,
    initialState: {
      resultsPerPage: 20,
      sortDirection: "",
      sortField: ""
    },
    searchOptions: buildSearchOptionsFromConfig()
  });
}

class App extends Component {
  render() {
    const config = getConfig();

    if (!config.engineName) {
      return (
        <div>
          No config found. Be sure to provide configuration by either including
          a src/config/engine.json file, or including window.appConfig.
        </div>
      );
    }

    return (
      <AppSearchProvider driver={createDriver()}>
        {({ searchTerm, results }) => (
          <div
            className={`reference-ui${
              searchTerm || results.length > 0 ? " active-search" : ""
            }`}
          >
            <Header />
            <Body />
          </div>
        )}
      </AppSearchProvider>
    );
  }
}

export default App;
