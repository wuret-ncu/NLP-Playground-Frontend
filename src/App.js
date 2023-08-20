// import { Component } from 'react';
import System from './components/system.js'
import Chat from './components/chat.js';
import Config from './components/config.js';

import chatimage2 from './bg-chat.jpg'

function App() {
  return (
    <div class="grid grid-rows-2-23 h-screen px-5" style={{
      backgroundImage: `url(${chatimage2})`,
      backgroundPosition: `center`,
      backgroundSize: `cover`,
    }}>
      <div className="navbar">
        <p className="btn glass normal-case text-xl btn-disabled">ChatGPTPlayGround</p>
      </div>
      <div className="grid grid-cols-5 gap-x-5 mb-5">
        <div className="grid col-span-2 p-4 border-solid border-2 rounded-lg bg-white">
         <System/>
        </div>
        <div className="grid col-span-2 p-4 border-solid border-2 rounded-lg bg-white">
          <Chat />
        </div>
        <div className="grid col-span-1 p-4 border-solid border-2 rounded-lg bg-white">
          <Config />
        </div>
      </div>
    </div>
  );
}

export default App;
