'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { UserProfile } from '@/lib/auth'
import type { User, Session } from '@supabase/supabase-js'

interface AuthContextType {
  user: User | null
  session: Session | null
  profile: UserProfile | null
  loading: boolean
  signOut: () => Promise<void>
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  profile: null,
  loading: true,
  signOut: async () => {},
  refreshProfile: async () => {},
})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    // Get initial session
    const getInitialSession = async () => {
      try {
        // Only run in browser environment
        if (typeof window === 'undefined') {
          setLoading(false)
          return
        }

        // Use direct supabase call instead of our wrapper to avoid potential SSR issues
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Session error:', error)
          setSession(null)
          setUser(null)
        } else {
          setSession(session)
          setUser(session?.user || null)
          
          // Get user profile if user exists
          if (session?.user && session.user.email) {
            try {
              const { data: profileData, error: profileError } = await supabase
                .from('user')
                .select('*')
                .eq('email', session.user.email)
                .single()
              
              if (!profileError && profileData) {
                setProfile(profileData)
              }
            } catch (profileErr) {
              console.error('Error fetching profile:', profileErr)
            }
          }
        }
      } catch (error) {
        console.error('Error getting initial session:', error)
        setSession(null)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    getInitialSession()

    // Listen for auth changes - only in browser
    if (typeof window !== 'undefined') {
      try {
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          async (event, session) => {
            console.log('Auth state changed:', event, session?.user?.email)
            
            setSession(session)
            setUser(session?.user || null)
            setLoading(false)

            // Get user profile if user exists
            if (session?.user && session.user.email) {
              // Add delay for new registrations to allow database insert
              const delay = event === 'SIGNED_IN' ? 1000 : 0
              setTimeout(async () => {
                try {
                  const { data: profileData, error: profileError } = await supabase
                    .from('user')
                    .select('*')
                    .eq('email', session.user.email)
                    .single()
                  
                  if (!profileError && profileData) {
                    setProfile(profileData)
                  }
                } catch (profileErr) {
                  console.error('Error fetching profile on auth change:', profileErr)
                }
              }, delay)
            } else {
              setProfile(null)
            }

            // Handle different auth events
            switch (event) {
              case 'SIGNED_IN':
                console.log('User signed in:', session?.user?.email)
                // If user doesn't have profile, try to create it
                if (session?.user && session.user.email && !profile) {
                  setTimeout(async () => {
                    try {
                      // Check if user exists in user table
                      const { data: existingUser } = await supabase
                        .from('user')
                        .select('*')
                        .eq('email', session.user.email)
                        .single()
                      
                      if (!existingUser) {
                        // Create user profile if it doesn't exist
                        const userData = {
                          email: session.user.email,
                          phone: session.user.user_metadata?.phone || '',
                        }
                        
                        const { data: newUser, error } = await supabase
                          .from('user')
                          .insert([userData])
                          .select()
                          .single()
                        
                        if (!error && newUser) {
                          console.log('User profile created on sign in')
                          setProfile(newUser)
                        }
                      }
                    } catch (err) {
                      console.error('Error creating user profile on sign in:', err)
                    }
                  }, 1000)
                }
                break
              case 'SIGNED_OUT':
                console.log('User signed out')
                break
              case 'TOKEN_REFRESHED':
                console.log('Token refreshed for user:', session?.user?.email)
                break
              case 'USER_UPDATED':
                console.log('User updated:', session?.user?.email)
                break
            }
          }
        )

        return () => {
          subscription.unsubscribe()
        }
      } catch (error) {
        console.error('Error setting up auth listener:', error)
        setLoading(false)
      }
    }
  }, [mounted])

  const refreshProfile = async () => {
    if (user && user.email) {
      try {
        const { data: profileData, error: profileError } = await supabase
          .from('user')
          .select('*')
          .eq('email', user.email)
          .single()
        
        if (!profileError && profileData) {
          setProfile(profileData)
        }
      } catch (error) {
        console.error('Error refreshing profile:', error)
      }
    }
  }

  const signOut = async () => {
    try {
      setLoading(true)
      await supabase.auth.signOut()
      setUser(null)
      setSession(null)
      setProfile(null)
    } catch (error) {
      console.error('Error signing out:', error)
    } finally {
      setLoading(false)
    }
  }

  const value = {
    user,
    session,
    profile,
    loading,
    signOut,
    refreshProfile,
  }

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return <AuthContext.Provider value={{
      user: null,
      session: null,
      profile: null,
      loading: true,
      signOut: async () => {},
      refreshProfile: async () => {},
    }}>{children}</AuthContext.Provider>
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}