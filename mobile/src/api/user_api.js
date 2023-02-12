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
    return error;
  }
};

export const user_login = async data => {
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
    return error;
  }
};
