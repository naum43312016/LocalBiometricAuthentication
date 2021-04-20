/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import * as LocalAuthentication from 'expo-local-authentication';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import Constants  from 'expo-constants';

class App extends React.Component{
  state = {
    compatible: false,
    fingerprints: false,
    result: '',
  };

  componentDidMount() {
    this.checkDeviceForHardware();
    this.checkForFingerprints();
  }

  checkDeviceForHardware = async () => {
    let compatible = await LocalAuthentication.hasHardwareAsync();
    this.setState({ compatible });
  };

  checkForFingerprints = async () => {
    let fingerprints = await LocalAuthentication.isEnrolledAsync();
    this.setState({ fingerprints });
    
  };

  scanFingerprint = async () => {
    let result = await LocalAuthentication.authenticateAsync(
      'Scan your finger.'
    );
    console.log('Scan Result:', result);
    this.setState({
      result: JSON.stringify(result),
    });
    
  };

  showAndroidAlert = () => {
    Alert.alert(
      'Fingerprint Scan',
      'Place your finger over the touch sensor and press scan.',
      [
        {
          text: 'Scan',
          onPress: () => {
            this.scanFingerprint();
          },
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel'),
          style: 'cancel',
        },
      ]
    );
  };
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          Compatible Device? {this.state.compatible === true ? 'True' : 'False'}
        </Text>
        <Text style={styles.text}>
          Fingerprings Saved?{' '}
          {this.state.fingerprints === true ? 'True' : 'False'}
        </Text>
        <TouchableOpacity
          onPress={
            Platform.OS === 'android'
              ? this.showAndroidAlert
              : this.scanFingerprint
          }
          style={styles.button}>
          <Text style={styles.buttonText}>SCAN</Text>
        </TouchableOpacity>
        <Text>{this.state.result}</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 60,
    backgroundColor: '#056ecf',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 30,
    color: '#fff',
  },
});

export default App;
