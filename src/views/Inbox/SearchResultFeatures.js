// @flow

import React from 'react';
import type { Node } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import type { SearchResultFeature } from '../../types/feature';

type Props = {
  classes: Object,
  searchResultFeatures: SearchResultFeature[],
};

const SearchResultFeatures = ({ classes, searchResultFeatures }: Props): Node => {
  if (searchResultFeatures.length === 0) {
    return null;
  }
  return (
    <div>
      <Typography variant="title" gutterBottom>
        Features
      </Typography>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Feature</TableCell>
            <TableCell>Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { searchResultFeatures.map(srf => (
            <TableRow key={srf.id}>
              <TableCell component="th">
                {srf.feature.label}
              </TableCell>
              <TableCell>
                {srf.value}
              </TableCell>
            </TableRow>
          )) }
        </TableBody>
      </Table>
    </div>
  );
};

SearchResultFeatures.defaultProps = {};

const styles = {};

export default withStyles(styles)(SearchResultFeatures);
