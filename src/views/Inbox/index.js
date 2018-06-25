// @flow

import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import head from 'lodash/head';
import Typography from '@material-ui/core/Typography';
import without from 'lodash/without';
import find from 'lodash/find';
import { Fetch } from '../../common/containers';
import { CenterLoader } from '../../common/components';
import SearchResultCard from './SearchResultCard';
import type { SearchResult } from '../../types/searchResult';

type Props = {
  classes: Object,
  projectId: number,
};

type State = {
  searchResults: SearchResult[],
};

class Inbox extends React.Component<Props, State> {
  static defaultProps = {};

  state = {
    searchResults: [],
  };

  getError = (data: Object) => (data && data.detail ? data.detail : 'Error.');

  removeSearchResult = (searchResultId: number) => () => {
    this.setState(({ searchResults }: State) => ({
      searchResults: without(
        searchResults,
        find(searchResults, s => s.id === searchResultId),
      ),
    }));
  };

  afterFetch = ({ data, failed }) => {
    if (!failed) {
      this.setState({
        searchResults: data,
      });
    }
  };

  renderNoResults = () => (
    <Typography color="textSecondary" align="center">
      There is no results for the moment, please comeback later.
    </Typography>
  );

  render() {
    const { projectId } = this.props;
    const { searchResults } = this.state;
    if (!projectId) {
      return <Typography>You don&apos;t have any project.</Typography>;
    }
    return (
      <Fetch
        afterFetch={this.afterFetch}
        endpoint={`search-results/by-project/${projectId}/pending`}
      >
        {({ fetching, failed, data }) => {
          if (fetching) {
            return <CenterLoader />;
          }

          if (failed) {
            return <Typography color="error">{this.getError(data)}</Typography>;
          }

          if (searchResults.length > 0) {
            return searchResults.map(searchResult => (
              <SearchResultCard
                key={searchResult.id}
                searchResult={searchResult}
                onAcceptation={this.removeSearchResult}
              />
            ));
          }
          return this.renderNoResults();
        }}
      </Fetch>
    );
  }
}

const styles = {};

const mapStateToProps = ({ user }) => ({
  projectId: head(user.user.projects),
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps),
)(Inbox);
