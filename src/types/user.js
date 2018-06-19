export type User = {
  id: number,
  username: string,
  email: string,
  authToken: string,
};

export type UserState = {
  user: null | User,
};

export type LogIn = {
  +type: 'USER_LOG_IN',
  +payload: {
    user: User,
  },
};

export type UserActions = LogIn;
