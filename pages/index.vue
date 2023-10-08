<template>
  <div>
    <ZanziHero />
    <SupaTestPattern />
    <AccountAvatar />
  </div>
</template>

<script setup>
const user = useSupabaseUser()
const config = useRuntimeConfig()
console.log('baseUrl: ' + config.public.baseUrl)
</script>
