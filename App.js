/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Button, StyleSheet, View, Text } from 'react-native';
import { authorize } from 'react-native-app-auth';

// THIS IS A DEMO
const config = {
  issuer: 'https://id.bitpod.io/auth/connect/authorize?redirect_uri=io.identityserver.demo%3A%2Foauthredirect&client_id=5D008E97AE88EC125B223AE1&response_type=code&state=oWnPcoTf6a-d-G5U6xWe-A&scope=openid%20profile%20offline_access%20email%20notification%20baas&code_challenge=8sxPOYcm4ZnELb5LAudGoDYEHI0SgqB1CiCReWBaPq0&code_challenge_method=S256&client_secret=5D008E97AE88EC125B223AE1', // iam using this for the login page
  clientId: '5D008E97AE88EC125B223AE1',
  clientSecret: '5D008E97AE88EC125B223AE1',
  redirectUrl: 'io.identityserver.demo:/oauthredirect',
  scopes: ['openid', 'profile', 'offline_access', 'email', 'notification', 'baas'],
  serviceConfiguration: {
    authorizationEndpoint: 'https://login.bitpod.io/auth/connect/authorize',
    tokenEndpoint: 'https://login.bitpod.io/auth/connect/token',
  },
};

global.XMLHttpRequest = global.originalXMLHttpRequest
  ? global.originalXMLHttpRequest
  : global.XMLHttpRequest
global.FormData = global.originalFormData
  ? global.originalFormData
  : global.FormData

fetch // Ensure to get the lazy property

if (window.__FETCH_SUPPORT__) {
  // it's RNDebugger only to have
  window.__FETCH_SUPPORT__.blob = false
} else {
  /*
   * Set __FETCH_SUPPORT__ to false is just work for `fetch`.
   * If you're using another way you can just use the native Blob and remove the `else` statement
   */
  global.Blob = global.originalBlob ? global.originalBlob : global.Blob
  global.FileReader = global.originalFileReader
    ? global.originalFileReader
    : global.FileReader
}

export default class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      status: ''
    }
  }

  handleLogin = async () => {
    try {
      // Make request to Google to get token
      const authState = await authorize(config)
      this.setState({ status: authState.accessToken })
      console.log({ authState })
    } catch (error) {
      this.setState({ status: error.message })
      console.log('error', error)
    }
  }

  render() {
    const { status } = this.state
    return (
      <View style={styles.container}>
        <Button title="Login" style={styles.button} onPress={this.handleLogin} />
        <Text>{status}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  button: {
    borderWidth: 1,
    backgroundColor: '#bf00',
    borderRadius: 3,
  }
});
