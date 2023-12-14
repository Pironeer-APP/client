import { Platform } from "react-native";
import { _ANDROID_AVD_API_HOST, _IOS_API_HOST } from "../variables";
import { getData } from "./asyncStorage";

export const getAPIHost = () => {
  if(Platform.OS === 'ios') {
      return _IOS_API_HOST;
  }
  else if(Platform.OS === 'android') {
      return _ANDROID_AVD_API_HOST;
  }
  else {
      throw "Platform not supported";
  }
}

export async function client(endpoint, { body, ...customConfig } = {}) {
  const SERVER_URL = getAPIHost();
  const headers = { 'Content-Type': 'application/json' };

  const config = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  }

  if (body) {
    if(!Object.keys(body).includes("userToken")) {
      body.userToken = await getData('user_token');
    }
    config.body = JSON.stringify(body);
  }

  let data;
  try {
    const response = await fetch(SERVER_URL+endpoint, config);
    if (response.ok) {
      data = await response.json();
      return data;
    }
    throw new Error(response.statusText);
  } catch (err) {
    return Promise.reject(err.message ? err.message : data);
  }
}

client.get = function (endpoint, customConfig = {}) {
  return client(endpoint, { ...customConfig, method: 'GET' });
}

client.post = function (endpoint, body, customConfig = {}) {
  return client(endpoint, { ...customConfig, body });
}