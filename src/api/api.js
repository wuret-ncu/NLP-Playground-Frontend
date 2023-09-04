// api.js
import axios from 'axios';
import {MODEL_ENDPOINT} from '../api/endpoint';

const modelRequest = axios.create({
  baseURL: MODEL_ENDPOINT,
});

// CallGPT
export async function callGPT(ChatLog, parameters) {
  try {
    const target = '/chatGPT';

    const requestBody = ChatLog;
    const params = {
      temperature: parameters.temperature.value,
      max_tokens: parameters.max_tokens.value,
      top_p: parameters.top_p.value,
      purpose: 'none',
    };

    const response = await modelRequest.post(target, requestBody, { params });
    // console.log(response);
    if (response.status === 200) {
      const result = response.data.choices[0].message;
      console.log(result);
      return result;
    } else {
      console.log('request error:', response.status);
      return response.data;
    }
  } catch (error) {
    console.error('An error occurred:', error);
    throw error;
  }
}

// calTokenLength
export async function calTokenLength(ChatLog, parameters) {
  try {
    const target = '/calTokenLength';

    const requestBody = ChatLog;
    const params = {
      temperature: parameters.temperature,
      max_tokens: parameters.max_tokens,
      top_p: parameters.top_p,
      purpose: 'none',
    };

    const response = await modelRequest.post(target, requestBody, { params });

    if (response.status === 200) {
      const result = response.data;
      return result;
    } else {
      console.log('request error:', response.status);
      return response.data;
    }
  } catch (error) {
    console.error('An error occurred:', error);
    throw error;
  }
}

