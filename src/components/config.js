import { TbAdjustmentsHeart } from 'react-icons/tb';
import { Context } from '../contexts/context.js';
import { useContext, useState } from 'react';
import { TbInfoCircle } from 'react-icons/tb';

function Config() {
  const { parameters, setParameters } = useContext(Context);
  const [tempInput, setTempInput] = useState('');
  const [stopSequences, setStopSequences] = useState({});

  // 處理參數值的變更
  const handleParameterChange = async (param, key, newValue) => {
    console.log(newValue);
    // 確認新值是否是有效的數字，以及是否在設定的範圍內
    if (
      !isNaN(newValue) &&
      newValue >= parameters[param].min &&
      newValue <= parameters[param].max
    ) {
      // 使用 setParameters 更新參數狀態
      await setParameters((prevParameters) => ({
        ...prevParameters,
        [param]: {
          ...prevParameters[param],
          [key]: newValue,
        },
      }));
    }
    console.log(parameters);
  };
  const handleTempInput = (param, value) => {
    setTempInput(value);
  };

  const handleAddStopSequence = (param) => {
    if (tempInput.trim() !== '') {
      setStopSequences((prevSequences) => ({
        ...prevSequences,
        [param]: [...(prevSequences[param] || []), tempInput],
      }));
      setTempInput('');
    }
  };

  const handleRemoveStopSequence = (param, index) => {
    setStopSequences((prevSequences) => ({
      ...prevSequences,
      [param]: prevSequences[param].filter((_, i) => i !== index),
    }));
  };

  return (
    <div>
      <div className="grid grid-rows-2-23 h-85vh gap-5">
        <div className="grid grid-flow-col items-center">
          <div className="grid grid-flow-col justify-start items-center">
            {/* 圖標 */}
            <TbAdjustmentsHeart className="h-6 w-6 mx-1" />
            {/* 標題 */}
            <p className="text-xl">參數配置</p>
          </div>
        </div>
        <div className="grid grid-flow-row gap-5 auto-rows-min mx-1">
          {/* 遍歷參數，創建滑動條和輸入框 */}
          {Object.entries(parameters).map(
              ([param, { value, min, max, step }]) =>
              param !== '停止序列' ? (
                <div key={param}>
                  <div className="grid grid-flow-col items-center justify-between">
                    <div>
                      <div className="grid grid-flow-col justify-start items-center relative">
                        {/* 參數名稱 */}
                        {param}
                        <div className="custom-tooltip-container over ">
                          <TbInfoCircle className="stroke-slate-400 hover:stroke-sky-600"></TbInfoCircle>
                          <span className="custom-tooltip overflow mb-1">
                            提供模型指示，說明其應如何運作，以及產生回應時應參考的任何內容。您可以描述小幫手的特質、告訴小幫手應該和不應該回答什麼，並告訴它如何格式化回應。此區段沒有權杖限制，但會包含在每一個
                            API 呼叫中，因此它計入總權杖限制。
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* 輸入框 */}
                    <input
                      type="text"
                      placeholder="輸入數值"
                      value={isNaN(value) ? '' : value}
                      onChange={(e) =>
                        handleParameterChange(param, 'value', e.target.value)
                      }
                      className="input input-bordered w-14 h-7 text-sm px-1"
                    />
                  </div>
                  {/* 滑動條 */}
                  <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={(e) =>
                      handleParameterChange(
                          param,
                          'value',
                          parseFloat(e.target.value),
                      )
                    }
                    className="range range-xs"
                  />
                </div>
              ) : (
                <div key={param}>
                  <div className="grid grid-flow-col justify-between items-center mb-1">
                    {/* 參數名稱 */}
                    {param}
                  </div>
                  <div className= "w-64 h-auto border-2 rounded-lg flex flex-wrap items-center p-1">
                    {stopSequences[param]?.map((sequence, index) => (
                      <div key={index} className="m-1 grid grid-flow-col items-center">
                        <button
                          onClick={() =>
                            handleRemoveStopSequence(param, index)
                          }
                          className="btn btn-xs"
                        >
                          <div>{sequence}</div>
                          <span className="text-lg">×</span>
                        </button>
                      </div>
                    ))}
                    <input
                      type="text"
                      placeholder="輸入停止序列"
                      onChange={(e) => handleTempInput(param, e.target.value)}
                      value={tempInput}
                      className="input px-2 border-white"
                      style={{
                        fontSize: '14px',
                        outline: 'none',
                      }}
                    />
                    <button
                      onClick={() => handleAddStopSequence(param)}
                      className="btn btn-outline btn-sm ml-auto mr-2"
                    >
                      新增
                    </button>
                  </div>
                </div>
              ),
          )}
          {/* 目前 tokens 計數 */}
          <div className="grid mt-10">
            目前 tokens 計數
            <progress
              className="progress h-3 mb-1"
              value="40"
              max="100"
            ></progress>
            <p>125 / 4000</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Config;
