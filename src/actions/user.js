// @flow

import type { User, LogIn } from '../types/user';

export const logIn = (user: User): LogIn => ({
  type: 'USER_LOG_IN',
  payload: {
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      authToken: user.authToken,
    },
  },
});