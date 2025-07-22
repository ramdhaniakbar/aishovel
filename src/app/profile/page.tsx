'use client'
import React, { useState, useEffect } from 'react'
import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

const ProfilePage = () => {
  const [user, setUser] = useState<User|null>(null)
  const [profile, setProfile] = useState<User|null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [formData, setFormData] = useState({
    email: "",
    displayName: "",
  })
  const router = useRouter()

  useEffect(() => {
    checkAuthAndLoadProfile()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const checkAuthAndLoadProfile = async () => {
    try {
      setIsLoading(true)

      // Check current user dengan supabase.auth.getUser()
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser()

      console.log("Auth check result:", { user, authError })

      if (!user) {
        router.push('/auth')
        return
      }

      setUser(user)

      // Load user profile dari database
      if (user.email) {
        setProfile(user)
        setFormData({
          email: user.email,
          displayName: user.user_metadata?.displayName || "",
        })
      } else {
        setError("Error loading profile")
      }
    } catch (err) {
      console.error("Error in checkAuthAndLoadProfile:", err)
      setError("Terjadi kesalahan saat memuat profil.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async () => {
    setError('')
    setSuccess('')
    setIsSaving(true)

    // Validasi
    if (!formData.email || !formData.displayName) {
      setError('Email dan Display Name harus diisi')
      setIsSaving(false)
      return
    }

    if (formData.displayName.length < 2) {
      setError('Display Name minimal 2 karakter')
      setIsSaving(false)
      return
    }

    try {
      // Update user metadata with displayName
      const { error } = await supabase.auth.updateUser({
        data: { displayName: formData.displayName }
      })

      if (error) {
        setError(error.message)
      } else {
        setSuccess('Profil berhasil diperbarui!')
        setIsEditing(false)
        // Reload profile data
        await checkAuthAndLoadProfile()
      }
    } catch (err) {
      console.error('Update profile error:', err)
      setError('Terjadi kesalahan saat menyimpan profil.')
    } finally {
      setIsSaving(false)
    }
  }

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut()
      router.push('/')
    } catch (err) {
      console.error('Sign out error:', err)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setError('')
    setSuccess('')
    // Reset form data
    if (profile) {
      setFormData({
        email: profile.email || '',
        displayName: profile.user_metadata?.displayName || ''
      })
    }
  }
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">Memuat profil...</div>
      </div>
    )
  }
  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">Redirecting to login...</div>
      </div>
    )
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
          }}
        >
          <div className="flex flex-row h-auto min-h-[600px] max-w-[1200px] w-full mx-auto bg-white rounded-3xl shadow-2xl relative">
            <div
              className="absolute cursor-pointer top-[20px] left-[30px] text-[#787878] z-10 hover:text-[#71C0BB] transition-colors duration-200"
              onClick={() => router.push("/")}
            >
              &lt; Kembali ke home
            </div>
            <div className="flex justify-center w-[50%] max-[1200px]:w-[100%] h-full">
              <div className="flex flex-col gap-[25px] py-[70px] w-[400px] max-w-[90%]">
                <div className="text-[40px] font-[800] text-center text-[#2C2C2C] max-[480px]:text-[32px]">
                  PROFIL
                </div>
                <div className="w-full justify-center text-center text-[#a2a2a2]">
                  {isEditing ? (
                    <span>Edit profil Anda</span>
                  ) : (
                    <span>Informasi profil Anda</span>
                  )}
                </div>

                <div className='flex justify-center '>
                  <div className='flex justify-center gap-[40px] bg-[#313131] text-white py-[10px] px-[30px] rounded-3xl w-fit'>
                    <div className='w-[80px] h-[35px] bg-[#71C0BB] rounded-3xl absolute transition-all duration-300 ease-in-out'
                    style={{ transform: `translateX(${isEditing ? '40px' : '-40px'}) translateY(-6px)` }}/>
                    <div className='relative z-[5] cursor-pointer' onClick={() => setIsEditing(false)}>Lihat</div> 
                    <div className='relative z-[5] cursor-pointer' onClick={() => setIsEditing(true)}>Edit</div>
                  </div>
                </div>

                <div className="w-full flex flex-col justify-between h-full">
                  {(error || success) && (
                    <div
                      className={`border px-4 py-3 rounded mx-[20px] max-[480px]:mx-[60px] mb-[20px] ${
                        error
                          ? "bg-red-100 border-red-400 text-red-700"
                          : "bg-green-100 border-green-400 text-green-700"
                      }`}
                    >
                      {error || success}
                    </div>
                  )}

                  {/* Profile Info Display/Edit */}
                  <div className="flex flex-col gap-[35px] px-[20px] max-[480px]:px-[40px]">
                    {/* Email Field (Read Only) */}
                    <div className="flex flex-col gap-[8px]">
                      <label className="text-sm font-medium text-gray-700">Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        disabled={true}
                        className="focus:outline-none border-b-2 border-gray-300 bg-gray-50 text-gray-600 cursor-not-allowed py-[12px] px-[4px] rounded-t-md transition-colors duration-200"
                      />
                      <span className="text-xs text-gray-500 italic">
                        Email tidak dapat diubah
                      </span>
                    </div>

                    {/* Display Name Field */}
                    <div className="flex flex-col gap-[8px]">
                      <label className="text-sm font-medium text-gray-700">Display Name</label>
                      <input
                        type="text"
                        value={formData.displayName}
                        disabled={!isEditing}
                        className={`focus:outline-none border-b-2 py-[12px] px-[4px] rounded-t-md transition-all duration-200 ${
                          isEditing 
                            ? "border-[#71C0BB] bg-white text-gray-800 focus:border-[#5BA8A3] focus:bg-blue-50" 
                            : "border-gray-300 bg-gray-50 text-gray-600"
                        }`}
                        onChange={(e) =>
                          isEditing &&
                          setFormData({ ...formData, displayName: e.target.value })
                        }
                        placeholder={isEditing ? "Masukkan Display Name Anda" : ""}
                      />
                    </div>

                    {/* User ID Info */}
                    {user && (
                      <div className="flex flex-col gap-[8px]">
                        <label className="text-sm font-medium text-gray-700">
                          User ID
                        </label>
                        <div className="text-xs text-gray-500 font-mono bg-gray-100 p-3 rounded-lg border border-gray-200 break-all">
                          {user.id}
                        </div>
                      </div>
                    )}

                    {/* Created At Info */}
                    {profile && profile.created_at && (
                      <div className="flex flex-col gap-[8px]">
                        <label className="text-sm font-medium text-gray-700">
                          Bergabung Sejak
                        </label>
                        <div className="text-sm text-gray-600 bg-gray-100 p-3 rounded-lg border border-gray-200">
                          {new Date(profile.created_at).toLocaleDateString(
                            "id-ID",
                            {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className='flex flex-col gap-[12px] mx-[10px] max-[480px]:mx-[20px] mb-[50px] mt-[20px]'>
                    {isEditing ? (
                      <div className='flex gap-[12px]'>
                        <button 
                          className='bg-[#71C0BB] hover:bg-[#5BA8A3] text-white py-[12px] px-[24px] rounded-full flex-1 disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-md transition-all duration-200 transform hover:scale-105'
                          onClick={handleSave}
                          disabled={isSaving}
                        >
                          {isSaving ? (
                            <span className='flex items-center justify-center'>
                              <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Menyimpan...
                            </span>
                          ) : 'Simpan'}
                        </button>
                        <button 
                          className='bg-gray-500 hover:bg-gray-600 text-white py-[12px] px-[24px] rounded-full flex-1 font-medium shadow-md transition-all duration-200 transform hover:scale-105'
                          onClick={handleCancel}
                          disabled={isSaving}
                        >
                          Batal
                        </button>
                      </div>
                    ) : (
                      <div className='flex flex-col gap-[12px]'>
                        <button 
                          className='bg-[#71C0BB] hover:bg-[#5BA8A3] text-white py-[12px] rounded-full font-medium shadow-md transition-all duration-200 transform hover:scale-105'
                          onClick={() => setIsEditing(true)}
                        >
                          Edit Profil
                        </button>
                        <button 
                          className='bg-red-500 hover:bg-red-600 text-white py-[12px] rounded-full font-medium shadow-md transition-all duration-200 transform hover:scale-105'
                          onClick={handleSignOut}
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div
              className="flex justify-center w-[50%]  rounded-r-3xl max-[1200px]:hidden"
              style={{
                backgroundImage: "url('/detail/component/auth.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                minHeight: "fit-content",
              }}
            ></div>
          </div>
        </main>
      </div>
    </>
  )
}

export default ProfilePage