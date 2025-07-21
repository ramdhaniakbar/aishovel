import { supabase } from './supabase'

// Debug function to test database connection and permissions
export async function testDatabaseConnection() {
  console.log('=== Testing Database Connection ===')
  
  try {
    // Test 1: Check if we can read from the table
    console.log('Test 1: Reading from user table...')
    const { data: readData, error: readError } = await supabase
      .from('user')
      .select('*')
      .limit(5)
    
    console.log('Read result:', { readData, readError })
    
    // Test 2: Try simple insert (tanpa auth requirement)
    console.log('Test 2: Simple insert test...')
    const testUser = {
      email: `test-${Date.now()}@example.com`,
      displayName: `Test User ${Date.now().toString().slice(-8)}`
    }
    
    const { data: insertData, error: insertError } = await supabase
      .from('user')
      .insert([testUser])
      .select()
    
    console.log('Insert result:', { insertData, insertError })
    
    // Test 3: Check current user session
    console.log('Test 3: Current user session...')
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    console.log('Current user:', { user, userError })
    
    // Test 4: Check if trigger exists
    console.log('Test 4: Checking trigger...')
    const { data: triggerData, error: triggerError } = await supabase
      .rpc('check_trigger_exists', { trigger_name: 'on_auth_user_created' })
      .single()
    
    console.log('Trigger check:', { triggerData, triggerError })
    
    return {
      canRead: !readError,
      canInsert: !insertError,
      hasUser: !!user,
      triggerExists: !triggerError,
      errors: { readError, insertError, userError, triggerError }
    }
    
  } catch (error) {
    console.error('Database test error:', error)
    return { error }
  }
}

// Function to manually sync user profile jika trigger gagal
export async function manualSyncUserProfile() {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      return { error: { message: 'No authenticated user found' } }
    }
    
    // Check if profile already exists
    const { data: existingProfile } = await supabase
      .from('user')
      .select('*')
      .eq('email', user.email)
      .single()
    
    if (existingProfile) {
      return { profile: existingProfile, message: 'Profile already exists' }
    }
    
    // Create profile manually
    const userData = {
      email: user.email,
      displayName: user.user_metadata?.displayName || ''
    }
    
    const { data: newProfile, error: insertError } = await supabase
      .from('user')
      .insert([userData])
      .select()
      .single()
    
    if (insertError) {
      return { error: { message: insertError.message } }
    }
    
    return { profile: newProfile, message: 'Profile created successfully' }
    
  } catch (error) {
    console.error('Manual sync error:', error)
    return { error: { message: 'Failed to sync user profile' } }
  }
}


// Function to check and create user table if needed
export async function ensureUserTable() {
  try {
    // Try to check if table exists by attempting a simple query
    const { error } = await supabase
      .from('user')
      .select('id')
      .limit(1)
    
    if (error && error.message.includes('does not exist')) {
      console.log('User table does not exist, but we cannot create it from client side')
      console.log('Please create the table manually in Supabase dashboard')
      return false
    }
    
    return true
  } catch (err) {
    console.error('Error checking user table:', err)
    return false
  }
}

export interface AuthUser {
  id: string
  email: string
  displayName?: string
  created_at: string
}

export interface UserProfile {
  id: number  // int8 in database
  email: string
  displayName: string
  created_at: string
}

export interface AuthError {
  message: string
}

// Login dengan email dan password
export async function signIn(email: string, password: string) {
  try {
    console.log('signIn called with email:', email)
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    
    console.log('Supabase signIn response:', { data, error })
    
    if (error) {
      console.error('Supabase signIn error:', error)
      return { error: { message: error.message } }
    }
    
    return { data }
  } catch (err) {
    console.error('signIn catch error:', err)
    return { error: { message: 'Terjadi kesalahan saat login' } }
  }
}

// Register user baru
export async function signUp(email: string, password: string, displayName?: string) {
  try {
    console.log('signUp called with email:', email, 'displayName:', displayName)
    
    // Create auth user with displayName in metadata - trigger will handle user table
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          displayName: displayName || ''
        }
      }
    })
    
    console.log('Supabase signUp response:', { authData, authError })
    
    if (authError) {
      console.error('Supabase signUp error:', authError)
      return { error: { message: authError.message } }
    }
    
    console.log('Auth user created successfully. Database trigger should handle user table insertion.')
    
    // Don't manually insert - let the database trigger handle it
    // The trigger will automatically create user profile when auth.users record is inserted
    
    return { data: authData }
  } catch (err) {
    console.error('signUp catch error:', err)
    return { error: { message: 'Terjadi kesalahan saat mendaftar' } }
  }
}

// Logout
export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut()
    
    if (error) {
      return { error: { message: error.message } }
    }
    
    return { success: true }
  } catch {
    return { error: { message: 'Terjadi kesalahan saat logout' } }
  }
}

// Get current user
export async function getCurrentUser() {
  try {
    // Only run in browser environment
    if (typeof window === 'undefined') {
      return { user: null }
    }
    
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error) {
      return { error: { message: error.message } }
    }
    
    return { user }
  } catch {
    return { error: { message: 'Terjadi kesalahan saat mengambil data user' } }
  }
}

// Get current session (includes JWT token)
export async function getCurrentSession() {
  try {
    // Only run in browser environment
    if (typeof window === 'undefined') {
      return { session: null }
    }
    
    const { data: { session }, error } = await supabase.auth.getSession()
    
    if (error) {
      return { error: { message: error.message } }
    }
    
    return { session }
  } catch {
    return { error: { message: 'Terjadi kesalahan saat mengambil session' } }
  }
}

// Reset password
export async function resetPassword(email: string) {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    })
    
    if (error) {
      return { error: { message: error.message } }
    }
    
    return { success: true }
  } catch {
    return { error: { message: 'Terjadi kesalahan saat reset password' } }
  }
}

// Update password
export async function updatePassword(newPassword: string) {
  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    })
    
    if (error) {
      return { error: { message: error.message } }
    }
    
    return { success: true }
  } catch {
    return { error: { message: 'Terjadi kesalahan saat update password' } }
  }
}

// Get user profile from user table by email (since auth.user.id is UUID but table id is int8)
export async function getUserProfile(email: string): Promise<{ profile?: UserProfile; error?: AuthError }> {
  try {
    const { data, error } = await supabase
      .from('user')
      .select('*')
      .eq('email', email)
      .single()
    
    if (error) {
      return { error: { message: error.message } }
    }
    
    return { profile: data }
  } catch {
    return { error: { message: 'Terjadi kesalahan saat mengambil profil user' } }
  }
}

// Update user profile in user table by email
export async function updateUserProfile(email: string, updates: Partial<UserProfile>) {
  try {
    const { error } = await supabase
      .from('user')
      .update(updates)
      .eq('email', email)
    
    if (error) {
      return { error: { message: error.message } }
    }
    
    return { success: true }
  } catch {
    return { error: { message: 'Terjadi kesalahan saat update profil user' } }
  }
}

// Get current user with profile data
export async function getCurrentUserProfile() {
  try {
    if (typeof window === 'undefined') {
      return { user: null, profile: null }
    }
    
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return { error: { message: authError?.message || 'User tidak ditemukan' } }
    }
    
    const { profile, error: profileError } = await getUserProfile(user.email || '')
    
    if (profileError) {
      return { user, profile: null, error: profileError }
    }
    
    return { user, profile }
  } catch {
    return { error: { message: 'Terjadi kesalahan saat mengambil data user' } }
  }
}