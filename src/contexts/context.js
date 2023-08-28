import { useState, createContext } from 'react';
export const Context = createContext();
export const ContextProvider = (props) => {
  const [message, setMessage] = useState({});
  const [chatlog, setChatlog] = useState([]);
  return (
    <Context.Provider value={{ message, setMessage, chatlog, setChatlog }}>
      {props.children}
    </Context.Provider>
  );
};
