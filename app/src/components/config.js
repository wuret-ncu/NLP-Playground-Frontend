import { Context } from '../contexts/context.js';
import { useContext, useState, useEffect } from 'react';
import { TbAdjustmentsHeart, TbInfoCircle, TbX } from 'react-icons/tb';

// feature/config.js
function Config() {
  const { parameters, setParameters } = useContext(Context);
  const [tempInput, setTempInput] = useState('');
  const [stopSequences, setStopSequences] = useState({ stop_sequences: []});

  // 處理參數值的變更
  const handleParameterChange = (param, key, newValue) => {
    console.log(newValue);
    // 確認新值是否是有效的數字，以及是否在設定的範圍內
    if (param !== 'stop_sequences') {
      if (!isNaN(newValue) && newValue >= parameters[param].min && newValue <= parameters[param].max) {
        // 使用 setParameters 更新参数状态
        setParameters((prevParameters) => ({
          ...prevParameters,
          [param]: {
            ...prevParameters[param],
            [key]: newValue,
          },
        }));
      }
    } else {
      if (newValue.length >= parameters[param].min && newValue.length <= parameters[param].max) {
      // 使用 setParameters 更新参数状态
        console.log(newValue.length);
        setParameters((prevParameters) => ({
          ...prevParameters,
          [param]: {
            ...prevParameters[param],
            [key]: newValue,
          },
        }));
      }
    }
  };
  const handleTempInput = (param, value) => {
    if (stopSequences[param].length<4) {
      setTempInput(value);
    }
  };

  useEffect(() => {
    if (stopSequences['stop_sequences']) {
      handleParameterChange('stop_sequences', 'value', stopSequences['stop_sequences']);
    }
  }, [stopSequences]);

  const handleAddStopSequence = (param, value) => {
    if (stopSequences[param].length < 4) {
      if (tempInput.trim() !== '') {
        setStopSequences((prevSequences) => ({
          ...prevSequences,
          [param]: [...(prevSequences[param] || []), tempInput],
        }));
        setTempInput('');
        // 这里使用 stopSequences[param] 来确保更新后的值传递给 handleParameterChange
        // handleParameterChange(param, value, stopSequences[param]);
      }
    }
  };

  const handleRemoveStopSequence = (param, index, value) => {
    setStopSequences((prevSequences) => ({
      ...prevSequences,
      [param]: prevSequences[param].filter((_, i) => i !== index),
    }));
    handleParameterChange(param, value, stopSequences[param]);
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
              ([param, { zh, value, min, max, step, tooltip }]) =>
              param !== 'stop_sequences' ? (
                <div key={param}>
                  <div className="grid grid-flow-col items-center justify-between">
                    <div>
                      <div className="grid grid-flow-col justify-start items-center relative">
                        {/* 參數名稱 */}
                        <div className='label-text'>{zh}</div>
                        <div className="custom-tooltip-container over ">
                          <TbInfoCircle className="stroke-slate-400 hover:stroke-sky-600"></TbInfoCircle>
                          <span className="custom-tooltip overflow mb-1">
                            {tooltip}
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
                    <div className="grid grid-flow-col justify-start items-center relative">
                      {/* 參數名稱 */}
                      <div className='label-text'>{zh}</div>
                      <div className="custom-tooltip-container over ">
                        <TbInfoCircle className="stroke-slate-400 hover:stroke-sky-600"></TbInfoCircle>
                        <span className="custom-tooltip overflow mb-1">
                          {tooltip}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="w-auto h-auto border-2 rounded-md flex flex-wrap items-center p-1">
                    {stopSequences[param]?.map((sequence, index) => (
                      <div
                        key={index}
                        className="m-1 mr-1 grid grid-flow-col items-center"
                      >
                        <button
                          className="btn w-auto btn-xs item-center grid grid-flow-col justify-center rounded-sm hover:border-error no-animation overflow-hidden"
                        >
                          <div className='text-xs overflow-ellipsis overflow-hidden'>{sequence}</div>
                          <TbX className="stroke-slate-400 hover:stroke-error" onClick={() => handleRemoveStopSequence(param, index, 'value')}></TbX>
                        </button>
                      </div>
                    ))}
                    <input
                      type="text"
                      placeholder="停止序列"
                      value={tempInput}
                      onChange={(e) => handleTempInput(param, e.target.value)}
                      className="input my-1 px-1 border-white h-full flex-1 w-20"
                      style={{
                        fontSize: '14px',
                        outline: 'none',
                      }}
                    />
                    <button
                      onClick={() => handleAddStopSequence(param, 'value')}
                      className="btn btn-outline btn-xs ml-auto rounded-sm m-1"
                    >
                      新增
                    </button>
                  </div>
                </div>
              ),
          )}
          {/* 目前 tokens 計數 */}
          <div className="label-text grid mt-10">
            目前 tokens 計數
            <progress
              className="progress h-3 my-1"
              value="40"
              max="100"
            ></progress>
            <p className='text-xs'>125 / 16000</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Config;
