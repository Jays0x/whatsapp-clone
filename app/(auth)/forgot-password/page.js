
import Link from "next/link"

function page() {
  return (
    <div className='flex flex-col justify-center items-center h-[90vh] w-full font-[family-name:var(--font-geist-mono)]'>

      <div className='mb-8'>
        <h1 className='lg:text-2xl text-xl text-center font-semibold'>Forgot password</h1>
        <p className='text-[var(--paragraph)] text-[14px]'>Please input your email to verify your email</p>
      </div>

      <div className='flex flex-col gap-4'>
          <form className='flex flex-col gap-4 mb-4'>
            <label htmlFor='name'>Email address</label>
            <input type='email' id='email' name='email' placeholder='e.g example@gmail.com' className='bg-[var(--component)] py-3 px-4 rounded-md placeholder:text-[var(--input)] w-[400px]' required />
          </form>

          <Link href='/email-verification' className='bg-[var(--button)] py-4 rounded-md text-center mb-10'>Continue</Link>

      </div>

    </div>
  )
}

export default page