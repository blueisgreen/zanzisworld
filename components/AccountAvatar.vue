<template>
  <div v-if="user">Account: {{ user.email }} ({{ user.id }})</div>
  <div v-else>
    <h3>Who are you?</h3>
    <button
      @click="
        () => {
          navigateTo('/login')
        }
      "
    >
      Sign In
    </button>
  </div>
</template>

<script setup>
const user = useSupabaseUser()
</script>

<style lang="scss" scoped></style>
