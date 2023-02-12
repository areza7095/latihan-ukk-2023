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
