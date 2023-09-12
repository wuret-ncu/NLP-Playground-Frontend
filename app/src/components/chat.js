/* eslint-disable no-unused-vars */
import { PaperAirplaneIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { TbMessageChatbot } from 'react-icons/tb';
import { AiOutlineClear } from 'react-icons/ai';
import { PiRobot, PiUser } from 'react-icons/pi';
import chatimage2 from '../images/bg-chat2.jpg';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { Context } from '../contexts/context.js';
import { callGPT } from '../api/api.js';
import { pushData } from '../server/api.js';

export default function Chat() {
  const { parameters } = useContext(Context);
  const { chatlog, setChatlog } = useContext(Context);
  const { systemlog } = useContext(Context);
  const { messagelog, setMessagelog } = useContext(Context);
  const [message, setMessage] = useState('');
  const [reset, setReset] = useState(false);

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
      const pushMessage = await pushData(updatedChatlog[updatedChatlog.length-1]);
      console.log(pushMessage);
      const pushGTP = await pushData(response);
      console.log(pushGTP);
      await setMessagelog([...updatedMessagelog, response]);
      await setChatlog([...updatedChatlog, response]);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  // 清空聊天室
  const resetChatRoom = async () => {
    await setMessagelog([]);
    await setChatlog(systemlog);
    console.log(messagelog);
  };

  // ChatLog刪除最後一筆對話紀錄
  const popChatLog = async () => {
    const updateMsg = [...messagelog];
    updateMsg.pop();
    const usermessage = updateMsg.pop()['content'];
    console.log(usermessage);
    console.log(updateMsg);
    const updateChat = [...systemlog, ...updateMsg];
    console.log(updateChat);
    setMessagelog(updateMsg);
    setChatlog(updateChat);
    setMessage(usermessage);
    setReset(true);
  };
  useEffect(() => {
    if (reset == true) {
      updateChatLog(message);
      setReset(false);
    }
  }, [reset]);

  return (
    <div className='grid grid-rows-2-19-4 h-85vh gap-1'>
      <div className='grid grid-flow-col items-center justify-between'>
        <div className='grid grid-flow-col justify-start items-center'>
          <TbMessageChatbot className='h-6 w-6 mx-1' />
          <p className='text-xl'>聊天工作階段</p>
        </div>
        {/* <button className='btn btn-outline mx-1' onClick={resetChatRoom}>
          <AiOutlineClear className='h-5 w-5' />
          清除聊天紀錄
        </button> */}
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
                <div className={message.role === 'assistant' ? 'chat chat-start' : 'chat chat-end'}>
                  <div className='chat-image avatar'>
                    {message.role === 'assistant' ? <PiRobot className='h-6 w-6' /> : <PiUser className='h-6 w-6' />}
                  </div>
                  {/* <div className='chat-header'>
                  {message.role}
                </div> */}
                  <div className='chat-bubble bg-white text-sm items-center'>{message.content}</div>
                </div>
              </li>) : null
          ))}
        </ul>
      </div>
      <div className='form-control w-full mt-2'>
        <label className='label'>
          <span className='label-text'>使用者訊息</span>
        </label>
        <div className='grid grid-cols-9-1 gap-3'>
          <textarea
            placeholder='使用者訊息'
            className='input input-bordered w-full h-20 p-3 text-sm'
            value={message}
            style={{ lineHeight: '1.5' }}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className='grid grid-rows-2 items-center'>
            <PaperAirplaneIcon className='btn btn-ghost btn-xs hover:bg-inherit hover:fill-black' onClick={() => updateChatLog(message)}></PaperAirplaneIcon>
            {/* <ArrowPathIcon className='btn btn-ghost btn-xs hover:bg-inherit hover:stroke-2' onClick={popChatLog}></ArrowPathIcon> */}
          </div>
        </div>
      </div>
    </div>
  );
}
