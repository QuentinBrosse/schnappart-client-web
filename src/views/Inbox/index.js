// @flow

import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import head from 'lodash/head';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
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
  totalResultsCount: number,
};

class Inbox extends React.Component<Props, State> {
  state = {
    searchResults: [],
    totalResultsCount: 0,
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
        totalResultsCount: data.length,
      });
    }
  };

  renderNoResults = () => (
    <Typography color="textSecondary" align="center">
      There is no results for the moment, please comeback later.
    </Typography>
  );

  renderResult = (searchResult: SearchResult) => {
    const { searchResults, totalResultsCount } = this.state;
    const currentCount = totalResultsCount - searchResults.length;
    const progress = (100 / totalResultsCount) * currentCount;
    return (
      <div>
        <SearchResultCard
          key={searchResult.id}
          searchResult={searchResult}
          onAcceptation={this.removeSearchResult}
        />
        <div>
          <LinearProgress variant="determinate" value={progress} />
          <Typography color="textSecondary" align="center">
            {currentCount} / {totalResultsCount}
          </Typography>
        </div>
      </div>
    );
  };

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
            return this.renderResult(searchResults[0]);
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
