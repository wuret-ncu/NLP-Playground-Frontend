import { useState } from 'react';

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
    <div>
      <div className="form-control">
        <button className="btn btn-outline">儲存變更</button>
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
          新增範例
        </button>
      </div>
    </div>
  );
}

export default System;
