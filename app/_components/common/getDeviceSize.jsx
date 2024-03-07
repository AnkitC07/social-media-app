'use client'
import { useLayoutEffect, useState } from "react"

const useGetDeviceWidth = () =>{
    const [device,setDeviceSize] = useState("")

    useLayoutEffect(()=>{
        window.addEventListener('resize',resize)
        resize()
        return ()=>{
            window.removeEventListener('resize',resize)
        }
    },[])
    
    const resize = () =>{
        const windowWidth = window.innerWidth;
        if (windowWidth >= 1024) {
          setDeviceSize('lg');
        } else if (windowWidth >= 904) {
          setDeviceSize('md');
        } else if (windowWidth >= 598) {
          setDeviceSize('sm');
        } else {
          setDeviceSize('xs');
        }
    }

    return device
}

export default useGetDeviceWidth