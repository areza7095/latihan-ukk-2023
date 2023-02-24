import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';


export default function Home({navigation}) {
  const [nik, setNik] = useState('');

  

  const retrieveNik = async () => {
    try {
      const value = await AsyncStorage.getItem('nik');
      if (value !== null) {
        const nikString = value
        const nikInt = parseInt(nikString)
        setNik(nikInt)
      }
    } catch (error) {
      alert( error)
    }
  };

  const handleLogout = () => {
    AsyncStorage.clear();
    navigation.navigate('Login');
  };

  const handleLihatPengaduan = () => {
    navigation.replace('LihatPengaduan');
  };

  const handlekirimPengaduan = () => {
    navigation.replace('kirimPengaduan');
  };

  useEffect(() => {
    retrieveNik();
  }, []);


  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handlekirimPengaduan}>
        <Text style={styles.textButton}>Kirim Pengaduan</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLihatPengaduan}>
        <Text style={styles.textButton}>Lihat Pengaduan</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.textButton}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 30,
    color: 'orange',
  },
  button: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange',
    borderRadius: 5,
    marginTop: 25,
  },
  textButton: {
    color: 'white',
    fontWeight: '700',
  },
});
