import React, { Component, Fragment } from 'react';
import { withAlert } from 'react-alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Connects errors and messages
export class Alerts extends Component {
  static propTypes = {
    error: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired,
  };
  componentDidUpdate(prevProps) {
    const { error, alert, message } = this.props;
    if (error !== prevProps.error) {
      // Error and Message catches
      if (error.msg.title) alert.error(`Title: ${error.msg.title.join()}`);
      if (error.msg.message)
        alert.error(`Message: ${error.msg.message.join()}`);
      // No field input in Form
      if (error.msg.non_field_errors)
        alert.error(error.msg.non_field_errors.join());
      // Registration
      if (error.msg.username) alert.error(error.msg.username.join());
      if (error.msg.password1) alert.error(error.msg.password1.join());
      if (error.msg.email) alert.error(error.msg.email.join());
    }

    if (message !== prevProps.message) {
      if (message.deletePool) alert.success(message.deletePool);
      if (message.addedPool) alert.success(message.addedPool);
      if (message.passwordsNotMatch) alert.error(message.passwordsNotMatch);
      if (message.emailSent) alert.success(message.emailSent);
      if (message.passwordChanged) alert.success(message.passwordChanged);
      if (message.updateUser) alert.success(message.updateUser);
    }
  }
  render() {
    return <Fragment />;
  }
}

const mapStateToProps = (state) => ({
  error: state.errors,
  message: state.messages,
});

export default connect(mapStateToProps)(withAlert()(Alerts));
