// @flow

import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { Fetch } from '../../common/containers';
import { LoadingButton } from '../../common/components';
import { logIn } from '../../actions/user';

type Props = {
  classes: Object,
  dLogIn: typeof logIn,
};

type State = {
  fields: {
    username: string,
    password: string,
  },
  redirect: boolean,
};

class SignIn extends React.Component<Props, State> {
  state = {
    fields: {
      username: 'Quentin',
      password: '123Soleil!',
    },
    redirect: false,
  }

  onChange = (fieldName: string) => (event: SyntheticInputEvent<*>) => {
    event.persist();
    this.setState(state => ({
      fields: {
        ...state.fields,
        [fieldName]: event.target.value,
      },
    }));
  }

  getError = (data: Object) => {
    if (data && data.non_field_errors) {
      return data.non_field_errors.join(', ');
    }
    return 'Error.';
  }

  submit = (doFetch: Function) => (event: SyntheticInputEvent<*>) => {
    event.preventDefault();
    doFetch();
  }

  afterFetch = ({ data: user, failed }) => {
    if (!failed) {
      this.props.dLogIn(user);
      this.setState({ redirect: true });
    }
  }

  render() {
    const { classes } = this.props;
    const { fields, redirect } = this.state;

    if (redirect) {
      return <Redirect to="/app" />;
    }

    return (
      <Grid container justify="center" alignItems="center" className={classes.container}>
        <Grid item lg={3} md={4} sm={6} xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="headline" component="h3">
              Login
            </Typography>
            <Fetch
              method="POST"
              endpoint="token-auth"
              body={fields}
              afterFetch={this.afterFetch}
            >
              {({ fetching, failed, data, doFetch }) => (
                <form autoComplete="off" onSubmit={this.submit(doFetch)}>
                  <TextField
                    id="username"
                    label="Username"
                    margin="normal"
                    onChange={this.onChange('username')}
                    value="Quentin"
                    required
                    fullWidth
                  />
                  <TextField
                    id="password"
                    label="Password"
                    margin="normal"
                    type="password"
                    onChange={this.onChange('password')}
                    value="123Soleil!"
                    required
                    fullWidth
                  />
                  <Typography component="p" color="error">
                    { failed && this.getError(data) }
                  </Typography>
                  <div className={classes.buttonContainer}>
                    <LoadingButton
                      color="primary"
                      type="submit"
                      loading={fetching}
                      success={!failed}
                    >
                      Connection
                    </LoadingButton>
                  </div>
                </form>
              )}
            </Fetch>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

const styles = ({ palette, spacing }) => ({
  container: {
    height: '100vh',
    backgroundColor: palette.grey[200],
  },
  paper: {
    padding: spacing.unit * 4,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row-reverse',
    marginTop: spacing.unit * 3,
  },
  errors: {
    color: palette.error.main,
  },
});

const mapDispatchToProps = {
  dLogIn: logIn,
};

export default compose(
  withStyles(styles),
  connect(null, mapDispatchToProps),
)(SignIn);
