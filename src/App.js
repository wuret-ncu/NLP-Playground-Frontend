// import { Component } from 'react';
import System from './components/system'
import Chat from './components/chat.js';

function App() {
  return (
    <div class="grid grid-rows-1-9 h-screen mx-5">
      <div className="navbar">
        <p className="btn btn-ghost normal-case text-xl">ChatGPTPlayGround</p>
      </div>
      <div className="grid grid-cols-5 gap-x-5 mb-5">
        <div className="grid card col-span-2 p-4 border-solid border-2 overflow-auto">
         <System/>
        </div>
        <div className="grid card col-span-2 p-4 border-solid border-2">
          <Chat />
        </div>
        <div className="grid card col-span-1 p-4 border-solid border-2">
          <Chat />
        </div>
      </div>
    </div>
  );
}

export default App;
