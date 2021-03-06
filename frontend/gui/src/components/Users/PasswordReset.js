import React from 'react';
import { Link, Redirect } from 'react-router-dom';

// reactstrap components
import { Card, CardBody, Container, Row, Col } from 'reactstrap';

// core components
import NavigationBar from 'components/Navbars/Navbar.js';
import Footer from 'components/Footers/Footer.js';

// form validation
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { passwordReset } from '../../redux/actions/auth';

class PasswordReset extends React.Component {
  static propTypes = {
    passwordReset: PropTypes.func.isRequired,
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
                    <CardBody className="px-lg-5 py-lg-5">
                      <div className="text-center text-muted mb-4">
                        <small>Enter email below to reset password</small>
                      </div>
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
                          this.props.passwordReset(fields.email);
                          this.props.history.push('/login');
                        }}
                        render={({ errors, status, touched }) => (
                          <Form>
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
                              <button type="submit" className="btn btn-primary">
                                Reset Password
                              </button>
                            </div>
                            <p>
                              Try To Login? <Link to="/login">Login</Link>
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

export default connect(mapStateToProps, { passwordReset })(PasswordReset);
