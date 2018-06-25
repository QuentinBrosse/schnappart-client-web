// @flow

import React from 'react';
import type { Node } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import type { SearchResult } from '../../types/searchResult';

type Props = {
  classes: Object,
  searchResult: SearchResult,
};

const SearchResultFeatures = ({ classes, searchResult }: Props): Node => {
  const {
    rooms, surface, price, chargesIncluded, furnished,
  } = searchResult;
  return (
    <Table className={classes.table}>
      <TableBody>
        <TableRow>
          <TableCell component="th" variant="head">
            Metrics
          </TableCell>
          <TableCell>
            {`${rooms} rooms${rooms > 2 ? 's' : ''} | ${surface} \u33A1`}
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell component="th" variant="head">
            Price
          </TableCell>
          <TableCell>
            {`${price} € ${chargesIncluded ? 'CI' : 'CNI'}`}
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell component="th" variant="head">
          Furnished
          </TableCell>
          <TableCell>
            {furnished ? 'Yes' : 'No'}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

SearchResultFeatures.defaultProps = {};

const styles = {};

export default withStyles(styles)(SearchResultFeatures);
