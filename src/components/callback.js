import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Heading, Text, ButtonCircle, Flex, Circle, Box, Blockquote } from "rebass";
import { setToken } from "../actions/token";
import { signInError, signInSuccess, getUser, signOutSuccess, getNotes, pollSong, getLyrics } from "../actions/shared";

class Callback extends React.Component {
  componentDidMount() {
    const error = /[#&]error=/.exec(window.location.hash);

    if (error) {
      this.props.dispatch(signInError());
    }

    const match = /[#&]access_token=([^&]*)/.exec(window.location.hash);
    if (match) {
      const accessToken = decodeURIComponent(match[1].replace(/\+g/, " "));
      const options = {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      };
      this.props.dispatch(setToken(accessToken));
      localStorage.setItem("ACCESS_TOKEN", accessToken);
      this.props.dispatch(signInSuccess());
      this.fetchData(options);
    } else if (localStorage.getItem("ACCESS_TOKEN")) {
      const accessToken = localStorage.getItem("ACCESS_TOKEN");
      const options = {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      };
      this.props.dispatch(setToken(accessToken));
      this.props.dispatch(signInSuccess());
      this.fetchData(options);
    }

    window.location.hash = "";
  }
  getLyrics = () => {
    const { song, artist } = this.props.state.currSong;
    this.props.dispatch(getLyrics({ song, artist }));
  };
  getAnnotations = () => {
    const { song, artist } = this.props.state.currSong;
    this.props.dispatch(getNotes({ song, artist }));
  };
  fetchData = options => {
    this.props.dispatch(getUser(options));
    this.props.dispatch(pollSong(options));
  };
  signOut = () => {
    this.props.dispatch(signOutSuccess());
    localStorage.removeItem("ACCESS_TOKEN");
  };
  render() {
    const {
      currSong,
      loading,
      loadingStats,
      loadingNotes,
      login,
      stats,
      error,
      notes,
      loadingLyrics,
      user,
      lyrics
    } = this.props.state;
    const { song, artist, duration, isPlaying } = currSong;
    const [tempo, key, danceability] = stats;
    return (
      <Container p={3}>
        {login && (
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>
            <ButtonCircle onClick={this.signOut} style={{ display: "block", marginLeft: "auto", cursor: "pointer" }}>
              LOGOUT
            </ButtonCircle>
          </Link>
        )}
        <Heading style={{ textAlign: "center" }} mb={4}>
          {loading && "Loading..."}
          {!loading && user && `Welcome, ${user}.`}
        </Heading>
        <Text style={{ textAlign: "center" }} color={error ? "red" : "black"} mb={4}>
          {!loading &&
            !isPlaying &&
            login &&
            !error &&
            "You are currently not playing anything. Please play a song on Spotify."}
          {!loading &&
            isPlaying && (
              <span>
                You're listening to <strong>{song}</strong> by <strong>{artist}</strong>
              </span>
            )}
          {!login && !loading && !error && "Please log in."}
          {error && "Something went wrong. Please try again."}
        </Text>
        {loadingStats && (
          <Text my={4} style={{ textAlign: "center" }}>
            Loading...
          </Text>
        )}
        {login &&
          !loadingStats &&
          stats.length > 0 &&
          isPlaying && (
            <Flex m={4} alignItems="center">
              <Box flex={1} style={{ textAlign: "center" }}>
                Tempo: <strong>{tempo} BPM</strong>
              </Box>
              <Box flex={1} style={{ textAlign: "center" }}>
                Key: <strong>{key}</strong>
              </Box>
              <Box flex={1} style={{ textAlign: "center" }}>
                Duration: <strong>{duration}</strong>
              </Box>
              <Box flex={1} style={{ textAlign: "center" }}>
                Danceability: <Circle bg={danceability} />
              </Box>
            </Flex>
          )}
        {isPlaying &&
          login &&
          !loadingNotes &&
          !notes &&
          !error && (
            <ButtonCircle style={{ display: "block", margin: "auto", cursor: "pointer" }} onClick={this.getAnnotations}>
              GET NOTES
            </ButtonCircle>
          )}
        {!loadingNotes &&
          isPlaying &&
          login &&
          notes && (
            <Fragment>
              <Text my={4} style={{ textAlign: "center" }} dangerouslySetInnerHTML={{ __html: notes.annot }} />
              <Text my={4} style={{ textAlign: "center" }} dangerouslySetInnerHTML={{ __html: notes.embed }} />
            </Fragment>
          )}
        {isPlaying &&
          login &&
          notes &&
          !loadingLyrics &&
          !lyrics && (
            <ButtonCircle style={{ display: "block", margin: "auto", cursor: "pointer" }} onClick={this.getLyrics}>
              GET LYRICS
            </ButtonCircle>
          )}
        {login &&
          isPlaying &&
          notes &&
          !loadingLyrics &&
          lyrics && (
            <Blockquote p={4} style={{ textAlign: "center", border: "1px solid black", borderRadius: "4px" }}>
              {lyrics}
            </Blockquote>
          )}
        {loadingNotes && isPlaying && login && <Text style={{ textAlign: "center" }}>Loading...</Text>}
        {loadingLyrics && isPlaying && login && <Text style={{ textAlign: "center" }}>Loading...</Text>}
        {(error || (!login && !loading)) && (
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>
            <ButtonCircle onClick={this.signOut} style={{ display: "block", margin: "auto", cursor: "pointer" }}>
              {error ? "RETRY" : "LOGIN"}
            </ButtonCircle>
          </Link>
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => ({ state });

export default connect(mapStateToProps)(Callback);
