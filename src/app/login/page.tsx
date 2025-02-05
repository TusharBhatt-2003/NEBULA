'use client'
import React from 'react'
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { axios } from 'axios'

export default function LoginPage() {
  const [user, setUser] = React.useState({
    //username: '',
    email: '',
    password: ''
  })
  
  const onLogin = async () => {
  }

  return (
    <div className='flex flex-col items-center justify-center gap-2 min-h-screen py-2'>
     <h1>Login</h1>
     <hr />
     {/* <label htmlFor='username'>Username</label>
     <input 
     className='p-1 rounded-lg bg-black border border-neutral-700 placeholder:text-neutral-700'
     id='username'
     type='text'
     value={user.username}
     onChange={(e) => setUser({...user, username: e.target.value})}
     placeholder='Username'/> */}

<input 
     className='p-1 rounded-md bg-black border-2 border-black inputBg placeholderColor'
     id='email'
     type='email'
     value={user.email}
     onChange={(e) => setUser({...user, email: e.target.value})}
     placeholder='email'/>

<input 
     className='p-1 rounded-md bg-black border-2 border-black inputBg placeholderColor'
     id='password'
     type='password'
     value={user.password}
     onChange={(e) => setUser({...user, password: e.target.value})}
     placeholder='Password'/>

     <button onClick={onLogin} className='py-2 px-4 rounded-lg border-2 border-black btnBgColor'>
       Login
    </button>
     <Link href='/signup'>
       <p className='py-2 px-4 rounded-lg hover:underline'>Sign in</p>
     </Link>
    </div>
  )
}
