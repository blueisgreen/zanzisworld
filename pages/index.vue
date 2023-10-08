<script setup>
const user = useSupabaseUser()
</script>

<template>
  <div>
    <ZanziHero />
    <SupaTestPattern />
    <AccountAvatar />
  </div>
</template>
