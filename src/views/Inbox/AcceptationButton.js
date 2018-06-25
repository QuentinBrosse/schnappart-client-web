// @flow

import React from 'react';
import type { Node } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import { Fetch } from '../../common/containers';
import { LoadingButton } from '../../common/components';

type Props = {
  classes: Object,
  accept: boolean,
  searchResultId: number,
  onAcceptation: (number) => void,
};

const AcceptationButton = ({
  classes, accept, searchResultId, onAcceptation,
}: Props): Node => {
  const Icon = accept ? ThumbUpIcon : ThumbDownIcon;
  const ariaLabel = accept ? 'Accept' : 'Refuse';
  const color = accept ? 'primary' : 'secondary';

  return (
    <Fetch
      method="PUT"
      endpoint={`search-results/${searchResultId}/accept/`}
      afterFetch={onAcceptation(searchResultId)}
    >
      {({ fetching, doFetch, response }) => (
        <LoadingButton
          variant="fab"
          loading={fetching}
          success={response && response.ok}
          color={color}
          aria-label={ariaLabel}
          onClick={() => doFetch()}
          className={classes.button}
        >
          <Icon />
        </LoadingButton>
      )}
    </Fetch>
  );
};

AcceptationButton.defaultProps = {};

const styles = {
  button: {},
};

export default withStyles(styles)(AcceptationButton);
