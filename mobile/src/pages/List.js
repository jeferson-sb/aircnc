import React, { useState, useEffect } from 'react';
import socketio from 'socket.io-client';
import {
  SafeAreaView,
  Image,
  AsyncStorage,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  Alert,
} from 'react-native';
import { API_URL } from 'react-native-dotenv';

import SpotList from '../components/SpotList';
import logo from '../assets/logo.png';

export default function List({ navigation }) {
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('user').then((user_id) => {
      const socket = socketio(API_URL, {
        query: { user_id },
      });

      socket.on('booking_response', (booking) => {
        Alert.alert(
          `Sua reserva em ${booking.spot.company} em ${booking.date} foi ${
            booking.approved ? 'APROVADA' : 'REJEITADA'
          }`
        );
      });
    });
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('techs').then((storageTechs) => {
      console.log(storageTechs);
      const techsArr = storageTechs.split(',').map((tech) => tech.trim());
      setTechs(techsArr);
    });
  }, []);

  const logOut = () => {
    AsyncStorage.clear();
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableHighlight onPress={logOut}>
        <Image style={styles.logo} source={logo}></Image>
      </TouchableHighlight>
      <ScrollView>
        {techs.map((tech) => (
          <SpotList key={tech} tech={tech} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    height: 32,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 40,
    marginBottom: 15,
  },
});
