// @flow

import type { UserState, UserActions } from '../types/user';

const initialState: UserState = {
  user: null,
};

export default (
  state: UserState = initialState,
  action: UserActions,
): UserState => {
  switch (action.type) {
    case 'USER_LOG_IN':
      return {
        user: action.payload.user,
      };
    default:
      return state;
  }
};
