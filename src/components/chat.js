import { PaperAirplaneIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { TbMessageChatbot } from 'react-icons/tb';
import { AiOutlineClear } from 'react-icons/ai';
import chatimage2 from '../images/bg-chat2.jpg';
import { useState } from 'react';

function Chat() {
  const ChatLog = [
    {
      role: 'assistant',
      name: 'ChatAI',
      roleType: 'chat chat-start',
      contentTime: new Date().getHours() + ':' + new Date().getMinutes(),
      content: 'You were the Chosen One!',
    }];

  const [message, setMessage] = useState();
  const [chatLogMsg, setChatLog] = useState(ChatLog);

  // 更新ChatLog
  const updateChatLog = (message) => {
    const role = 'user';
    const name = 'User';
    const roleType = 'chat chat-end';
    const insertTime = new Date().getHours() + ':' + new Date().getMinutes();
    const content = message;
    const newMessage = {
      role,
      name,
      roleType,
      insertTime,
      content,
    };
    setChatLog([...chatLogMsg, newMessage]);
    setMessage('');
  };

  // 把ChatLog回復到初始狀態
  const resetChatLog = (Agent) => {
    setChatLog(Agent);
  };

  // 清空聊天室
  const resetChatRoom = () => {
    setChatLog([]);
    resetChatLog(ChatLog);
  };

  // ChatLog刪除最後一筆對話紀錄
  const popChatLog = () => {
    const updateMsg = [...chatLogMsg];
    updateMsg.pop();
    setChatLog(updateMsg);
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
          {chatLogMsg.map((item) => (
            <div className={item.roleType}>
              <div className='chat-image avatar'>
              </div>
              <div className='chat-header'>
                {item.name}
                <time className='text-xs opacity-50'> {item.insertTime}</time>
              </div>
              <div className='chat-bubble bg-white'>{item.content}</div>
              <div className='chat-footer opacity-50'>Delivered</div>
            </div>
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
            onChange={(event) => setMessage(event.target.value)}
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

export default Chat;
