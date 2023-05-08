import GoogleIcon from '@mui/icons-material/Google';
import React from "react"
import { auth, provider } from "../firebase"
import { signInWithPopup } from "firebase/auth"
import Cookies from "universal-cookie"
let cookies = new Cookies()

export const Auth = (props) => {
    const {setisAuth} = props

    const signInWithGoogle = async () => {
        try {
            let result = await signInWithPopup(auth, provider)
            console.log(result)
            cookies.set("auth-token", result.user.refreshToken)
            setisAuth(true)
        } catch (err) {
            console.log(err)
        }

    }
    return (
        <div className="md:bg-[#d09ae6] md:h-[100vh]">
              <span className="text-9xl font-extrabold ">CHATTER</span>
              <span className="flex mt-9 ml-9 font-semibold">Chat with you Friends with entering in same room</span>
            <img className=" md:h-[30rem]  md:w-[35rem] absolute top-10 left-[40rem]" src="https://plus.unsplash.com/premium_photo-1677252438425-e4125f74fbbe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2hhdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60" alt="" />
            <button  className="flex bg-[#3352af] p-4 rounded-md text-white top-[22rem] ml-12 absolute" onClick={signInWithGoogle}> <GoogleIcon/> <span className='pl-3'> Sign in with Google </span></button>
        </div>
    )
}