import { useState } from 'react';
import { TbMessagePlus } from 'react-icons/tb';
import { BookmarkSquareIcon } from '@heroicons/react/24/outline';
import { MdOutlineAssistant } from 'react-icons/md';

function System() {
  const [messages, setMessages] = useState([]);

  const handleAddMessages = () => {
    setMessages([...messages, { userMessage: '', assistantMessage: '' }]);
  };

  const handleUserMessageChange = (index, value) => {
    const updatedMessages = [...messages];
    updatedMessages[index].userMessage = value;
    setMessages(updatedMessages);
  };

  const handleAssistantMessageChange = (index, value) => {
    const updatedMessages = [...messages];
    updatedMessages[index].assistantMessage = value;
    setMessages(updatedMessages);
  };
  return (
    <div className="grid grid-rows-2-23 h-85vh gap-1">
      <div className="grid grid-flow-col items-center justify-between">
        <div className="grid grid-flow-col justify-start items-center">
          <MdOutlineAssistant className="h-6 w-6 mx-1" />
          <p className="text-xl">小幫手設定</p>
        </div>
        <button className="btn btn-outline mx-1">
          <BookmarkSquareIcon className="h-5 w-5 m-0" />
          儲存變更
        </button>
      </div>
      <div className="card form-control overflow-auto border-2 p-4 rounded-lg">
        <label className="label">
          <span className="label-text">系統訊息</span>
        </label>
        <textarea
          className="textarea textarea-bordered h-24"
          placeholder="系統訊息"
        ></textarea>
        {messages.map((message, index) => (
          <div className="form-control">
            <div key={index}>
              <label className="label">
                <span className="label-text">使用者</span>
              </label>
              <textarea
                className="textarea textarea-bordered h-20 w-full"
                placeholder="使用者訊息"
                value={message.userMessage}
                onChange={(e) => handleUserMessageChange(index, e.target.value)}
              ></textarea>

              <label className="label">
                <span className="label-text">助理</span>
              </label>
              <textarea
                className="textarea textarea-bordered h-20 w-full"
                placeholder="助理訊息"
                value={message.assistantMessage}
                onChange={(e) =>
                  handleAssistantMessageChange(index, e.target.value)
                }
              ></textarea>
            </div>
          </div>
        ))}
        <button className="btn btn-outline mt-3" onClick={handleAddMessages}>
          <TbMessagePlus className="h-4 w-4" />
          新增範例
        </button>
      </div>
    </div>
  );
}

export default System;
