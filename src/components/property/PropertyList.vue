<script setup lang="ts">
import { computed, ref } from 'vue'
import { Funnel } from 'lucide-vue-next'
import DropdownButton from '@/components/shared/DropdownButton.vue'
import type { Property } from '@/models/Property'
import PropertyItem from './PropertyItem.vue'
import PaginationComponent from '@/components/shared/PaginationComponent.vue'


const props = defineProps<{
  properties: Property[]
}>()

// Filtering logic
const filterOptions = ['All', 'Available', 'Sold', 'Under Contract']
const propertyFilter = ref('All')

const handleFilterSelect = (selectedFilter: string) => {
  propertyFilter.value = selectedFilter
  currentPage.value = 1
}

const filteredProperties = computed(() => {
  return props.properties.filter(property => {
    if (property.isDeleted) return false
    if (propertyFilter.value === 'All') return true
    return property.status === propertyFilter.value
  })
})

// Sorting logic
const sortOptions = ['None', 'Price: Low to High', 'Price: High to Low']
const sortOrder = ref('None')

const handleSortSelect = (selectedSort: string) => {
  sortOrder.value = selectedSort
  currentPage.value = 1
}

const sortedProperties = computed(() => {
  if (sortOrder.value === 'Price: Low to High') {
    return [...filteredProperties.value].sort((a, b) => a.price - b.price)
  } else if (sortOrder.value === 'Price: High to Low') {
    return [...filteredProperties.value].sort((a, b) => b.price - a.price)
  }
  return filteredProperties.value
})

// Pagination logic
const currentPage = ref(1)
const itemsPerPage = 10
const totalPages = computed(() => Math.ceil(sortedProperties.value.length / itemsPerPage))

const paginatedProperties = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return sortedProperties.value.slice(start, start + itemsPerPage)
})

const handlePaginationUpdate = (page: number) => {
  currentPage.value = page
}
</script>
<template>
  <div>
    <div class="px-4 pt-4 my-2 items-center flex">
      <slot name="header"></slot>
      <div class="grow"></div>
      <div class="flex flex-col items-end md:flex-row">
        <!-- Filter dropdown button -->
        <DropdownButton :items="filterOptions" @item-select="handleFilterSelect" class="md:mr-4 mb-3 md:mb-0">
          <template #button-content>
            <Funnel class="h-4 w-4 mr-2" />
            <span>Filter by status</span>
          </template>
        </DropdownButton>

        <!-- Sort dropdown button -->
        <DropdownButton :items="sortOptions" @item-select="handleSortSelect">
          <template #button-content>
            <Funnel class="h-4 w-4 mr-2" />
            <span>Sort</span>
          </template>
        </DropdownButton>
      </div>
    </div>
    <!-- Property items list -->
    <div class="property-list grid grid-cols-[repeat(auto-fill,_minmax(280px,_1fr))] justify-center gap-6 p-4">
      <PropertyItem v-for="property in paginatedProperties" :key="property.id" :property="property" />
    </div>
    <!-- Pagination -->
    <PaginationComponent v-if="sortedProperties.length > 10" class="my-6" :current-page="currentPage"
      :total-pages="totalPages" @update-pagination="handlePaginationUpdate" />
  </div>
</template>

<style lang="scss"></style>
