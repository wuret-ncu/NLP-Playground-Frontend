import { PaperAirplaneIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { TbMessageChatbot } from 'react-icons/tb';
import { AiOutlineClear } from 'react-icons/ai';
import chatimage2 from '../images/bg-chat2.jpg';
import { useState } from 'react';
import { useContext } from 'react';
import { Context } from '../contexts/context.js';
import { callGPT } from '../api/api.js';

export default function Chat() {
  const { parameters } = useContext(Context);
  const { chatlog, setChatlog } = useContext(Context);
  const {messagelog, setMessagelog} = useContext(Context);
  const [message, setMessage] = useState('');

  // 更新ChatLog
  const updateChatLogUser = async (message) => {
    const updatedChatlog = [...chatlog, { role: 'user', content: message }];
    const updatedMessagelog = [...messagelog, { role: 'user', content: message }];
    await setMessagelog(updatedMessagelog);
    await setChatlog(updatedChatlog);
    console.log(messagelog);
    return [updatedChatlog, updatedMessagelog];
  };

  const updateChatLog = async (message) => {
    try {
      const [updatedChatlog, updatedMessagelog] = await updateChatLogUser(message);
      setMessage('');
      console.log(updatedChatlog, updatedMessagelog);
      const response = await callGPT(updatedChatlog, parameters);
      console.log(response);
      await setMessagelog([...updatedMessagelog, response]);
      await setChatlog([...updatedChatlog, response]);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  // 清空聊天室
  const resetChatRoom = async () => {
    await setMessagelog([]);
    console.log(messagelog);
  };

  // ChatLog刪除最後一筆對話紀錄
  const popChatLog = async () => {
    const updateMsg = [...messagelog];
    const updateChat = [...chatlog];
    updateMsg.pop();
    await setMessagelog(updateMsg);
    await setChatlog(updateChat);
    console.log(messagelog);
  };


  return (
    <div className='grid grid-rows-2-20-3 h-85vh gap-1'>
      <div className='grid grid-flow-col items-center justify-between'>
        <div className='grid grid-flow-col justify-start items-center'>
          <TbMessageChatbot className='h-6 w-6 mx-1' />
          <p className='text-xl'>聊天工作階段</p>
        </div>
        <button className='btn btn-outline mx-1' onClick={resetChatRoom}>
          <AiOutlineClear className='h-5 w-5' />
          清除聊天紀錄
        </button>
      </div>
      <div
        className='card form-control overflow-auto border-2 p-4 rounded-lg'
        style={{
          backgroundImage: `url(${chatimage2})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        <ul>
          {messagelog.map((message, index) => (
            message.role !== 'system' ? (
            <li key={index}>
              <div className={ message.role === 'assistant' ? 'chat chat-start' : 'chat chat-end'}>
                <div className='chat-image avatar'>
                </div>
                <div className='chat-header'>
                  {message.role}
                </div>
                <div className='chat-bubble bg-white'>{message.content}</div>
              </div>
            </li>):null
          ))}
        </ul>
      </div>
      <div className='form-control w-full'>
        <label className='label'>
          <span className='label-text'>使用者訊息</span>
        </label>
        <div className='grid grid-cols-9-1 gap-3'>
          <input
            type='text'
            placeholder='使用者訊息'
            className='input input-bordered w-full h-14'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className='grid grid-rows-2'>
            <PaperAirplaneIcon className='btn btn-ghost btn-xs hover:bg-inherit hover:fill-black' onClick={() => updateChatLog(message)}></PaperAirplaneIcon>
            <ArrowPathIcon className='btn btn-ghost btn-xs hover:bg-inherit hover:stroke-2' onClick={popChatLog}></ArrowPathIcon>
          </div>
        </div>
      </div>
    </div>
  );
}
