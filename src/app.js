import React, { useState , useRef } from 'react'
import { Auth } from './Components/Auth'
import Chat from './Components/Chat'
import {signOut} from 'firebase/auth'
import {auth} from './firebase'
import Cookies from "universal-cookie"
  let cookies = new Cookies()

const App = () => {
      const [isAuth , setisAuth] = useState(cookies.get("auth-token"))
      const [room , setroom]= useState(null)

      const roomInputRef = useRef(null)

let signUserOut = async () =>{
    await signOut(auth)
    cookies.remove("auth-token")
    setisAuth(false)
    setroom(null)
} 

  if(!isAuth){
    return (
    <div>
      <Auth setisAuth={setisAuth}/>
    </div>
  )
    } 

    return (
    <div className='bg-purple-600 md:h-[61rem]'>
    {room ? (<div><Chat room={room}/></div>)
    :
    (<div className='bg-[#d09ae6] md:h-[12rem] md:w-[30rem] md:top-52 md:p-4 md:rounded-lg md:text-center relative md:left-[25rem]'>
    <label  htmlFor="" className='font-bold text-lg'>Enter room name</label> 
    <input  type="text" ref={roomInputRef} className='flex relative left-[8rem] mt-3 mb-3 p-2'/>
    <button onClick={()=>setroom(roomInputRef.current.value)} className='bg-[#3352af] rounded-lg p-2'>Enter room</button>
    </div>)} 




    <button className='bg-red-600 rounded-lg p-3 relative left-[25rem] top-56'  onClick={signUserOut}>Sign out</button>
    </div>
    )

   

}

export default App