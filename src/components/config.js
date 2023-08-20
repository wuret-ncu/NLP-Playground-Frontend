import { TbAdjustmentsHeart } from 'react-icons/tb';

function Config() {
  return (
    <div>
      <div className="grid grid-rows-2-23 h-85vh gap-5">
        <div className="grid grid-flow-col items-center">
          <div className="grid grid-flow-col justify-start items-center">
            <TbAdjustmentsHeart className="h-6 w-6 mx-1" />
            <p className="text-xl">參數配置</p>
          </div>
        </div>
        <div className="grid grid-flow-row gap-5 auto-rows-min mx-1">
          <div>
            <div className="grid grid-flow-col items-center justify-between">
              回應上限
              <input
                type="text"
                placeholder="40"
                className="input input-bordered w-14 h-7 text-sm"
              />
            </div>
            <input
              type="range"
              min={0}
              max="100"
              value="40"
              className="range range-xs"
            />
          </div>
          <div>
            <div className="grid grid-flow-col items-center justify-between">
              溫度
              <input
                type="text"
                placeholder="40"
                className="input input-bordered w-14 h-7 text-sm"
              />
            </div>
            <input
              type="range"
              min={0}
              max="100"
              value="40"
              className="range range-xs"
            />
          </div>
          <div>
            <div className="grid grid-flow-col items-center justify-between">
              頂端 P
              <input
                type="text"
                placeholder="40"
                className="input input-bordered w-14 h-7 text-sm"
              />
            </div>
            <input
              type="range"
              min={0}
              max="100"
              value="40"
              className="range range-xs"
            />
          </div>
          <div>
            停止序列
            <input
              type="text"
              placeholder="停止序列"
              className="input input-bordered w-full h-10 mt-1"
            />
          </div>
          <div>
            <div className="grid grid-flow-col items-center justify-between">
              頻率罰則
              <input
                type="text"
                placeholder="40"
                className="input input-bordered w-14 h-7 text-sm"
              />
            </div>
            <input
              type="range"
              min={0}
              max="100"
              value="40"
              className="range range-xs"
            />
          </div>
          <div>
            <div className="grid grid-flow-col items-center justify-between">
              目前狀態罰則
              <input
                type="text"
                placeholder="40"
                className="input input-bordered w-14 h-7 text-sm"
              />
            </div>
            <input
              type="range"
              min={0}
              max="100"
              value="40"
              className="range range-xs"
            />
          </div>
          <div className="grid mt-10">
            目前 tokens 計數
            <progress className="progress h-3 mb-1" value="40" max="100"></progress>
            <p>125 / 4000</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Config;
