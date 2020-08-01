import React, { Component } from "react";
import Credentials from "./Credentials";

class Auth extends Component {  
  constructor (props) {
    super(props);
    this.state = {
      isAuthenticatedWithSpotify: false,
      menu: this.props.userId.menu
    };
    this.state.handleRedirect = this.handleRedirect.bind(this);
  }


  generateRandomString(length) {
    let text = "";
    const possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  } 

  getHashParams() {
    const hashParams = {};
    const r = /([^&;=]+)=?([^&;]*)/g;
    const q = window.location.hash.substring(1);
    let e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }

  componentDidMount() {
    //if (this.props.isAuthenticated) {
    const params = this.getHashParams();

    const access_token = params.access_token;
    const state = params.state;
    const storedState = localStorage.getItem(Credentials.stateKey);
    localStorage.setItem("spotifyAuthToken", access_token);
    localStorage.getItem("spotifyAuthToken");

    if (window.localStorage.getItem("authToken")) {
      this.setState({ isAuthenticatedWithSpotify: true });
    }
    if (access_token && (state == null || state !== storedState)) {
      alert("Click \"ok\" to finish authentication with Spotify");
    } else {
      localStorage.removeItem(Credentials.stateKey);
    }
    // DO STUFF WITH ACCEES TOKEN HERE
    this.props.onConnectWithSpotify(access_token); 
  }

  handleRedirect(event) {
    event.preventDefault();
    this.props.createMessage("You linked your Spotify account!", "success");

    const params = this.getHashParams();
    const access_token = params.access_token;
    console.log(access_token);

    const state = this.generateRandomString(16);
    localStorage.setItem(Credentials.stateKey, state);

    let url = "https://accounts.spotify.com/authorize";
    url += "?response_type=token";
    url += "&client_id=" + encodeURIComponent(Credentials.client_id);
    url += "&scope=" + encodeURIComponent(Credentials.scope);
    url += "&redirect_uri=" + encodeURIComponent(Credentials.redirect_uri);
    url += "&state=" + encodeURIComponent(state);
    window.location = url; 
  }

  render() {
    return (
      <div className="button_container">
        <h1 className="title is-4"><font color="#C86428">Welcome</font></h1>
        <div className="Line" /><br/>
        <button className="sp_button" onClick={(event) => this.handleRedirect(event)}>
          <strong>LINK YOUR SPOTIFY ACCOUNT</strong>
        </button>
      </div>
    );
  }
}
export default Auth;