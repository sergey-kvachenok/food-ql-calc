import { RequestError } from '../exceptions/RequestError';

const contentTypes = {
  json: 'application/json',
  text: 'text/html',
};

const storageName = 'foodCalcData'

const stringifyBodyData = (data) => {
  if (!data) {
    return null;
  }
  try {
    return JSON.stringify(data);
  } catch (e) {
    throw new TypeError('Error: incorrect send data format.');
  }
};

const getResponseData = async (response) => {
  const contentType = response.headers.get('content-type');

  if (!contentType || contentType.includes(contentTypes.text)) {
    const responseText = await response.text();

    return { message: responseText };
  }

  if (contentType.includes(contentTypes.json)) {
    return response.json();
  }

  throw new TypeError('Error: incorrect received data format.');
};

const sendRequest = async (url = '', options = {}) => {
  let response;
  const requestHeaders = new Headers({
    'Content-Type': contentTypes.json,
  });

  const authData = JSON.parse(localStorage.getItem(storageName));
  if (authData) {
    requestHeaders.append('Authorization', `Bearer ${authData.token}`);
  }

  const requestOptions = {
    headers: requestHeaders,
    ...options,
  };

  try {
    response = await fetch(url, requestOptions);
  } catch (e) {
    throw new TypeError('Request error');
  }

  const responseData = await getResponseData(response);
  if (!response.ok) {
    // localStorage.removeItem(storageName)

    throw new RequestError(response.status, responseData);
  }

  return responseData;
};

export const sendGetRequest = (url) => {
  const requestUrl = url;
  const requestOptions = {
    method: 'GET',
  };

  return sendRequest(requestUrl, requestOptions);
};

export const sendPostRequest = (url, data) => {
  const requestOptions = {
    method: 'POST',
    body: stringifyBodyData(data),
  };

  return sendRequest(url, requestOptions);
};

export const sendPutRequest = (url, data) => {
  const requestOptions = {
    method: 'PUT',
    body: stringifyBodyData(data),
  };

  return sendRequest(url, requestOptions);
};

export const sendDeleteRequest = (url, data) => {
  const requestOptions = {
    method: 'DELETE',
    body: stringifyBodyData(data),
  };

  return sendRequest(url, requestOptions);
};
