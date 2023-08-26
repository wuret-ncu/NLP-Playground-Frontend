import { useState, createContext } from 'react';

export const Context = createContext();
export const ContextProvider = (props) => {
  const [message, setMessage] = useState([]);
  const [chatlog, setChatlog] = useState([]);
  const [parameters, setParameters] = useState({
    回應上限: { value: 0, min: 0, max: 16000 },
    溫度: { value: 0.0, min: 0, max: 1.0 },
    頂端P: { value: 0.0, min: 0, max: 1.0 },
    頻率罰則: { value: 0.0, min: 0, max: 2.0 },
    目前狀態罰則: { value: 0.0, min: 0, max: 2.0 },
    停止序列: { value: '', min: 0, max: 100 },
  });


  return (
    <Context.Provider value={{ message, setMessage, chatlog, setChatlog, parameters, setParameters }}>
      {props.children}
    </Context.Provider>
  );
};
