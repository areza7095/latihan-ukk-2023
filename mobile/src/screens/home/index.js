import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export default function Home({navigation}) {
  const [nik, setNik] = useState('');
  const [nama, setNama] = useState('');
  const [telp, setTelp] = useState('');
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    retrievePersonalData();
  }, []);

  const retrievePersonalData = async () => {
    try {
      const nik = await AsyncStorage.getItem('nik');
      const accessToken = await AsyncStorage.getItem('AccessToken');
      const nama = await AsyncStorage.getItem('nama');
      const telp = await AsyncStorage.getItem('telp');
    
        const nikString = nik;
        const nikInt = parseInt(nikString);
        setNik(nikInt);
        setAccessToken(accessToken);
        setNama(nama);
        setTelp(telp);
  
    } catch (error) {
      alert(error);
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
  return (
    <View style={styles.container}>
      <Text>Selamat Datang, {nama}</Text>
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
