<script setup lang="ts">
import { onMounted, ref } from 'vue'
import PropertyList from '@/components/property/PropertyList.vue'
import { usePropertyStore } from '@/stores/property'
import { useRoute } from 'vue-router'
import type { Property } from '@/models/Property'

const propertyStore = usePropertyStore()
const route = useRoute()

const searchQuery = route.query.query as string || ''
const isSearching = ref(true)
const properties = ref<Property[]>([])

onMounted(async () => {
  if (searchQuery) {
    isSearching.value = true
    properties.value = await propertyStore.searchProperties(searchQuery)
    isSearching.value = false
  }
})
</script>
<template>
  <div class="container mx-auto">
    <PropertyList :properties="properties">
      <template #header>
        <h1 class="font-light text-gray-800 text-4xl">Search result for: {{ searchQuery }}</h1>
      </template>
    </PropertyList>
    <span v-if="!isSearching && properties.length === 0" class="text-center block text-3xl mt-6 font-light">
      Sorry, we can't find anything.
    </span>
  </div>
</template>