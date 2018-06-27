// @flow

import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import differenceWith from 'lodash/differenceWith';
import { CenterLoader, LoadingButton } from '../../common/components';
import { Fetch } from '../../common/containers';
import type { Feature, FeatureState, SearchResultFeature } from '../../types/feature';
import type { SearchResult } from '../../types/searchResult';
import SearchResultFeatures from './SearchResultFeatures';

type Props = {
  classes: Object,
  feature: FeatureState,
  onAddFeature: (SearchResultFeature) => void,
  searchResult: SearchResult,
};

type State = {
  availableFeatures: Feature[],
  currentFeature: null | string,
  currentValue: string,
};

class FeaturesManager extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      availableFeatures: [],
      ...this.initialFieldsState,
    };
  }

  static getDerivedStateFromProps({ feature, searchResult }, state) {
    if (feature.all.length > 0) {
      const availableFeatures = differenceWith(
        feature.all,
        searchResult.features,
        (f, srf) => f.id === srf.feature.id,
      );
      return {
        availableFeatures,
        currentFeature: availableFeatures.length > 0
          ? availableFeatures[0].id.toString()
          : '0',
      };
    }
    return state;
  }

  initialFieldsState = {
    currentFeature: null,
    currentValue: '',
  };

  handleChange = (field: $Keys<State>) => (event) => {
    this.setState({
      [field]: event.target.value,
    });
  };

  afterFetch = ({ data, failed }) => {
    if (!failed) {
      this.props.onAddFeature(data);
      this.setState({
        ...this.initialFieldsState,
      });
    }
  }

  submit = (doFetch: Function) => (event: SyntheticInputEvent<*>) => {
    event.preventDefault();
    doFetch();
  }

  renderForm = () => {
    const { searchResult, classes } = this.props;
    const { currentFeature, currentValue, availableFeatures } = this.state;

    if (availableFeatures.length === 0) {
      return (
        <Typography color="textSecondary" align="center" className={classes.allSetMessage}>
          All available features are already set.
        </Typography>
      );
    }

    const body = {
      value: currentValue,
      searchResult: searchResult.id,
      feature: parseInt(currentFeature, 10),
    };

    return (
      <Fetch method="POST" endpoint="search-result-feature" body={body} afterFetch={this.afterFetch}>
        {({ loading, doFetch }) => (
          <form autoComplete="off" onSubmit={this.submit(doFetch)}>
            <Typography variant="title">
              Add a Feature
            </Typography>
            <Grid container spacing={16}>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="select-feature"
                  select
                  label="Feature"
                  value={currentFeature || '0'}
                  onChange={this.handleChange('currentFeature')}
                  fullWidth
                  SelectProps={{ native: true }}
                  required
                >
                  {availableFeatures.map(option => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs sm>
                <TextField
                  id="select-value"
                  label="Value"
                  value={currentValue}
                  onChange={this.handleChange('currentValue')}
                  fullWidth
                  SelectProps={{ native: true }}
                  required
                >
                  {availableFeatures.map(option => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
            </Grid>
            <LoadingButton
              type="submit"
              color="primary"
              className={classes.submitButton}
              loading={loading}
            >
              Add
            </LoadingButton>
          </form>
        )}
      </Fetch>
    );
  }

  render() {
    const { feature, searchResult } = this.props;

    if (feature.all === null) {
      return <CenterLoader />;
    }

    return (
      <div>
        {this.renderForm()}
        <SearchResultFeatures searchResultFeatures={searchResult.features} />
      </div>
    );
  }
}

const styles = ({ spacing }) => ({
  submitButton: {
    justifyContent: 'flex-end',
  },
  allSetMessage: {
    paddingBottom: spacing.unit * 2,
  },
});

const mapStateToProps = ({ feature }) => ({
  feature,
});

export default compose(connect(mapStateToProps), withStyles(styles))(FeaturesManager);
