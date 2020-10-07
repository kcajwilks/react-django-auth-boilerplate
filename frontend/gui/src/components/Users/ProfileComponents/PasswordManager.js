import React from 'react';

// reactstrap components
// import { Row, Col } from 'reactstrap';
import { Button, Card, CardHeader, CardBody, Modal, Col } from 'reactstrap';

// form validation
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loadUser, passwordChange } from '../../../redux/actions/auth';

export class EmailManager extends React.Component {
  static propTypes = {
    loadUser: PropTypes.func.isRequired,
    passwordChange: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
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
    // Assign user props
    const user = this.props.user;

    return (
      <Col md="4">
        <Button
          block
          color="default"
          type="button"
          onClick={() => this.toggleModal('formModal')}
        >
          Password Settings
        </Button>
        <Modal
          className="modal-dialog-centered"
          size="sm"
          isOpen={this.state.formModal}
          toggle={() => this.toggleModal('formModal')}
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
      </Col>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});
export default connect(mapStateToProps, { passwordChange })(EmailManager);
