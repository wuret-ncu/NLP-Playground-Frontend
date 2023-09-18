import { ContextProvider } from './contexts/context.js';
// import System from './components/system.js';
import Chat from './components/chat.js';
// import Config from './components/config.js';
import chatimage from './images/bg-chat.jpg';
import './App.css';

function App() {
  return (
    <ContextProvider>
      <div
        className="grid grid-rows-2-23 h-screen px-5"
        style={{
          backgroundImage: `url(${chatimage})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        <div className="navbar">
          <p className="btn glass text-xl btn-disabled">GPTChatRoom</p>
        </div>
        <div className="grid grid-cols-5 gap-x-5 mb-5 justify-center">
          {/* <div className='grid col-span-2 p-4 border-solid border-2 rounded-lg bg-white'>
            <System />
          </div> */}
          <div className="grid col-span-2 rounded-lg justify-center bg glass">
            <p
              className="text-xl font-bold font-sans p-10 bg-white h-fit rounded-t-lg"
              style={{ lineHeight: '2' }}
            >
              嗨，歡迎來到 <span style={{ color: 'deepskyblue' }}>GPTChatRoom</span>
              ！這裡是一個特別為學生設計的聊天室，你可以跟我們的聊天機器人互動。如果你有任何有關
              <span style={{ color: 'limegreen'}}>「植物」</span>
              的問題，別害羞，就在右邊的聊天室輸入吧！我們會很高興為你提供有趣又有用的答案。不論是關於植物的構造、功能，或者是它們的生長過程，只要你有疑問，都歡迎隨時問我們。
            </p>
          </div>
          <div className="grid col-span-3 p-4 border-solid border-2 rounded-lg bg-white">
            <Chat />
          </div>
          {/* <div className='grid col-span-1 p-4 border-solid border-2 rounded-lg bg-white'>
            <Config />
          </div> */}
        </div>
      </div>
    </ContextProvider>
  );
}

export default App;
