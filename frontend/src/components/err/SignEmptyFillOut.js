import React from 'react'

export default function SignEmptyFillOut({onNoted}) {
  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-[90%] max-w-md p-6 text-center">
        <p className="text-red-700 text-2xl font-bold">Empty Blank</p>
        <p className="text-red-700 text-sm font-semibold">Please Fill out the empty blank correctly</p>

        <div className="flex max-w-8/12 mt-8 justify-center  mx-auto items-center">
          <span
            className="p-1 text-center cursor-pointer bg-[goldenrod] font-bold rounded-3xl px-6"
            onClick={onNoted}
          >
            ok
          </span>
        </div>
      </div>
    </div>
  );
}
