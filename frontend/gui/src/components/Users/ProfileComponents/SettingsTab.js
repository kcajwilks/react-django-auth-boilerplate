import React from 'react';
// reactstrap components
import { Card, CardBody, NavItem, Nav, Modal, Button } from 'reactstrap';

// redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  updateUser,
  passwordChange,
  changeEmail,
  resendEmail,
  deleteEmail,
} from '../../../redux/actions/auth';

// form validation
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

class SettingsTab extends React.Component {
  static propTypes = {
    updateUser: PropTypes.func.isRequired,
    passwordChange: PropTypes.func.isRequired,
    changeEmail: PropTypes.func.isRequired,
    resendEmail: PropTypes.func.isRequired,
    deleteEmail: PropTypes.func.isRequired,
  };
  state = {
    defaultModal: false,
  };
  toggleModal = (state) => {
    this.setState({
      [state]: !this.state[state],
    });
  };
  render() {
    return (
      <>
        <div className="nav-wrapper">
          <Nav
            className="nav-fill flex-column flex-md-row"
            id="tabs-icons-text"
            pills
            role="tablist"
          >
            <NavItem>
              <Button
                className="mb-sm-3 mb-md-0"
                color="primary"
                type="button"
                onClick={() => this.toggleModal('profileModal')}
                href="#pablo"
                role="modal"
              >
                <i className="ni ni-single-02 mr-2" />
                Account Settings
              </Button>
              <Modal
                className="modal-dialog-centered"
                size="sm"
                isOpen={this.state.profileModal}
                toggle={() => this.toggleModal('profileModal')}
              >
                <div className="modal-body p-0">
                  <Card className="bg-secondary shadow border-0">
                    <CardBody className="px-lg-5 py-lg-5">
                      <div className="text-center text-muted mb-4">
                        <small>Account Settings</small>
                        <br />
                      </div>
                      <Formik
                        initialValues={{
                          username: this.props.user.username,
                          first_name: this.props.user.first_name,
                          last_name: this.props.user.last_name,
                        }}
                        validationSchema={Yup.object().shape({
                          username: Yup.string().required(
                            'Username is required'
                          ),
                          first_name: Yup.string().notRequired(),
                          last_name: Yup.string().notRequired(),
                        })}
                        onSubmit={(fields) => {
                          // (fields = {
                          //   username: fields.username,
                          //   first_name: fields.firstName,
                          //   last_name: fields.lastName,
                          // }),
                          this.props.updateUser(fields);
                          console.log(fields);
                        }}
                        render={({ errors, status, touched }) => (
                          <Form>
                            <div className="form-group">
                              <label htmlFor="username">Username</label>
                              <Field
                                name="username"
                                type="text"
                                className={
                                  'form-control' +
                                  (errors.username && touched.username
                                    ? ' is-invalid'
                                    : '')
                                }
                              />
                              <ErrorMessage
                                name="username"
                                component="div"
                                className="invalid-feedback"
                              />
                            </div>
                            <div className="form-group">
                              <label htmlFor="first_name">First Name</label>
                              <Field
                                name="first_name"
                                type="text"
                                className={
                                  'form-control' +
                                  (errors.firstName && touched.firstName
                                    ? ' is-invalid'
                                    : '')
                                }
                              />
                              <ErrorMessage
                                name="first_name"
                                component="div"
                                className="invalid-feedback"
                              />
                            </div>
                            <div className="form-group">
                              <label htmlFor="last_name">Last Name</label>
                              <Field
                                name="last_name"
                                type="text"
                                className={
                                  'form-control' +
                                  (errors.lastName && touched.lastName
                                    ? ' is-invalid'
                                    : '')
                                }
                              />
                              <ErrorMessage
                                name="last_name"
                                component="div"
                                className="invalid-feedback"
                              />
                            </div>
                            <div className="form-group">
                              <button type="submit" className="btn btn-primary">
                                Update
                              </button>
                            </div>
                          </Form>
                        )}
                      />
                    </CardBody>
                  </Card>
                </div>
              </Modal>
            </NavItem>
            <NavItem>
              <Button
                className="mb-sm-3 mb-md-0"
                color="primary"
                type="button"
                onClick={() => this.toggleModal('passwordModal')}
                href="#pablo"
                role="modal"
              >
                <i className="ni ni-lock-circle-open mr-2" />
                Change Password
              </Button>
              <Modal
                className="modal-dialog-centered"
                size="sm"
                isOpen={this.state.passwordModal}
                toggle={() => this.toggleModal('passwordModal')}
              >
                <div className="modal-body p-0">
                  <Card className="bg-secondary shadow border-0">
                    <CardBody className="px-lg-5 py-lg-5">
                      <div className="text-center text-muted mb-4">
                        <small>Update Password</small>
                        <br />
                      </div>
                      <Formik
                        initialValues={{
                          new_password1: '',
                          new_password2: '',
                          old_password: '',
                        }}
                        validationSchema={Yup.object().shape({
                          new_password1: Yup.string()
                            .min(6, 'Password must be at least 6 characters')
                            .required('Password is required'),
                          new_password2: Yup.string()
                            .oneOf(
                              [Yup.ref('new_password1'), null],
                              'Passwords must match'
                            )
                            .required('Confirm Password is required'),
                          old_password: Yup.string().required(
                            'Confirm Password is required'
                          ),
                        })}
                        onSubmit={(fields, { resetForm }) => {
                          this.props.passwordChange(fields);
                          resetForm({ fields: '' });
                        }}
                        render={({ errors, status, touched }) => (
                          <Form>
                            <div className="form-group">
                              <label htmlFor="old_password">
                                Enter Currenty Password
                              </label>
                              <Field
                                name="old_password"
                                type="password"
                                placeholder="********"
                                className={
                                  'form-control' +
                                  (errors.old_password && touched.old_password
                                    ? ' is-invalid'
                                    : '')
                                }
                              />
                              <ErrorMessage
                                name="old_password"
                                component="div"
                                className="invalid-feedback"
                              />
                            </div>
                            <div className="form-group">
                              <label htmlFor="new_password1">
                                Enter New Password
                              </label>
                              <Field
                                name="new_password1"
                                type="password"
                                className={
                                  'form-control' +
                                  (errors.new_password1 && touched.new_password1
                                    ? ' is-invalid'
                                    : '')
                                }
                              />
                              <ErrorMessage
                                name="new_password1"
                                component="div"
                                className="invalid-feedback"
                              />
                            </div>
                            <div className="form-group">
                              <label htmlFor="new_password2">
                                Confirm New Password
                              </label>
                              <Field
                                name="new_password2"
                                type="password"
                                className={
                                  'form-control' +
                                  (errors.new_password2 && touched.new_password2
                                    ? ' is-invalid'
                                    : '')
                                }
                              />
                              <ErrorMessage
                                name="new_password2"
                                component="div"
                                className="invalid-feedback"
                              />
                            </div>
                            <div className="form-group">
                              <button type="submit" className="btn btn-primary">
                                Reset Password
                              </button>
                            </div>
                          </Form>
                        )}
                      />
                    </CardBody>
                  </Card>
                </div>
              </Modal>
            </NavItem>
            <NavItem>
              <Button
                className="mb-sm-3 mb-md-0"
                color="primary"
                type="button"
                onClick={() => this.toggleModal('emailModal')}
                href="#pablo"
                role="modal"
              >
                <i className="ni ni-email-83 mr-2" />
                Update Email
              </Button>
              <Modal
                className="modal-dialog-centered"
                size="sm"
                isOpen={this.state.emailModal}
                toggle={() => this.toggleModal('emailModal')}
              >
                <div className="modal-body p-0">
                  <Card className="bg-secondary shadow border-0">
                    <CardBody className="px-lg-5 py-lg-5">
                      <div className="text-center text-muted mb-4">
                        <small>Update Email Settings</small>
                        <br />
                        <small>(This will removed your existing email)</small>
                      </div>
                      <p>Current Email: {this.props.user.email}</p>
                      <Formik
                        initialValues={{
                          email: '',
                        }}
                        validationSchema={Yup.object().shape({
                          email: Yup.string()
                            .email('Email is invalid')
                            .required('Email is required'),
                        })}
                        onSubmit={(fields) => {
                          this.props.changeEmail(fields);
                        }}
                        render={({ errors, status, touched }) => (
                          <Form>
                            <div className="form-group">
                              <label htmlFor="email">
                                Change Email Address
                              </label>
                              <Field
                                name="email"
                                type="text"
                                placeholder="Enter new email..."
                                className={
                                  'form-control' +
                                  (errors.email && touched.email
                                    ? ' is-invalid'
                                    : '')
                                }
                              />
                              <ErrorMessage
                                name="email"
                                component="div"
                                className="invalid-feedback"
                              />
                            </div>
                            <div className="form-group">
                              <button type="submit" className="btn btn-primary">
                                Change Email
                              </button>
                            </div>
                          </Form>
                        )}
                      />
                    </CardBody>
                  </Card>
                </div>
              </Modal>
            </NavItem>
          </Nav>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {
  updateUser,
  passwordChange,
  changeEmail,
  resendEmail,
  deleteEmail,
})(SettingsTab);
