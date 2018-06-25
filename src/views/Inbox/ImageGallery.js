// @flow

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
// import GridListTileBar from '@material-ui/core/GridListTileBar';
// import IconButton from '@material-ui/core/IconButton';
// import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';

type Props = {
  classes: Object,
  images: string[],
};

type State = {};

class ImageGallery extends React.Component<Props, State> {
  static defaultProps = {}

  // eslint-disable-next-line no-unused-vars
  fullScreenImage = (image: string) => (event: SyntheticMouseEvent<*>) => {
    // Do something...
  }

  render() {
    const { classes, images } = this.props;
    return (
      <div className={classes.root}>
        <GridList className={classes.gridList} cols={2.5} cellHeight={300}>
          {images.map(image => (
            <GridListTile key={image}>
              <img src={image} alt={image} />
              {/* <GridListTileBar
                actionIcon={
                  <IconButton onMouseOver={this.fullScreenImage(image)}>
                    <RemoveRedEyeIcon color="secondary" />
                  </IconButton>
                }
              /> */}
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  }
}

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
  },
};

export default withStyles(styles)(ImageGallery);
