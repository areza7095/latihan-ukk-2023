import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {hapus_pengaduan, lihat_pengaduan} from '../../api/user_api';

import {Avatar, Button, Card, Text} from 'react-native-paper';
import moment from 'moment/moment';
import axios from 'axios';

export default function Home({navigation}) {
  const [nik, setNik] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [pengaduan, setPengaduan] = useState([]);

  const baseURL = 'http://169.254.176.137:3303/';

  useEffect(() => {
    retrievePersonalInfo();
  }, []);

  const retrievePersonalInfo = async () => {
    try {
      const nik = await AsyncStorage.getItem('nik');
      const accessToken = await AsyncStorage.getItem('AccessToken');
      if (accessToken != '') {
        const nikString = nik;
        const nikInt = parseInt(nikString);
        setNik(nikInt);
        setAccessToken(accessToken);
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleBack = () => {
    navigation.navigate('Home');
  };

  const handleLihatPengaduan = () => {
    lihat_pengaduan(
      {
        nik: nik.toString(),
      },
      accessToken,
    ).then(result => {
      if (result.status == 200) {
        return setPengaduan(result.data);
      }
    });
  };
  handleLihatPengaduan();

  const handleHapusPengaduan = idPengaduan => {
    hapus_pengaduan(
      {
        id_pengaduan: idPengaduan,
      },
      accessToken,
    )
      .then(result => {
        // console.log('result:', result);
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
                <Card.Content
                  style={styles.cardContentPengaduan}
                  key={data.id_pengaduan}>
                  <Text variant="titleLarge">{data.jdl_laporan}</Text>
                  <Text variant="bodyMedium">
                    {moment(data.tgl_pengaduan).format('MMMM Do YYYY')}
                  </Text>
                  <Text variant="bodyMedium">{data.status}</Text>
                  
                </Card.Content>
                <Card.Cover style={{marginBottom:20, marginTop:10}} source={{uri: `${baseURL}${data.foto}`}}  />
                <Text variant="bodyLarge">Pesan : {data.tanggapan != null && (
                    <Text variant="bodyMedium">{data.tanggapan.tanggapan}</Text>
                  )}</Text>
                
                <Card.Actions>
                  {data.status == 'Tertunda' && (
                    <Button
                      onPress={() => handleHapusPengaduan(data.id_pengaduan)}>
                      Hapus
                    </Button>
                  )}
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
    marginBottom: 30,
  },
  cardContentPengaduan: {
    paddingLeft: 200,
  },
});
