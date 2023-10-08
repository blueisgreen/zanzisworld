<script setup>
const user = useSupabaseUser()
</script>

<template>
  <div class="container" style="padding: 50px 0 100px 0">
    <Account v-if="user" />
    <SupaAuth v-else />
  </div>
</template>
