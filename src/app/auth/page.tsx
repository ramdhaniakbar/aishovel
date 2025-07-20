'use client'
import React, { useState } from 'react'
import { signIn, signUp, testDatabaseConnection } from '@/lib/auth'
import { useRouter } from 'next/navigation'

const Page = () => {
  const [auth, setAuth] = useState(false)
  const [formData, setFormData] = useState({
    phone: '',
    email: '',
    password: '',
    cpassword: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  // Test database connection on component mount
  React.useEffect(() => {
    const runTest = async () => {
      const result = await testDatabaseConnection()
      console.log('Database test result:', result)
    }
    runTest()
  }, [])

  const handleSubmit = async () => {
    setError('')
    setIsLoading(true)

    console.log('Form submission started', { auth, formData: { ...formData, password: '***', cpassword: '***' } })

    // Validasi form
    if (!formData.email || !formData.password) {
      setError('Email dan password harus diisi')
      setIsLoading(false)
      return
    }

    if (!auth) {
      // Register validation
      if (!formData.phone) {
        setError('Phone harus diisi')
        setIsLoading(false)
        return
      }
      if (formData.password !== formData.cpassword) {
        setError('Password dan konfirmasi password tidak sama')
        setIsLoading(false)
        return
      }
      if (formData.password.length < 6) {
        setError('Password minimal 6 karakter')
        setIsLoading(false)
        return
      }
    }

    try {
      if (auth) {
        // Login
        console.log('Attempting login...')
        const result = await signIn(formData.email, formData.password)
        console.log('Login result:', result)
        if (result.error) {
          setError(result.error.message)
        } else {
          console.log('Login successful, redirecting...')
          router.push('/')
        }
      } else {
        // Register
        console.log('Attempting registration...')
        const result = await signUp(formData.email, formData.password, formData.phone)
        console.log('Registration result:', result)
        if (result.error) {
          setError(result.error.message)
        } else {
          setError('')
          // Reset form after successful registration
          setFormData({
            phone: '',
            email: '',
            password: '',
            cpassword: ''
          })
          // Switch to login mode
          setAuth(true)
          setError('Registrasi berhasil! Silakan cek email Anda untuk verifikasi, lalu login.')
        }
      }
    } catch (err) {
      console.error('Auth error:', err)
      setError('Terjadi kesalahan sistem. Silakan coba lagi.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
    <div>
        <main
          className="flex flex-col row-start-2 items-center sm:items-start py-[50px] px-[100px] max-[700px]:px-[0px]"
          style={{
            backgroundImage: "url('/home/background/bg-home-1.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            minHeight: "100vh",
          }}>
            <div className='flex flex-row h-[600px] max-w-[1200px] w-full mx-auto bg-white rounded-3xl shadow-2xl'>
                <div className='absolute cursor-pointer mt-[20px] ml-[30px] text-[#787878]' onClick={() => window.location.href = '/'}> &lt; Kembali ke home</div>
                <div className='flex justify-center w-[50%] max-[1200px]:w-[100%] h-full'>
                    <div className='flex flex-col gap-[20px] py-[50px] w-[400px] '>
                        <div className='text-[40px] font-[800] max-[480px]:ml-[40px]' >AISHOVEL</div>
                        <div className='w-full justify-center text-center text-[#a2a2a2]'>
                            {auth ? <span>Selamat datang kembali</span> 
                            : 
                            <span>Ayo bergabung bersama kami</span>
                            }
                        </div>
                        <div className='flex justify-center '>
                            <div className='flex justify-center gap-[30px] bg-[#313131] text-white py-[10px] px-[20px] rounded-3xl'>
                                <div className='w-[80px] h-[35px] bg-[#71C0BB] rounded-3xl absolute transition-all duration-300 ease-in-out'
                                style={{ transform: `translateX(${auth ? '-40px' : '40px'}) translateY(-6px)` }}/>
                                <div className='relative z-[5] cursor-pointer' onClick={() => setAuth(true)}>Masuk</div> 
                                <div className='relative z-[5] cursor-pointer' onClick={() => setAuth(false)}>Daftar</div>
                            </div>
                        </div>
                        <div className='w-full flex flex-col justify-between h-full'>
                            {error && (
                              <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mx-[20px] max-[480px]:mx-[60px] mb-[20px]'>
                                {error}
                              </div>
                            )}
                            {auth ?
                            <div className='flex flex-col gap-[30px] px-[20px] max-[480px]:px-[60px]'>
                                <input 
                                  name='email' 
                                  type="email" 
                                  placeholder='Email' 
                                  className='focus:outline-none border-[#2424] border-b'
                                  value={formData.email}
                                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                                />
                                <input 
                                  name='password' 
                                  type="password" 
                                  placeholder='Password' 
                                  className='focus:outline-none border-[#2424] border-b'
                                  value={formData.password}
                                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                                />
                            </div>
                            :
                            <div className='flex flex-col gap-[30px] px-[20px] max-[480px]:px-[60px]'>
                                <input 
                                  name='phone' 
                                  type="tel" 
                                  placeholder='Phone' 
                                  className='focus:outline-none border-[#2424] border-b'
                                  value={formData.phone}
                                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                />
                                <input 
                                  name='email' 
                                  type="email" 
                                  placeholder='Email' 
                                  className='focus:outline-none border-[#2424] border-b'
                                  value={formData.email}
                                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                                />
                                <input 
                                  name='password' 
                                  type="password" 
                                  placeholder='Password' 
                                  className='focus:outline-none border-[#2424] border-b'
                                  value={formData.password}
                                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                                />
                                <input 
                                  name='cpassword' 
                                  type="password" 
                                  placeholder='Confirm Password' 
                                  className='focus:outline-none border-[#2424] border-b'
                                  value={formData.cpassword}
                                  onChange={(e) => setFormData({...formData, cpassword: e.target.value})}
                                />
                            </div>
                            }
                            <button 
                              className='bg-[#71C0BB] text-white py-[10px] rounded-3xl mx-[10px] max-[480px]:mx-[40px] mb-[50px] disabled:opacity-50'
                              onClick={handleSubmit}
                              disabled={isLoading}
                            >
                                {isLoading ? 'Loading...' : (auth ? 'Masuk' : 'Daftar')}
                            </button>
                        </div>
                    </div>
                </div>
                <div className='flex justify-center w-[50%] h-full rounded-r-3xl max-[1200px]:hidden'
                    style={{
                        backgroundImage: "url('/detail/component/authd.png')",
                        backgroundSize: "cover", // Gambar akan menutupi seluruh area
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        minHeight: "fit-content",
                    }}>
                </div>
            </div>
          </main>
    </div>
    </>
  )
}

export default Page