import React from 'react';
import { Link } from 'react-router-dom';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  // Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
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

class Login extends React.Component {
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }
  render() {
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
                        <small>Sign in with</small>
                      </div>
                      <div className="btn-wrapper text-center">
                        <Button
                          className="btn-neutral btn-icon"
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
                        <small>Or sign in with credentials</small>
                      </div>

                      <Formik
                        initialValues={{
                          username: '',
                          password: '',
                        }}
                        validationSchema={Yup.object().shape({
                          username: Yup.string().required(
                            'Username is required'
                          ),
                          password: Yup.string()
                            .min(6, 'Password must be at least 6 characters')
                            .required('Password is required'),
                        })}
                        onSubmit={(fields) => {
                          // this.props.login(fields.username, fields.password);
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
                              <label htmlFor="password">Password</label>
                              <Field
                                name="password"
                                type="password"
                                className={
                                  'form-control' +
                                  (errors.password && touched.password
                                    ? ' is-invalid'
                                    : '')
                                }
                              />
                              <ErrorMessage
                                name="password"
                                component="div"
                                className="invalid-feedback"
                              />
                            </div>
                            <div className="form-group">
                              <button type="submit" className="btn btn-primary">
                                Login
                              </button>
                            </div>
                          </Form>
                        )}
                      />
                    </CardBody>
                  </Card>
                  <Row className="mt-3">
                    <Col xs="6">
                      <Link className="text-light" to="/password-reset">
                        <small>Reset Password</small>
                      </Link>
                    </Col>
                    <Col className="text-right" xs="6">
                      <Link className="text-light" to="/register">
                        <small>Create Account</small>
                      </Link>
                    </Col>
                  </Row>
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

export default Login;
