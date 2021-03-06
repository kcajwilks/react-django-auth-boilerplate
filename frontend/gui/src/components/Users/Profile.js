import React from 'react';

// reactstrap components
import { Button, Card, Container, Row, Col } from 'reactstrap';

// core components
import NavigationBar from 'components/Navbars/Navbar.js';
import Footer from 'components/Footers/Footer.js';

// redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadUser } from '../../redux/actions/auth';

// component imports
import SettingsTab from './ProfileComponents/SettingsTab';

class Profile extends React.Component {
  static propTypes = {
    loadUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  };
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }

  render() {
    return (
      <>
        <NavigationBar />
        <main className="profile-page" ref="main">
          <section className="section-profile-cover section-shaped my-0">
            {/* Circles background */}
            <div className="shape shape-style-1 shape-default alpha-4">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            {/* SVG separator */}
            <div className="separator separator-bottom separator-skew">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="fill-white"
                  points="2560 0 2560 100 0 100"
                />
              </svg>
            </div>
          </section>
          <section className="section">
            <Container>
              <Card className="card-profile shadow mt--300">
                <div className="px-4">
                  <Row className="justify-content-center">
                    <Col className="order-lg-2" lg="3">
                      <div className="card-profile-image">
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={require('assets/img/theme/blank-user.jpg')}
                          />
                        </a>
                      </div>
                    </Col>
                    <Col
                      className="order-lg-3 text-lg-right align-self-lg-center"
                      lg="4"
                    >
                      <div className="card-profile-actions py-4 mt-lg-0">
                        <Button
                          className="mr-4"
                          color="info"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                          size="sm"
                        >
                          Edit Settings
                        </Button>
                        <Button
                          className="float-right"
                          color="default"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                          size="sm"
                        >
                          Logout
                        </Button>
                      </div>
                    </Col>
                    <Col className="order-lg-1" lg="4">
                      <div className="card-profile-stats d-flex justify-content-center">
                        <div>
                          <span className="heading">22</span>
                          <span className="description">Friends</span>
                        </div>
                        <div>
                          <span className="heading">10</span>
                          <span className="description">Photos</span>
                        </div>
                        <div>
                          <span className="heading">89</span>
                          <span className="description">Comments</span>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <div className="text-center mt-5">
                    <h3>
                      {this.props.user.username}
                      <span className="font-weight-light"></span>
                    </h3>
                    <div className="h6 font-weight-300">
                      <i className="ni location_pin mr-2" />
                      {this.props.user.first_name} {this.props.user.last_name}
                    </div>
                    <div className="h6 mt-4">
                      <i className="ni business_briefcase-24 mr-2" />
                      {this.props.user.email}
                    </div>
                    <div>
                      <i className="ni education_hat mr-2" />
                      Your Profile Account
                    </div>
                  </div>
                  <div className="mt-5 py-5 border-top text-center">
                    <Row className="justify-content-center">
                      <Col lg="9">
                        <p>
                          An artist of considerable range, Ryan — the name taken
                          by Melbourne-raised, Brooklyn-based Nick Murphy —
                          writes, performs and records all of his own music,
                          giving it a warm, intimate feel with a solid groove
                          structure. An artist of considerable range.
                        </p>
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                          Show more
                        </a>
                      </Col>
                    </Row>
                  </div>
                  <div className="mt-5 py-5 border-top text-center">
                    <div className="h6 font-weight-300">
                      <i className="ni location_pin mr-2" />
                      Account Settings
                    </div>
                    <SettingsTab user={this.props.user} />
                  </div>
                </div>
              </Card>
            </Container>
          </section>
        </main>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { loadUser })(Profile);
