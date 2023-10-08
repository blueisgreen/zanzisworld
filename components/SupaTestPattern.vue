<script setup>
import { ref, onMounted } from 'vue'
const supabase = useSupabaseClient()
const countries = ref([])

async function getCountries() {
  const { data } = await supabase.from('countries').select()
  countries.value = data
}

onMounted(() => {
  getCountries()
})
</script>

<template>
  <div class="section-title">Supabase Test Pattern</div>
  <ul>
    <li v-for="country in countries" :key="country.id">{{ country.name }}</li>
  </ul>
</template>

<style scoped>
.section-title {
  margin-top: 1.5rem;
  font-size: x-large;
  color: purple;
}
</style>
