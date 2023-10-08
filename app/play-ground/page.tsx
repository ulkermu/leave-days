"use client";

import type { RootState } from "../redux/store";
import { useSelector, useDispatch } from "react-redux";
import {
  increment,
  decrement,
  incrementByAmount,
} from "@/app/redux/features/counter/counterSlice";

const PlayGround = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <main>
      <div className="flex flex-col gap-5">
        <div className="flex gap-2.5 items-center">
          <button
            className="bg-blue-500 p-2 rounded text-white hover:bg-blue-700 duration-300"
            onClick={() => dispatch(increment())}
          >
            Increment
          </button>
          <span>{count}</span>
          <button
            className="bg-blue-500 p-2 rounded text-white hover:bg-blue-700 duration-300"
            onClick={() => dispatch(decrement())}
          >
            Decrement
          </button>
          <button
            className="bg-blue-500 p-2 rounded text-white hover:bg-blue-700 duration-300"
            onClick={() => dispatch(incrementByAmount(2))}
          >
            Increment by 2
          </button>
        </div>
      </div>
    </main>
  );
};

export default PlayGround;
