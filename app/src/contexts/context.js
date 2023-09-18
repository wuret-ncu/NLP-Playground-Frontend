import { useState, createContext } from 'react';

export const Context = createContext();
export const ContextProvider = (props) => {
  const [message, setMessage] = useState({});
  const [systemlog, setSystemlog] = useState([
    {
      role: 'system',
      content:
        '你只知道關於「植物」的知識，每次回答使用者前，先判斷該問題是否為「植物」有關係，若是使用者提出與「植物」無關的內容，只回覆「超出範圍」即可，不回覆其他資訊。\n例如當使用者提出「昆蟲通常有幾隻腳?」，因為與「植物」無關，所以回覆「超出範圍」。\n',
    },
  ]);
  const [chatlog, setChatlog] = useState([
    {
      role: 'system',
      content:
        '你只知道關於「植物」的知識，每次回答使用者前，先判斷該問題是否為「植物」有關係，若是使用者提出與「植物」無關的內容，只回覆「超出範圍」即可，不回覆其他資訊。\n例如當使用者提出「昆蟲通常有幾隻腳?」，因為與「植物」無關，所以回覆「超出範圍」。\n',
    },
  ]);
  const [messagelog, setMessagelog] = useState([]);
  const [parameters, setParameters] = useState({
    max_tokens: {
      zh: '回應上限',
      value: 800,
      min: 0,
      max: 16000,
      step: 1,
      tooltip:
        '設定每個模型回應的權杖數目限制。API 支援在提示 (包括系統訊息、範例、訊息歷程記錄和使用者查詢) 和模型回應之間共用最多 16000 個權杖。一個權杖大約為 4 個一般英文文字的字元。',
    },
    temperature: {
      zh: '溫度',
      value: 0.7,
      min: 0,
      max: 1.0,
      step: 0.01,
      tooltip:
        '控制隨機性。降低溫度表示模型會產生更重複以及確定性的回應。增加溫度將導致更多未預期或創意的回應。請嘗試調整溫度或 Top P，但不能同時調整兩者。',
    },
    top_p: {
      zh: '頂端P',
      value: 0.95,
      min: 0,
      max: 1.0,
      step: 0.01,
      tooltip:
        '與溫度類似，此選項可控制隨機性，但是使用其他方法。降低 Top P 會將模型的權杖選取範圍縮小為喜歡的權杖。增加 Top P 可讓模型從高且低可能性的權杖中選擇。請嘗試調整溫度或 Top P，但不能同時調整兩者。',
    },
    past_messages: {
      zh: '包含過去的訊息',
      value: 10,
      min: 1,
      max: 20,
      step: 1,
      tooltip:
        '選取要包含在每個新 API 要求中的過去訊息數目。這有助於為新使用者查詢提供模型內容。將此數字設定為 10 將會包含 5 個使用者查詢和 5 個系統回應。',
    },
    stop_sequences: {
      zh: '停止序列',
      value: [],
      min: 0,
      max: 4,
      tooltip:
        '讓模型在想要的點結束回應。模型回應會在指定的序列之前結束，所以不會包含停止序列文字。針對 ChatGPT，請使用 <|im_end|> 確保模型回應不會產生後續追蹤使用者查詢。您最多可以包含四個停止序列。',
    },
    frequency_penalty: {
      zh: '頻率罰則',
      value: 0.0,
      min: 0,
      max: 2.0,
      step: 0.01,
      tooltip:
        '根據目前文字中出現的頻率，減少按比例重複權杖的機會。這會降低回應中重複完全相同文字的可能性。',
    },
    precense_penalty: {
      zh: '目前狀態罰則',
      value: 0.0,
      min: 0,
      max: 2.0,
      step: 0.01,
      tooltip:
        '減少目前文字中出現的任何權杖重複的機會。這會提高回應中推出新主題的可能性。',
    },
  });

  return (
    <Context.Provider
      value={{
        message,
        setMessage,
        chatlog,
        setChatlog,
        parameters,
        setParameters,
        messagelog,
        setMessagelog,
        systemlog,
        setSystemlog,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
