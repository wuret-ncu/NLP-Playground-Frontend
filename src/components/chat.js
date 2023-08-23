/* eslint-disable max-len */
import {PaperAirplaneIcon, ArrowPathIcon} from '@heroicons/react/24/outline';
import {TbMessageChatbot} from 'react-icons/tb';
import {AiOutlineClear} from 'react-icons/ai';
import chatimage2 from '../images/bg-chat2.jpg';

function Chat() {
  return (
    <div className="grid grid-rows-2-20-3 h-85vh gap-1">
      <div className="grid grid-flow-col items-center justify-between">
        <div className="grid grid-flow-col justify-start items-center">
          <TbMessageChatbot className="h-6 w-6 mx-1" />
          <p className="text-xl">聊天工作階段</p>
        </div>
        <button className="btn btn-outline mx-1">
          <AiOutlineClear className="h-5 w-5" />
          清除聊天紀錄
        </button>
      </div>
      <div
        className="card form-control overflow-auto border-2 p-4 rounded-lg"
        style={{
          backgroundImage: `url(${chatimage2})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        <div className="chat chat-start">
          <div className="chat-image avatar">
            {/* <div className="w-10 rounded-full">
            <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
          </div> */}
          </div>
          <div className="chat-header">
            Obi-Wan Kenobi
            <time className="text-xs opacity-50"> 12:45</time>
          </div>
          <div className="chat-bubble bg-white">You were the Chosen One!</div>
          <div className="chat-footer opacity-50">Delivered</div>
        </div>
        <div className="chat chat-end">
          <div className="chat-image avatar">
            {/* <div className="w-10 rounded-full">
            <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
          </div> */}
          </div>
          <div className="chat-header">
            Anakin
            <time className="text-xs opacity-50"> 12:46</time>
          </div>
          <div className="chat-bubble bg-white">I hate you!</div>
          <div className="chat-footer opacity-50">Seen at 12:46</div>
        </div>
      </div>
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">使用者訊息</span>
        </label>
        <div className="grid grid-cols-9-1 gap-3">
          <input
            type="text"
            placeholder="使用者訊息"
            className="input input-bordered w-full h-14"
          />
          <div className="grid grid-rows-2">
            <PaperAirplaneIcon className="btn btn-ghost btn-xs hover:fill-black hover:stroke-white"></PaperAirplaneIcon>
            <ArrowPathIcon className="btn btn-ghost btn-xs  hover:stroke-white"></ArrowPathIcon>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
