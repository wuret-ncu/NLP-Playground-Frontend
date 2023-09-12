import axios from 'axios';

const modelRequest = axios.create({
  baseURL: 'http://localhost:56000/',
});

export async function pushData(ChatLog) {
  try {
    const target = '/UpdateChatlog';
    const response = await modelRequest.post(target, {ChatLog});
    if (response.status === 200) {
      return response;
    } else {
      console.log('request error:', response.status);
      return response.data;
    }
  } catch (error) {
    console.error('An error occurred:', error);
    throw error;
  }
}
