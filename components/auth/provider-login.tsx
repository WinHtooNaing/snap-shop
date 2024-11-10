"use client"
import React from 'react'
import { Button } from '../ui/button'
import {FcGoogle} from 'react-icons/fc'
import {FaGithub} from 'react-icons/fa'
import { signIn } from 'next-auth/react'
const ProviderLogin = () => {
  return (
     <div className='w-full flex flex-col gap-3'>
      <Button asChild variant={"outline"} onClick={() => signIn("google",{
        callbackUrl : "/",
        redirect : false
      })} className='hover:cursor-pointer'>
<p className='flex items-center  gap-3'>Login with Google <FcGoogle /></p>
      </Button>
      <Button asChild variant={"outline"} onClick={()=> signIn("github",{
        callbackUrl : "/",
        redirect : false
      })} className='hover:cursor-pointer'>
<p className='flex items-center  gap-3'>Login with Github <FaGithub /></p>
      </Button>
    </div>
  )
}

export default ProviderLogin

