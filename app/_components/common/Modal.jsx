import React from 'react'

const Modal = ({children,style="",width}) => {
  return (
    <div className={width + " absolute z-[-1] p-4 rounded-lg overscroll-contain bg-bg-purple shadow-[0px_0px_15px_rgba(225,225,225,0.2),0px_0px_3px_1px_rgba(225,225,225,0.15)]"}>
    <div
        id="scroll-style"
        className={
           " flex items-center  min-h-16 max-h-96 overflow-y-auto " +
            style
        }
    >
        <div className="">
            {children}
        </div>
    </div>
</div>
  )
}

export default Modal