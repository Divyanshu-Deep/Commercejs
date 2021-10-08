import React from "react";
import { Button } from "@material-ui/core";
import firebase from "../Firebase/firebase";

class GoogleLogin extends React.Component {
  handleSubmit = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        var user = result.user;
        console.log(user);
      })
      .catch((error) => {
        console.log(error)
      });
  };

  render() {
    return (
      <div style={{ paddingTop: "50px", paddingLeft: "50px" }}>
        <Button variant="contained" color="primary" onClick={this.handleSubmit}>
          Google Login
        </Button>
      </div>
    );
  }
}

export default GoogleLogin;
