import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
  Image,
} from 'react-native';
import {kirim_pengaduan} from '../../api/user_api';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';

export default function KirimPengaduan({navigation}) {
  const [nik, setNik] = useState('');
  const [jdlLaporan, setJdlLaporan] = useState('');
  const [isiLaporan, setIsiLaporan] = useState('');
  const [foto, setFoto] = useState(null);
  // const [data, setData] = useState(null);

  const today = new Date();

  useEffect(() => {
    retrieveNik();
  }, []);

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

  const handlekirimPengaduan = () => {
    const formData = new FormData();
    const url = 'http://192.168.1.67:3303/api/masyarakat/pengaduan';

    if (foto !== null) {
      formData.append('nik', nik.toString());
      formData.append(
        'id_pengaduan',
        `${today.getFullYear()}${today.getHours()}${today.getMinutes()}${today.getSeconds()}`,
      );
      formData.append('jdl_laporan', jdlLaporan);
      formData.append('isi_laporan', isiLaporan);
      formData.append('fotoKejadian', {
        uri: foto.uri,
        name: foto.fileName,
        type: foto.type,
      });

      axios
        .post(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(response => {
          if (response.status == 200) {
            alert(
              'Laporan Anda Berhasil Dibuat, Silahkan menunggu info selanjutnya',
            );
            navigation.replace('Home');
          } else {
            alert(response.msg);
          }
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      alert('Image Harus di Upload');
    }

    // kirim_pengaduan({
    //   // id_pengaduan: `${today.getFullYear()}${today.getHours()}${today.getMinutes()}${today.getSeconds()}`,
    //   // nik: nik.toString(),
    //   // jdl_laporan: jdlLaporan,
    //   // isi_laporan: isiLaporan,
    //   // tgl_pengaduan: Today,
    //   formData
    // })
    //   .then(result => {
    //     console.log('result:', result);
    //     if (result.status == 200) {
    //       alert(
    //         'Laporan Anda Berhasil Dibuat, Silahkan menunggu info selanjutnya',
    //       );
    //       navigation.replace('Home');
    //     } else {
    //       alert(result.msg);
    //     }
    //   })
    //   .catch(err => {
    //     alert('error', err.msg);
    //     console.log(err.msg)
    //   });
  };

  const options = {
    title: 'Select Image',
    type: 'library',
    options: {
      maxHeight: 200,
      maxWidth: 200,
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    },
  };
  const openGalery = async () => {
    const images = await launchImageLibrary(options);
    setFoto(images.assets[0]);
  };

  return (
    <View style={styles.container}>
      {foto && (
        <View>
          <Image source={{uri: foto.uri}} style={{width: 250, height: 250}} />
        </View>
      )}
      <View style={styles.wrapperInput}>
        <TextInput
          style={styles.input}
          placeholder="Judul Laporan"
          value={jdlLaporan}
          onChangeText={text => setJdlLaporan(text)}
        />
      </View>
      <View style={styles.wrapperInput}>
        <TextInput
          style={styles.input}
          placeholder="Isi Laporan"
          value={isiLaporan}
          onChangeText={text => setIsiLaporan(text)}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={openGalery}>
        <Text style={styles.text}>Upload Photo</Text>
      </TouchableOpacity>
      {nik == '' || jdlLaporan == '' || isiLaporan == '' ? (
        <TouchableOpacity
          disabled
          style={styles.buttonDisable}
          onPress={handlekirimPengaduan}>
          <Text style={styles.text}>Kirim Laporan</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button} onPress={handlekirimPengaduan}>
          <Text style={styles.text}>Kirim Laporan</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.button} onPress={handleBack}>
        <Text style={styles.textButton}>Kembali</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  wrapperInput: {
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: 'grey',
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    padding: 10,
    width: '100%',
  },
  wrapperIcon: {
    position: 'absolute',
    right: 0,
    padding: 10,
  },
  icon: {
    width: 30,
    height: 24,
  },
  button: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange',
    borderRadius: 5,
    marginTop: 25,
  },
  buttonDisable: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'grey',
    borderRadius: 5,
    marginTop: 25,
  },
  text: {
    color: 'white',
    fontWeight: '700',
  },
  textFailed: {
    alignSelf: 'flex-end',
    color: 'red',
  },
});
