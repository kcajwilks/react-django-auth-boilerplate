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

import { loadUser, updateUser } from '../../../redux/actions/auth';

export class UserManager extends React.Component {
  static propTypes = {
    loadUser: PropTypes.func.isRequired,
    updateUser: PropTypes.func.isRequired,
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
          Profile Settings
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
                  <small>Update Your Information</small>
                </div>
                <Formik
                  initialValues={{
                    username: user.username,
                    firstName: user.first_name,
                    lastName: user.last_name,
                  }}
                  validationSchema={Yup.object().shape({
                    username: Yup.string().required('Username is required'),
                    firstName: Yup.string().notRequired(),
                    lastName: Yup.string().notRequired(),
                  })}
                  onSubmit={(fields) => {
                    // (fields = {
                    //   username: fields.username,
                    //   first_name: fields.firstName,
                    //   last_name: fields.lastName,
                    // }),
                    // this.props.updateUser(fields);
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
                        <label htmlFor="firstName">First Name</label>
                        <Field
                          name="firstName"
                          type="text"
                          className={
                            'form-control' +
                            (errors.firstName && touched.firstName
                              ? ' is-invalid'
                              : '')
                          }
                        />
                        <ErrorMessage
                          name="firstName"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <Field
                          name="lastName"
                          type="text"
                          className={
                            'form-control' +
                            (errors.lastName && touched.lastName
                              ? ' is-invalid'
                              : '')
                          }
                        />
                        <ErrorMessage
                          name="lastName"
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
      </Col>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});
export default connect(mapStateToProps, { loadUser, updateUser })(UserManager);
