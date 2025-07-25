<script setup lang="ts">

const props = defineProps<{
  currentPage: number
  totalPages: number
}>()

const emit = defineEmits<{
  (event: 'update-pagination', page: number): void
}>()

function goToPage(newPage: number) {
  if (newPage < 1 || newPage > props.totalPages) {
    return
  }
  emit('update-pagination', newPage)
}
</script>
<template>
  <nav class="flex justify-center items-center space-x-2 mt-6">
    <!-- Previous Button -->
    <button
      class="px-3 py-1 text-sm rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 shadow-sm"
      :disabled="currentPage === 1" @click="goToPage(currentPage - 1)">
      Previous
    </button>

    <!-- Page Numbers -->
    <template v-for="page in totalPages" :key="page">
      <button class="px-3 py-1 text-sm rounded border shadow-sm" :class="[
        currentPage === page
          ? 'bg-primary text-white border-primary'
          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
      ]" @click="goToPage(page)">
        {{ page }}
      </button>
    </template>

    <!-- Next Button -->
    <button
      class="px-3 py-1 text-sm rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 shadow-sm"
      :disabled="currentPage === totalPages" @click="goToPage(currentPage + 1)">
      Next
    </button>
  </nav>
</template>