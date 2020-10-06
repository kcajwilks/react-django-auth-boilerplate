import React from 'react';
import { Link, Redirect } from 'react-router-dom';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
} from 'reactstrap';

// core components
import NavigationBar from 'components/Navbars/Navbar.js';
import Footer from 'components/Footers/Footer.js';

// form validation
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../redux/actions/auth';

class Register extends React.Component {
  static propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  };
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }
  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/profile" />;
    }
    return (
      <>
        {/* <NavigationBar /> */}
        <main ref="main">
          <section className="section section-shaped section-lg">
            <div className="shape shape-style-1 bg-gradient-default">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <Container className="pt-lg-7">
              <Row className="justify-content-center">
                <Col lg="5">
                  <Card className="bg-secondary shadow border-0">
                    <CardHeader className="bg-white pb-5">
                      <div className="text-muted text-center mb-3">
                        <small>Sign up with</small>
                      </div>
                      <div className="text-center">
                        <Button
                          className="btn-neutral btn-icon mr-4"
                          color="default"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <span className="btn-inner--icon mr-1">
                            <img
                              alt="..."
                              src={require('assets/img/icons/common/github.svg')}
                            />
                          </span>
                          <span className="btn-inner--text">Github</span>
                        </Button>
                        <Button
                          className="btn-neutral btn-icon ml-1"
                          color="default"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <span className="btn-inner--icon mr-1">
                            <img
                              alt="..."
                              src={require('assets/img/icons/common/google.svg')}
                            />
                          </span>
                          <span className="btn-inner--text">Google</span>
                        </Button>
                      </div>
                    </CardHeader>
                    <CardBody className="px-lg-5 py-lg-5">
                      <div className="text-center text-muted mb-4">
                        <small>Or sign up with credentials</small>
                      </div>

                      <Formik
                        initialValues={{
                          username: '',
                          email: '',
                          password1: '',
                          password2: '',
                        }}
                        validationSchema={Yup.object().shape({
                          username: Yup.string().required(
                            'Username is required'
                          ),
                          email: Yup.string()
                            .email('Email is invalid')
                            .required('Email is required'),
                          password1: Yup.string()
                            .min(6, 'Password must be at least 6 characters')
                            .required('Password is required'),
                          password2: Yup.string()
                            .oneOf(
                              [Yup.ref('password1'), null],
                              'Passwords must match'
                            )
                            .required('Confirm Password is required'),
                        })}
                        onSubmit={(fields) => {
                          this.props.register(fields);
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
                              <label htmlFor="email">Email</label>
                              <Field
                                name="email"
                                type="text"
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
                              <label htmlFor="password1">Password</label>
                              <Field
                                name="password1"
                                type="password"
                                className={
                                  'form-control' +
                                  (errors.password1 && touched.password1
                                    ? ' is-invalid'
                                    : '')
                                }
                              />
                              <ErrorMessage
                                name="password1"
                                component="div"
                                className="invalid-feedback"
                              />
                            </div>
                            <div className="form-group">
                              <label htmlFor="password2">
                                Confirm Password
                              </label>
                              <Field
                                name="password2"
                                type="password"
                                className={
                                  'form-control' +
                                  (errors.password2 && touched.password2
                                    ? ' is-invalid'
                                    : '')
                                }
                              />
                              <ErrorMessage
                                name="password2"
                                component="div"
                                className="invalid-feedback"
                              />
                            </div>
                            <div className="form-group">
                              <button type="submit" className="btn btn-primary">
                                Register
                              </button>
                            </div>
                            <p>
                              Already have an account?{' '}
                              <Link to="/login">Login</Link>
                            </p>
                          </Form>
                        )}
                      />
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </section>
        </main>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register })(Register);
