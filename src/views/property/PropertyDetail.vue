<script setup lang="ts">
import { onMounted, onBeforeUnmount, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import { usePropertyStore } from '@/stores/property'
import { Pencil, Trash2 } from 'lucide-vue-next'
import { getStatusTextColor } from '@/components/property/propertyHelper'
import { storeToRefs } from 'pinia'
import { formatPrice } from '@/helpers/Utils'

const route = useRoute()
const router = useRouter()
const propertyStore = usePropertyStore()

const propertyId = parseFloat(route.params.propertyId as string)

const { currentProperty: property } = storeToRefs(propertyStore)

onMounted(() => {
  propertyStore.fetchCurrentProperty(propertyId)
})

onBeforeUnmount(() => {
  propertyStore.clearCurrentProperty()
})

const deleteProperty = async () => {
  await propertyStore.removeProperty(propertyId)
  // Redirect to the properties home page after deletion
  router.push('/')
}

</script>

<template>
  <div class="property-detail">
    <div v-if="property" class="p-4 max-w-5xl mx-auto container flex flex-wrap md:flex-nowrap">
      <div class="md:basis-2/5">
        <img :src="property.image" alt="Property Image" class="w-full h-auto rounded-lg shadow-md" />
      </div>
      <div class="md:basis-3/5 mt-4 md:mt-0 md:px-6">
        <div class="flex content-center items-center">
          <h2 class="text-2xl font-bold inline-block">{{ property.name }}</h2>
          <div class="ml-4 px-3 bg-white rounded-xl flex border border-gray-300">
            <span :class="['text-3xl leading-5 h-0 mr-1', getStatusTextColor(property.status)]">•</span>
            <span class="text-sm">{{ property.status }}</span>
          </div>
        </div>
        <p class="text-gray-600 text-sm">{{ property.address }}</p>
        <p class="text-2xl font-bold mt-1 text-primary mb-4">{{ formatPrice(property.price) }}</p>
        <p>{{ property.description }}</p>

        <div class="mt-4">
          <RouterLink class="rounded border py-1 px-3 inline-block border-blue-500 text-blue-500"
            :to="`/property/${property.id}/edit`">
            <Pencil class="inline h-4 w-4 mr-2" />
            <span class="text-sm">Edit</span>
          </RouterLink>
          <button class="rounded border py-1 px-3 mt-2 ml-4 inline-block border-red-400 text-red-400 cursor-pointer"
            @click="deleteProperty()">
            <Trash2 class="inline h-4 w-4 mr-2" />
            <span class="text-sm">Delete</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>