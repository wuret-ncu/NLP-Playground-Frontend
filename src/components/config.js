import { TbAdjustmentsHeart } from 'react-icons/tb';
import { Context } from '../contexts/context.js';
import { useContext } from 'react';

function Config() {
  const { parameters, setParameters } = useContext(Context);

  // 處理參數值的變更
  const handleParameterChange = (param, key, newValue) => {
    // 確認新值是否是有效的數字，以及是否在設定的範圍內
    if (!isNaN(newValue) && newValue >= parameters[param].min && newValue <= parameters[param].max) {
      // 使用 setParameters 更新參數狀態
      setParameters((prevParameters) => ({
        ...prevParameters,
        [param]: {
          ...prevParameters[param],
          [key]: newValue,
        },
      }));
    }
  };

  return (
    <div>
      <div className='grid grid-rows-2-23 h-85vh gap-5'>
        <div className='grid grid-flow-col items-center'>
          <div className='grid grid-flow-col justify-start items-center'>
            {/* 圖標 */}
            <TbAdjustmentsHeart className='h-6 w-6 mx-1' />
            {/* 標題 */}
            <p className='text-xl'>參數配置</p>
          </div>
        </div>
        <div className='grid grid-flow-row gap-5 auto-rows-min mx-1'>
          {/* 遍歷參數，創建滑動條和輸入框 */}
          {Object.entries(parameters).map(([param, { value, min, max }]) => (
            param !== '停止序列' && (
              <div key={param}>
                <div className='grid grid-flow-col items-center justify-between'>
                  {/* 參數名稱 */}
                  {param}
                  {/* 輸入框 */}
                  <input
                    type='text'
                    placeholder='輸入數值'
                    value={isNaN(value) ? '' : value}
                    onChange={(e) => handleParameterChange(param, 'value', e.target.value)}
                    className='input input-bordered w-14 h-7 text-sm'
                  />
                </div>
                {/* 滑動條 */}
                <input
                  type='range'
                  min={min}
                  max={max}
                  step={0.1}
                  value={value}
                  onChange={(e) => handleParameterChange(param, 'value', parseFloat(e.target.value))}
                  className='range range-xs'
                />
              </div>
            )
          ))}
          {/* 停止序列輸入框 */}
          <div>
            停止序列
            <input
              type='text'
              placeholder='停止序列'
              className='input input-bordered w-full h-10 mt-1'
            />
          </div>
          {/* 目前 tokens 計數 */}
          <div className='grid mt-10'>
            目前 tokens 計數
            <progress className='progress h-3 mb-1' value='40' max='100'></progress>
            <p>125 / 4000</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Config;
