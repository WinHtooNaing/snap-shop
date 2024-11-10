"use client";
import { Session } from 'next-auth'
import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import {signOut} from "next-auth/react"
import {LogIn} from "lucide-react"

const UserButton = ({user} : Session) => {
  return (
    <div>
      {user?.email}
      {
        user?.email ? (
          <Button variant={"destructive"} onClick={()=>signOut()}>Logout</Button>
        ) : (<Button asChild><Link href={"/auth/login"}> <LogIn/> <span>Login</span></Link></Button>)
      }
    </div>
  )
}

export default UserButton
