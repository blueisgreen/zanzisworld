<template>
  <form class="row flex-center flex" @submit.prevent="handleLogin">
    <div class="col-6 form-widget">
      <h1 class="header">Supabase + Nuxt 3</h1>
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
      <button @click="signInWithOAuth">Sign In with GitHub</button>
      <button @click="signOut">Sign Out</button>
    </div>
  </form>
</template>

<script setup>
const supabase = useSupabaseClient()
const config = useRuntimeConfig()

const loading = ref(false)
const email = ref('')

const handleLogin = async () => {
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
  const { error } = await supabase.auth.signOut()
  if (error) console.log(error)
}
</script>
