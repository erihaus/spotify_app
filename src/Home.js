import React, { Component } from "react";
import * as $ from "jquery";
import { authEndpoint, clientId, redirectUri, scopes } from "./config_example";
import hash from "./hash";
import Player from "./Player";
import logo from "./logo.svg";
import Form from "./Form";
import "./App.css";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
      item: {
        album: {
          images: [{ url: "" }]
        },
        name: "",
        artists: [{ name: "" }],
        duration_ms: 0,
      },
      is_playing: "Paused",
      progress_ms: 0
    };
    this.getCurrentlyPlaying = this.getCurrentlyPlaying.bind(this);
    this.getTopArtists = this.getTopArtists.bind(this);
  }
  componentDidMount() {
    // Set token
    let _token = hash.access_token;

    if (_token) {
      // Set token
      this.setState({
        token: _token
      });
      this.getCurrentlyPlaying(_token);
      this.getTopArtists(_token);
    }
  }
  listArtists(item, index) {
    console.log(item.name);
  }
  getTopArtists(token) {
    $.ajax({
      url: "https://api.spotify.com/v1/me/top/artists",
      type: "GET",
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: (data) => {
        data.items.forEach(this.listArtists);
      }
    })
  }
  getCurrentlyPlaying(token) {
    // Make a call using the token
    $.ajax({
      url: "https://api.spotify.com/v1/me/player",
      type: "GET",
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: (data) => {
        console.log("data", data);
        this.setState({
          item: data.item,
          is_playing: data.is_playing,
          progress_ms: data.progress_ms,
        });
      }
    });
  }

  render() {

    return (
      <div className="App">
        <link href="https://fonts.googleapis.com/css?family=Bungee+Hairline&display=swap" rel="stylesheet"></link>

        <header className="App-header">
          <h1 class="logo">Music Findr.</h1>
          <br />
          <h1 class="sub">Find new music via Spotify and Youtube.</h1>
          <br />
          <br />
          {!this.state.token && (
            <a
              className="btn btn--loginApp-link"
              href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                "%20"
              )}&response_type=token&show_dialog=true`}
            >
              Login to Spotify
            </a>
          )}
          {/* {this.state.token && (
            <Player
              item={this.state.item}
              is_playing={this.state.is_playing}
              progress_ms={this.progress_ms}
            />
          )} */}
          {this.state.token && (
            <Form />
          )}
        </header>
      </div>
    );
  }
}

export default Home;
