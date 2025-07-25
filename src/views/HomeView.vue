<script setup lang="ts">
import { onMounted, } from 'vue'
import PropertyList from '@/components/property/PropertyList.vue'
import { usePropertyStore } from '@/stores/property'

const propertyStore = usePropertyStore()

onMounted(async () => {
  await propertyStore.fetchAllProperties()
})
</script>

<template>
  <div class="container mx-auto">
    <PropertyList :properties="propertyStore.properties">
      <template #header>
        <h1 class="font-light text-gray-800 text-4xl">Your properties</h1>
      </template>
    </PropertyList>
  </div>
</template>

<style lang="scss"></style>
