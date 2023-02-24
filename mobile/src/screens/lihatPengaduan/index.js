import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {hapus_pengaduan, lihat_pengaduan} from '../../api/user_api';

import {Avatar, Button, Card, Text} from 'react-native-paper';
import moment from 'moment/moment';

export default function Home({navigation}) {
  const [nik, setNik] = useState('');
  const [pengaduan, setPengaduan] = useState([]);

  useEffect(() => {
    retrieveNik();
    handleLihatPengaduan();
  }, []);

  const baseURL = 'http://192.168.1.67:3303/'


  
  

  const handleBack = () => {
    navigation.navigate('Home');
  };

  const retrieveNik = async () => {
    try {
      const value = await AsyncStorage.getItem('nik');
      if (value !== null) {
        const nikString = value;
        const nikInt = parseInt(nikString);
        setNik(nikInt);
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleLihatPengaduan = () => {
    lihat_pengaduan({
      nik: nik,
    })
      .then(result => {
        if (result.status == 200) {
          return setPengaduan(result.data);
        } else {
          alert(result.message);
        }
      })
      .catch(err => {
        alert('error', err);
      });
  };

  const handleHapusPengaduan = (idPengaduan) => {
    hapus_pengaduan({
      id_pengaduan: idPengaduan
    })
      .then(result => {
        console.log('result:', result);
        if (result.status == 200) {
          alert('Laporan Anda Berhasil Dihapus');
          navigation.replace('LihatPengaduan');
        } else {
          alert(result.message);
        }
      })
      .catch(err => {
        alert('error', err);
      });
  };



  return (
    <ScrollView vertical={true}>
      <View style={styles.container}>
        {pengaduan.map((data, index) => {
          return (
            <>
              <Card key={data.id_pengaduan} style={styles.cardPengaduan}>
                <Card.Content style={styles.cardContentPengaduan} key={data.id_pengaduan}>
                  <Text variant="titleLarge" >{data.jdl_laporan}</Text>
                  <Text variant="bodyMedium">
                    {moment(data.tgl_pengaduan).format('MMMM Do YYYY')}
                  </Text>
                  <Text variant="bodyMedium">{data.status}</Text>
                </Card.Content>
                <Card.Cover source={{uri: `${baseURL}${data.foto}`}} />
                <Card.Actions>
                  <Button onPress={() => handleHapusPengaduan(data.id_pengaduan)} >Hapus</Button>
                </Card.Actions>
              </Card>

            </>
          );
        })}
        <TouchableOpacity style={styles.button} onPress={handleBack}>
          <Text style={styles.textButton}>Kembali</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
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
  cardPengaduan: {
    marginBottom:30
  },
  cardContentPengaduan: {
    paddingLeft:200
  }
});
