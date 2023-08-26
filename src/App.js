import { ContextProvider } from './contexts/context.js';
import System from './components/system.js';
import Chat from './components/chat.js';
import Config from './components/config.js';
import chatimage from './images/bg-chat.jpg';

function App() {
  return (
    <ContextProvider>
      <div
        className='grid grid-rows-2-23 h-screen px-5'
        style={{
          backgroundImage: `url(${chatimage})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        <div className='navbar'>
          <p className='btn glass normal-case text-xl btn-disabled'>
            ChatGPTPlayGround
          </p>
        </div>
        <div className='grid grid-cols-5 gap-x-5 mb-5'>
          <div className='grid col-span-2 p-4 border-solid border-2 rounded-lg bg-white'>
            <System />
          </div>
          <div className='grid col-span-2 p-4 border-solid border-2 rounded-lg bg-white'>
            <Chat />
          </div>
          <div className='grid col-span-1 p-4 border-solid border-2 rounded-lg bg-white'>
            <Config />
          </div>
        </div>
      </div>
    </ContextProvider>
  );
}

export default App;
