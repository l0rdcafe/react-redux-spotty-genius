import React, { Component } from "react";
import { Container, Heading, ButtonCircle } from "rebass";
import URL from "../constants/auth";

class App extends Component {
  signIn = () => {
    window.location = URL;
  };
  render() {
    return (
      <Container p={4}>
        <Heading mt={3} mb={4}>
          Sign in to Spotify to view info about your currently playing song
        </Heading>
        <ButtonCircle style={{ display: "block", margin: "auto", cursor: "pointer" }} onClick={this.signIn}>
          LOGIN
        </ButtonCircle>
      </Container>
    );
  }
}

export default App;
