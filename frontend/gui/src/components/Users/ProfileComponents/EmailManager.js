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

import {
  loadUser,
  changeEmail,
  resendEmail,
  deleteEmail,
} from '../../../redux/actions/auth';

export class EmailManager extends React.Component {
  static propTypes = {
    loadUser: PropTypes.func.isRequired,
    changeEmail: PropTypes.func.isRequired,
    resendEmail: PropTypes.func.isRequired,
    deleteEmail: PropTypes.func.isRequired,
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
          Email Settings
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
                  <small>Update Email Settings</small>
                  <br />
                  <small>(This will removed your existing email)</small>
                </div>
                <p>Current Email: {user.email}</p>
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
                    fields = {
                      email: fields.email,
                    };
                    this.props.changeEmail(fields);
                  }}
                  render={({ errors, status, touched }) => (
                    <Form>
                      <div className="form-group">
                        <label htmlFor="email">Change Email Address</label>
                        <Field
                          name="email"
                          type="text"
                          placeholder="Enter new email..."
                          className={
                            'form-control' +
                            (errors.email && touched.email ? ' is-invalid' : '')
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
      </Col>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});
export default connect(mapStateToProps, {
  loadUser,
  changeEmail,
  resendEmail,
  deleteEmail,
})(EmailManager);
