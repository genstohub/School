import React from "react";

export default function SignError({err, solution, onRetryClick, onEditClick}) {
  return (
    //   <div className='w-full h-full min-h-screen flex justify-center items-center z-50 fixed bg-[rgba(0,0,0,0.6)] top-0 bottom-0 right-0 left-0'>
    //       <div className='bg-white rounded-2xl w-60 min-h-40'></div>
    // </div>
    <div className="fixed inset-0 backdrop-blur-sm bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-[90%] max-w-md p-6 text-center">
        <p className="text-red-700 text-2xl font-bold">{err}</p>
        <p className="text-red-700 text-sm font-semibold">{solution}</p>

        <div className="flex max-w-8/12 mt-8 justify-between mx-auto items-center">
          <span className="p-1 cursor-pointer text-center bg-[goldenrod] font-bold rounded-3xl px-6" onClick={onEditClick}>
            edit info
          </span>
          <span className="p-1 cursor-pointer text-center bg-green-400 font-bold rounded-3xl px-6" onClick={onRetryClick}>
            retry
          </span>
        </div>
      </div>
    </div>
  );
}
