<template>
  <form class="row flex-center flex" @submit.prevent="handleLogin">
    <div class="col-6 form-widget">
      <h1 class="header">Sign in to Zanzibar's World</h1>
      <p class="description">Sign in via magic link with your email below</p>
      <div>
        <input
          class="inputField"
          type="email"
          placeholder="Your email"
          v-model="email"
        />
      </div>
      <div>
        <input
          type="submit"
          class="button block"
          :value="loading ? 'Loading' : 'Send magic link'"
          :disabled="loading"
        />
      </div>
    </div>
  </form>
  <div class="row flex-center flex">
    <button @click="signInWithOAuth">Sign In with GitHub</button>
  </div>
  <div class="row flex-center flex">
    <button @click="signOut">Sign Out</button>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient()
const config = useRuntimeConfig()

const loading = ref(false)
const email = ref('')

const handleLogin = async () => {
  console.log('sign in with magic link')
  try {
    loading.value = true
    const { error } = await supabase.auth.signInWithOtp({
      email: email.value,
      options: {
        emailRedirectTo: `${config.public.baseUrl}/confirm`,
      },
    })
    if (error) {
      console.log(error)
      alert('Something went awry')
      return
    }
    alert('Check your email for the login link!')
  } catch (error) {
    alert(error.error_description || error.message)
  } finally {
    loading.value = false
  }
}

const signInWithOAuth = async () => {
  console.log('sign in with GitHub')
  console.log('baseUrl: ' + config.public.baseUrl)
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${config.public.baseUrl}/confirm`,
    },
  })
  if (error) console.log(error)
}

const signOut = async () => {
  console.log('sign out')
  const { error } = await supabase.auth.signOut()
  if (error) console.log(error)
}
</script>
