'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

const ProfilePage = () => {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
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
          phone: user.user_metadata?.phone || "",
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
    if (!formData.email || !formData.phone) {
      setError('Email dan phone harus diisi')
      setIsSaving(false)
      return
    }

    if (formData.phone.length < 8) {
      setError('Phone minimal 8 karakter')
      setIsSaving(false)
      return
    }

    try {
      // Update user metadata with phone
      const { error } = await supabase.auth.updateUser({
        data: { phone: formData.phone }
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
        email: profile.email,
        phone: profile.user_metadata?.phone || ''
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
          <div className="flex flex-row h-[600px] max-w-[1200px] w-full mx-auto bg-white rounded-3xl shadow-2xl">
            <div
              className="absolute cursor-pointer mt-[20px] ml-[30px] text-[#787878]"
              onClick={() => router.push("/")}
            >
              &lt; Kembali ke home
            </div>
            <div className="flex justify-center w-[50%] max-[1200px]:w-[100%] h-full">
              <div className="flex flex-col gap-[20px] py-[50px] w-[400px]">
                <div className="text-[40px] font-[800] max-[480px]:ml-[40px]">
                  PROFIL
                </div>
                <div className="w-full justify-center text-center text-[#a2a2a2]">
                  {isEditing ? (
                    <span>Edit profil Anda</span>
                  ) : (
                    <span>Informasi profil Anda</span>
                  )}
                </div>

                <div className="flex justify-center">
                  <div className="flex justify-center gap-[30px] bg-[#313131] text-white py-[10px] px-[20px] rounded-3xl">
                    <div
                      className={`w-[80px] h-[35px] rounded-3xl absolute transition-all duration-300 ease-in-out ${
                        isEditing
                          ? "bg-[#71C0BB] transform translateX(40px) translateY(-6px)"
                          : "bg-[#71C0BB] transform translateX(-40px) translateY(-6px)"
                      }`}
                    />
                    <div
                      className="relative z-[5] cursor-pointer"
                      onClick={() => !isEditing && setIsEditing(false)}
                    >
                      Lihat
                    </div>
                    <div
                      className="relative z-[5] cursor-pointer"
                      onClick={() => !isEditing && setIsEditing(true)}
                    >
                      Edit
                    </div>
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
                  <div className="flex flex-col gap-[30px] px-[20px] max-[480px]:px-[60px]">
                    {/* Email Field (Read Only) */}
                    <div className="flex flex-col gap-[5px]">
                      <label className="text-sm text-gray-600">Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        disabled={true}
                        className="focus:outline-none border-[#2424] border-b bg-gray-50 text-gray-500 cursor-not-allowed"
                      />
                      <span className="text-xs text-gray-400">
                        Email tidak dapat diubah
                      </span>
                    </div>

                    {/* Phone Field */}
                    <div className="flex flex-col gap-[5px]">
                      <label className="text-sm text-gray-600">Phone</label>
                      <input
                        type="text"
                        value={formData.phone}
                        disabled={!isEditing}
                        className={`focus:outline-none border-[#2424] border-b ${
                          isEditing ? "" : "bg-gray-50 text-gray-700"
                        }`}
                        onChange={(e) =>
                          isEditing &&
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder={isEditing ? "Masukkan Phone" : ""}
                      />
                    </div>

                    {/* User ID Info */}
                    {user && (
                      <div className="flex flex-col gap-[5px]">
                        <label className="text-sm text-gray-600">
                          User ID
                        </label>
                        <div className="text-sm text-gray-500 font-mono bg-gray-50 p-2 rounded border-b">
                          {user.id}
                        </div>
                      </div>
                    )}

                    {/* Created At Info */}
                    {profile && profile.created_at && (
                      <div className="flex flex-col gap-[5px]">
                        <label className="text-sm text-gray-600">
                          Bergabung
                        </label>
                        <div className="text-sm text-gray-500 bg-gray-50 p-2 rounded border-b">
                          {new Date(profile.created_at).toLocaleDateString(
                            "id-ID",
                            {
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
                  <div className='flex flex-col gap-[10px] mx-[10px] max-[480px]:mx-[40px] mb-[50px]'>
                    {isEditing ? (
                      <div className='flex gap-[10px]'>
                        <button 
                          className='bg-[#71C0BB] text-white py-[10px] px-[20px] rounded-3xl flex-1 disabled:opacity-50'
                          onClick={handleSave}
                          disabled={isSaving}
                        >
                          {isSaving ? 'Menyimpan...' : 'Simpan'}
                        </button>
                        <button 
                          className='bg-gray-500 text-white py-[10px] px-[20px] rounded-3xl flex-1'
                          onClick={handleCancel}
                          disabled={isSaving}
                        >
                          Batal
                        </button>
                      </div>
                    ) : (
                      <div className='flex flex-col gap-[10px]'>
                        <button 
                          className='bg-[#71C0BB] text-white py-[10px] rounded-3xl'
                          onClick={() => setIsEditing(true)}
                        >
                          Edit Profil
                        </button>
                        <button 
                          className='bg-red-500 text-white py-[10px] rounded-3xl'
                          onClick={handleSignOut}
                        >
                          Logout
                        </button>
                        <button 
                          className='bg-blue-500 text-white py-[5px] rounded-xl text-xs'
                          onClick={() => {
                            console.log('Debug - User:', user)
                            console.log('Debug - Profile:', profile)
                            console.log('Debug - FormData:', formData)
                          }}
                        >
                          Debug Info
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div
              className="flex justify-center w-[50%] h-full rounded-r-3xl max-[1200px]:hidden"
              style={{
                backgroundImage: "url('/detail/component/authd.png')",
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