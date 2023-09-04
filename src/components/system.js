import { useState } from 'react';
import { useContext } from 'react';
import { TbMessagePlus, TbInfoCircle } from 'react-icons/tb';
import { BookmarkSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { MdOutlineAssistant } from 'react-icons/md';
import { Context } from '../contexts/context.js';

export default function System() {
  const { chatlog, setChatlog } = useContext(Context);
  const { messagelog } = useContext(Context);
  const [systemMessage, setSystemMessage] = useState({});
  const [chatMessages, setChatMessages] = useState([]);

  // store chatMessages
  const storeAgentInfo = async () => {
    setChatlog([]);
    const updatedChatlogs = [systemMessage];
    chatMessages.forEach(async (item) => {
      Object.entries(item).forEach(async ([key, value]) => {
        const newMessage = { role: key, content: value };
        updatedChatlogs.push(newMessage);
      });
    });
    console.log(updatedChatlogs);
    await setChatlog([...updatedChatlogs, ...messagelog]);
    console.log(chatlog);
  };

  // add new message
  const handleAddchatMessages = () => {
    setChatMessages([...chatMessages, { user: '', assistant: '' }]);
  };

  // delete message
  const handleDeleteMessage = (index) => {
    const updatedchatMessages = [...chatMessages];
    updatedchatMessages.splice(index, 1);
    setChatMessages(updatedchatMessages);
  };

  // change systemmessage
  const handleSystemMessageChange = (value) => {
    setSystemMessage({ role: 'system', content: value });
    console.log(systemMessage);
  };

  // change usermessage
  const handleUserMessageChange = (index, value) => {
    const updatedchatMessages = [...chatMessages];
    updatedchatMessages[index].user = value;
    setChatMessages(updatedchatMessages);
    console.log(chatMessages);
  };

  // change assistantmessage
  const handleAssistantMessageChange = (index, value) => {
    const updatedchatMessages = [...chatMessages];
    updatedchatMessages[index].assistant = value;
    setChatMessages(updatedchatMessages);
    console.log(chatMessages);
  };

  return (
    <div className="grid grid-rows-2-23 h-85vh gap-1 ">
      <div className="grid grid-flow-col items-center justify-between">
        <div className="grid grid-flow-col justify-start items-center">
          <MdOutlineAssistant className="h-6 w-6 mx-1" />
          <p className="text-xl">小幫手設定</p>
        </div>
        <button
          className="btn btn-outline mx-1"
          onClick={() => storeAgentInfo()}
        >
          <BookmarkSquareIcon className="h-5 w-5 m-0" />
          儲存變更
        </button>
      </div>
      <div className="card form-control border-2 p-4 rounded-lg overflow-visible">
        <div>
          <p className="font-bold">指定聊天應如何進行</p>
          <div className="text-xs">
            在下面開始編寫您自己的系統消息。想要一些提示嗎？
            <a
              className="link link-info"
              href="https://go.microsoft.com/fwlink/?linkid=2235756"
              rel="noreferrer"
              target="_blank"
            >
              深入了解
            </a>
          </div>
        </div>
        <div>
          <label className="label justify-start items-center relative">
            <span className="label-text">系統訊息</span>
            <div className="custom-tooltip-container over">
              <TbInfoCircle className="stroke-slate-400 hover:stroke-sky-600"></TbInfoCircle>
              <span className="custom-tooltip">
                提供模型指示，說明其應如何運作，以及產生回應時應參考的任何內容。您可以描述小幫手的特質、告訴小幫手應該和不應該回答什麼，並告訴它如何格式化回應。此區段沒有權杖限制，但會包含在每一個
                API 呼叫中，因此它計入總權杖限制。
              </span>
            </div>
          </label>
        </div>
        <textarea
          className="textarea textarea-bordered h-24 mb-3"
          placeholder="系統訊息"
          onChange={(e) => handleSystemMessageChange(e.target.value)}
        ></textarea>
        <p className="font-bold">範例</p>
        <div className="text-xs">
          添加範例以向 ChatGPT
          顯示您想要的回應。它將嘗試模仿您在此處添加的任何回應，
          <br />
          因此請確保它們符合您在系統訊息中列出的規則。
        </div>
        <div className="overflow-auto mb-1">
          {chatMessages.map((message, index) => (
            <div className="form-control mt-2" key={index}>
              <div>
                <div className="grid grid-flow-col items-center justify-between">
                  <label className="label">
                    <span className="label-text">使用者</span>
                  </label>
                  <TrashIcon
                    className="btn btn-ghost btn-xs hover:fill-black hover:stroke-white"
                    onClick={() => handleDeleteMessage(index)}
                  />
                </div>
                <textarea
                  className="textarea textarea-bordered h-16 w-full"
                  placeholder="使用者訊息"
                  value={message.user}
                  onChange={(e) =>
                    handleUserMessageChange(index, e.target.value)
                  }
                ></textarea>
                <label className="label">
                  <span className="label-text">助理</span>
                </label>
                <textarea
                  className="textarea textarea-bordered h-16 w-full"
                  placeholder="助理訊息"
                  value={message.assistant}
                  onChange={(e) =>
                    handleAssistantMessageChange(index, e.target.value)
                  }
                ></textarea>
              </div>
            </div>
          ))}
        </div>
        <button
          className="btn btn-outline mt-3"
          onClick={() => handleAddchatMessages()}
        >
          <TbMessagePlus className="h-4 w-4" />
          新增範例
        </button>
      </div>
    </div>
  );
}
