<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  items: []
}>()

const isOpen = ref(false)

const emit = defineEmits<{
  (event: 'item-select', item: string): void
}>()

const handleItemClick = (item: string) => {
  emit('item-select', item)
  isOpen.value = false
}

</script>
<template>
  <div class="relative">
    <button class="flex items-center text-sm border border-primary text-primary rounded-md px-3 py-2 hover:bg-gray-100"
      @click="isOpen = !isOpen">
      <slot name='button-content'></slot>
    </button>
    <div v-if="isOpen" class="absolute right-0 top-0 mt-10 z-10">
      <ul class="mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
        <li v-for="(item, index) in props.items" :key="index"
          class="px-4 py-2 hover:bg-gray-100 cursor-pointer font-light" @click="handleItemClick(item)">{{ item }}</li>
      </ul>
    </div>
  </div>
</template>