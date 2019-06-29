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
  issuer: 'https://id.bitpod.io', // iam using this for the login page
  clientId: '5D008E97AE88EC125B223AE1',
  clientSecret: '5D008E97AE88EC125B223AE1',
  redirectUrl: 'io.identityserver.demo:/oauthredirect',
  scopes: ['openid', 'profile', 'offline_access', 'email', 'notification', 'baas']
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
