import RegisterSubmitButton from './registerSubmitButton';

export default function RegisterPage() {
    return (
        <div className='mb-4 flex items-center justify-center min-h-screen bg-gray-100'>
            <form className='bg-white p-8 rounded-lg shadow-md w-full max-w-sm'>
                <div className='text-lg mb-4 flex items-center justify-center'>
                    <h1 className='block text-gray-700 text-sm font-bold'>Register</h1>
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2'>First name:</label>
                    <input 
                        type='text' 
                        name='firstName'
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 
                        placeholder='Enter your first name'
                    />
                </div>

                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2'>Last name:</label>
                    <input 
                        type='text' 
                        name='lastName'
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 
                        placeholder='Enter your last name'
                    />
                </div>

                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2'>Email:</label>
                    <input 
                        type='email' 
                        name='email'
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 
                        placeholder='Enter your email'
                    />
                </div>

                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2'>Password</label>
                    <input 
                        type='password' 
                        name='password'
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 
                        placeholder='Enter your password'
                    />
                </div>

                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2'>Confirm your password</label>
                    <input 
                        type='password' 
                        name='confirmPassword'
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 
                        placeholder='Confirm your password'
                    />
                </div>

                <RegisterSubmitButton />
            </form>
        </div>
    )
}