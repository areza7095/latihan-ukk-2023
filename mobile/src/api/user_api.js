import ApiManager from './ApiManager';

export const masyarakat_login = async data => {
  try {
    const result = await ApiManager('/masyarakat/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      data: data,
    });
    return result;
  } catch (error) {
    return JSON.parse(error.request._response);
  }
};

export const masyarakat_register = async data => {
  try {
    const result = await ApiManager('/masyarakat/register', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      data: data,
    });
    return result;
  } catch (error) {
    return JSON.parse(error.request._response);
  }
};

export const lihat_pengaduan = async (data, accessToken) => {
  if(data.nik != ""){
    // console.log(data)
    try {
      const result = await ApiManager('/masyarakat/allpengaduanabynik', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-auth-token': `${accessToken}`
        },
        data: data,
      });
      return result;
    } catch (error) {
      return JSON.parse(error.request._response);
    }
    

  }

  
};

// export const kirim_pengaduan = async (data, accessToken) => {
//   try {
//     const result = await ApiManager('/masyarakat/pengaduan', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'multipart/form-data',
//         'x-auth-token': `${accessToken}`
//       },
//       data: data,

//     });
//     return result;
//   } catch (error) {
//     return JSON.parse(error.request._response);
//     // console.log('error API : ', error.request._response);
//   }
// };

export const hapus_pengaduan = async (data, accessToken) => {
  try {
    const result = await ApiManager('/masyarakat/hapuspengaduan', {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'x-auth-token': `${accessToken}`
      },
      data: data,
    });
    return result;
  } catch (error) {
    return JSON.parse(error.request._response);
  }
};
