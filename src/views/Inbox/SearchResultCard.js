// @flow

import React from 'react';
import type { Node } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import LinkIcon from '@material-ui/icons/Link';
import uniqueId from 'lodash/uniqueId';
import type { SearchResult } from '../../types/searchResult';
import ImageGallery from './ImageGallery';
import SearchResultFeatures from './SearchResultFeatures';
import AcceptationButton from './AcceptationButton';

type Props = {
  classes: Object,
  searchResult: SearchResult,
  onAcceptation: (number) => void,
};

const SearchResultCard = ({ classes, searchResult, onAcceptation }: Props): Node => {
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
        {searchResult.description.split('\n').map(descrPara => (
          <Typography component="p" key={uniqueId('srDescr_')}>
            {descrPara}<br />
          </Typography>
        ))}
      </CardContent>
      <CardContent>
        <SearchResultFeatures searchResult={searchResult} />
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
      </CardActions>
    </Card>
  );
};

SearchResultCard.defaultProps = {};

const styles = ({ spacing }) => ({
  card: {
    marginBottom: spacing.unit * 2,
  },
  imageGalleryContainer: {
    paddingLeft: 0,
    paddingRight: 0,
  },
});

export default withStyles(styles)(SearchResultCard);
