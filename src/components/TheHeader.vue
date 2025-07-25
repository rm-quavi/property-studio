<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Search } from 'lucide-vue-next'

const router = useRouter()
const searchQuery = ref('')

const handleSearch = () => {
  if (searchQuery.value.trim() === '') {
    return
  }
  router.push({ name: 'search-property', query: { query: searchQuery.value } })
  searchQuery.value = ''
}
</script>

<template>
  <header class="p-3 shadow-md bg-white flex items-center">
    <RouterLink to="/" class="font-light flex items-center">
      <img alt="Vue logo" class="logo" src="@/assets/PS_LOGO.png" width="30" height="30" />
      <span class="hidden md:block ml-4">Property Studio</span>
    </RouterLink>
    <div class="flex grow"></div>
    <div
      class="mr-3 w-48 md:w-56 flex items-center rounded-lg border border-gray-300 focus-within:ring-1 focus-within:ring-primary">
      <input v-model="searchQuery" type="text" class="w-full flex-1 px-3 py-2 focus:outline-none rounded-r-md text-sm"
        placeholder="Search property.." @keyup.enter="handleSearch()" />
      <Search class="h-4 w-4 mr-3 cursor-pointer" @click="handleSearch()" />
    </div>
    <!-- <div class="h-[36px] w-[36px] p-2 mr-3 flex md:hidden rounded-lg border border-gray-300">
      <RouterLink to="/property/search">
        <Search class="h-4 w-4 cursor-pointer" />
      </RouterLink>
    </div> -->
    <RouterLink to="/property/add" class="primary-button md:mr-3">Add new property</RouterLink>
  </header>
</template>