// @flow

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Collapse from '@material-ui/core/Collapse';
import LinkIcon from '@material-ui/icons/Link';
import TextureIcon from '@material-ui/icons/Texture';
import EuroSymbolIcon from '@material-ui/icons/EuroSymbol';
import KitchenIcon from '@material-ui/icons/Kitchen';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import classnames from 'classnames';
import uniqueId from 'lodash/uniqueId';
import type { SearchResult } from '../../types/searchResult';
import ImageGallery from './ImageGallery';
import AcceptationButton from './AcceptationButton';
import FeatureCard from './FeatureCard';
import FeaturesManager from './FeaturesManager';

type Props = {
  classes: Object,
  searchResult: SearchResult,
  onAcceptation: (number) => void,
  onAddFeature: (number) => void,
};

type State = {
  expanded: boolean,
};

class SearchResultCard extends React.Component<Props, State> {
  static defaultProps = {}

  state = {
    expanded: true,
  };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes, searchResult, onAcceptation, onAddFeature } = this.props;
    const { expanded } = this.state;
    const pubDate = new Date(searchResult.publicationDate).toLocaleDateString('fr-FR');
    return (
      <Card className={classes.card}>
        <CardHeader
          action={
            <IconButton component="a" target="_blank" href={searchResult.url}>
              <LinkIcon />
            </IconButton>
          }
          title={searchResult.title}
          subheader={`${searchResult.city} ${searchResult.zipcode} | ${pubDate}`}
        />
        {
          searchResult.images.length > 0 &&
          <CardContent className={classes.imageGalleryContainer}>
            <ImageGallery images={searchResult.images} />
          </CardContent>
        }
        <CardContent>
          <Grid container spacing={16}>
            <Grid item xs>
              <FeatureCard
                icon={TextureIcon}
                label="Metrics"
                value={`${searchResult.rooms} rooms${searchResult.rooms > 2 ? 's' : ''} | ${searchResult.surface} \u33A1`}
              />
            </Grid>
            <Grid item xs>
              <FeatureCard
                icon={EuroSymbolIcon}
                label="Price"
                value={`${searchResult.price} € ${searchResult.chargesIncluded ? 'CI' : 'CNI'}`}
              />
            </Grid>
            <Grid item xs>
              <FeatureCard
                icon={KitchenIcon}
                label="Furnished"
                value={searchResult.furnished ? 'Yes' : 'No'}
              />
            </Grid>
          </Grid>
        </CardContent>
        <CardContent>
          {searchResult.description.split('\n').map(descrPara => (
            <Typography component="p" key={uniqueId('srDescr_')}>
              {descrPara}<br />
            </Typography>
          ))}
        </CardContent>
        <CardActions>
          <AcceptationButton
            searchResultId={searchResult.id}
            onAcceptation={onAcceptation}
            accept
          />
          <AcceptationButton
            searchResultId={searchResult.id}
            onAcceptation={onAcceptation}
          />
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={this.handleExpandClick}
            aria-expanded={expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Divider />
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <FeaturesManager
              searchResult={searchResult}
              onAddFeature={onAddFeature(searchResult.id)}
            />
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

const styles = ({ spacing, transitions }) => ({
  card: {
    marginBottom: spacing.unit * 2,
  },
  imageGalleryContainer: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: transitions.create('transform', {
      duration: transitions.duration.shortest,
    }),
    marginLeft: 'auto',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
});

export default withStyles(styles)(SearchResultCard);
