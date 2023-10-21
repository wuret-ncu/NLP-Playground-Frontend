import { useState } from 'react';
import { useContext } from 'react';
import { TbMessagePlus, TbInfoCircle } from 'react-icons/tb';
import { BookmarkSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { MdOutlineAssistant } from 'react-icons/md';
import { Context } from '../contexts/context.js';

export default function System() {
  const { chatlog, setChatlog } = useContext(Context);
  const { messagelog } = useContext(Context);
  const { setSystemlog } = useContext(Context);
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
    await setSystemlog(updatedChatlogs);
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

  // TRIPO Model
  const saveModalContent = () => {
    const inputIds = ['role', 'task', 'parameters', 'output', 'iteration'];

    if (inputIds.every((id) => document.querySelector(`#${id}`).value.trim() === '')) {
      document.getElementById('my_modal_1').close();
    }

    const combinedContent = inputIds.map((id) => document.querySelector(`#${id}`).value).filter((value) => value.trim() !== '').join('，');

    document.querySelector('#systemmessage').value = combinedContent;

    inputIds.forEach((id) => (document.querySelector(`#${id}`).value = ''));

    document.getElementById('my_modal_1').close();
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
          <p className="font-bold">指定對話應如何進行</p>
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
        <div className='flex justify-between mt-2'>
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
          <button className="btn btn-sm" onClick={()=>document.getElementById('my_modal_1').showModal()}>Prompt 框架</button>
          <dialog id="my_modal_1" className="modal">
            <div className="modal-box w-4/12 max-w-3xl p-9 grid justify-items-center">
              <div className='grid justify-items-center'>
                <div className="font-semibold text-2xl flex mb-3">TRIPO Model</div>
              </div>
              <div className="form-control w-full max-w-sm">
                <label className="label justify-start items-center relative">
                  <span className="label-text font-medium me-2">Task 任務</span>
                  <div className="custom-tooltip-container over">
                    <TbInfoCircle className="stroke-slate-400 hover:stroke-sky-600"></TbInfoCircle>
                    <span className="custom-tooltip">
                      具體說明Prompt的情境與脈絡。
                      <br/>例如 : 幫我設計一份rubrics以讓學生展現他們對人體骨骼的理解，包含合作、上台發表、問題解決及概念理解這四方面。
                    </span>
                  </div>
                </label>
                {/* <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-sm"
                /> */}
                <textarea id="task" placeholder="Task" className="textarea textarea-bordered textarea-xs w-full max-w-sm"></textarea>
              </div>
              <div className="form-control w-full max-w-sm">
                <label className="label justify-start items-center relative">
                  <span className="label-text font-medium me-2">Role 角色</span>
                  <div className="custom-tooltip-container over">
                    <TbInfoCircle className="stroke-slate-400 hover:stroke-sky-600"></TbInfoCircle>
                    <span className="custom-tooltip">
                      ChatGPT所扮演的角色。
                      <br/>例如 : 老師、律師或Linux kernel等。
                    </span>
                  </div>
                </label>
                {/* <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-sm"
                /> */}
                <textarea id="role" placeholder="Role" className="textarea textarea-bordered textarea-xs w-full max-w-sm"></textarea>
              </div>
              <div className="form-control w-full max-w-sm">
                <label className="label justify-start items-center relative">
                  <span className="label-text font-medium me-2">Iteration 迭代</span>
                  <div className="custom-tooltip-container over">
                    <TbInfoCircle className="stroke-slate-400 hover:stroke-sky-600"></TbInfoCircle>
                    <span className="custom-tooltip">
                      ChatGPT是對話式的AI，可以透過追問與選擇會產出更好的答案。
                      <br/>Iteration是指Chain of Thoughts的對話方式，逐步提供ChatGPT更多的資訊告訴他你喜歡甚麼不喜歡甚麼，
                      或是換個方式說明等，透過不斷迭代的方式得到更好的答案。
                    </span>
                  </div>
                </label>
                {/* <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-sm"
                /> */}
                <textarea id="iteration" placeholder="Iteration" className="textarea textarea-bordered textarea-xs w-full max-w-sm"></textarea>
              </div>
              <div className="form-control w-full max-w-sm">
                <label className="label justify-start items-center relative">
                  <span className="label-text font-medium me-2">Parameters 參數</span>
                  <div className="custom-tooltip-container over">
                    <TbInfoCircle className="stroke-slate-400 hover:stroke-sky-600"></TbInfoCircle>
                    <span className="custom-tooltip">
                      詳細及明確的參數可以讓ChatGPT生成更好的答案，參數是指你希望ChatGPT用甚麼模型或理論生成答案。
                      <br/>例如 : 根據5es model生成教案等。
                    </span>
                  </div>
                </label>
                {/* <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-sm"
                /> */}
                <textarea id="parameters" placeholder="Parameters" className="textarea textarea-bordered textarea-xs w-full max-w-sm"></textarea>
              </div>
              <div className="form-control w-full max-w-sm">
                <label className="label justify-start items-center relative">
                  <span className="label-text font-medium me-2">Output 輸出</span>
                  <div className="custom-tooltip-container over">
                    <TbInfoCircle className="stroke-slate-400 hover:stroke-sky-600"></TbInfoCircle>
                    <span className="custom-tooltip">
                      明確表達輸出的目標、對象及格式。
                      <br/>例如 : 對象是5年級學生，並請以表格呈現，第一欄是英文單字，第二欄是英文單字的中文解釋，第三欄是該英文單字的例句。
                    </span>
                  </div>
                </label>
                {/* <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-sm"
                /> */}
                <textarea id="output" placeholder="Output" className="textarea textarea-bordered textarea-xs w-full max-w-sm"></textarea>
              </div>
              <div className='grid justify-items-center w-full max-w-sm'>
                <button className=" items-center btn bg-blue-500 text-white mt-8 w-full max-w-sm" onClick={() => saveModalContent()}>儲存</button>
              </div>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
        </div>
        <textarea
          id="systemmessage"
          className="textarea textarea-bordered h-24 mb-3 px-2"
          placeholder="系統訊息"
          onChange={(e) => handleSystemMessageChange(e.target.value)}
          style={{ lineHeight: '1.5' }}
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
                  className="textarea textarea-bordered h-16 w-full px-2"
                  placeholder="使用者訊息"
                  value={message.user}
                  style={{ lineHeight: '1.5' }}
                  onChange={(e) =>
                    handleUserMessageChange(index, e.target.value)
                  }
                ></textarea>
                <label className="label">
                  <span className="label-text">助理</span>
                </label>
                <textarea
                  className="textarea textarea-bordered h-16 w-full px-2"
                  placeholder="助理訊息"
                  value={message.assistant}
                  style={{ lineHeight: '1.5' }}
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
