import { useState, createContext } from 'react';

export const Context = createContext();
export const ContextProvider = (props) => {
  const [message, setMessage] = useState({});
  const [chatlog, setChatlog] = useState([]);
  const [parameters, setParameters] = useState({
    回應上限: { value: 800, min: 0, max: 16000, step: 1 },
    溫度: { value: 0.7, min: 0, max: 1.0, step: 0.01},
    頂端P: { value: 0.95, min: 0, max: 1.0, step: 0.01 },
    包含過去的訊息: { value: 10, min: 1, max: 20, step: 1},
    停止序列: { value: [], min: 0, max: 4 },
    頻率罰則: { value: 0.0, min: 0, max: 2.0, step: 0.01 },
    目前狀態罰則: { value: 0.0, min: 0, max: 2.0, step: 0.01 },
  });


  return (
    <Context.Provider value={{ message, setMessage, chatlog, setChatlog, parameters, setParameters }}>
      {props.children}
    </Context.Provider>
  );
};
