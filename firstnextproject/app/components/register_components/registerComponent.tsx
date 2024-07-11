import React from 'react'

export default function RegisterComponent() {
  return (
    <div className='mb-4 flex items-center  justify-center min-h-screen bg-gray-100'>
        
        <form action="" className='bg-white p-8 rounded-lg shadow-md w-full max-w-sm'>
            <div className='text-lg mb-4 flex items-center justify-center'>
                <h1 className=' block xt-gray-700 text-sm font-bold '>Register</h1>
            </div>
            <div className='mb-4'>
                <label className='block xt-gray-700 text-sm font-bold mb-2'>First name:</label>
                <input type='text' className='shadowappearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' placeholder='Enter your first name'></input>
            </div>

            <div className='mb-4'>
                <label className='block xt-gray-700 text-s font-bold mb-2'>Last name:</label>
                <input type='text' className='shadowappearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' placeholder='Enter your last name'></input>
            </div>

            <div className='mb-4'>
                <label className='block xt-gray-700 text-s font-bold mb-2'>Email:</label>
                <input type='email' className='shadowappearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' placeholder='Enter your email'></input>
            </div>

            <div className='mb-4'>
                <label className='block xt-gray-700 text-s font-bold mb-2' >Password</label>
                <input type='password' className='shadowappearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' placeholder='Enter your password'></input>
            </div>

            <div className='mb-4'>
                <label className='block xt-gray-700 text-s font-bold mb-2'>Confirm your password</label>
                <input type='password' className='shadowappearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' placeholder='Confirm your password'></input>
            </div>

            <div className='flex items-center justify-center'>
                <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Submit</button>
            </div>

        </form>
    </div>
  )
}
