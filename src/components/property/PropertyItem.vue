<script setup lang="ts">
import type { Property } from '@/models/Property'
import { formatPrice } from '@/helpers/Utils'
import { getStatusTextColor } from '@/components/property/propertyHelper'

const props = defineProps<{
  property: Property
}>()

</script>

<template>
  <RouterLink class="bg-white shadow-md rounded-xl overflow-hidden flex flex-col" :to="`/property/${props.property.id}`">
    <div class="relative">
      <img class="aspect-3/2" :src="props.property.image" alt="Property Image" />
      <div class="px-3 py-1 text-xs bg-white/80 absolute top-2 right-2 rounded-full flex">
        <span :class="['text-3xl leading-4 h-0 mr-1', getStatusTextColor(props.property.status)]">•</span>
        <span>{{ props.property.status }}</span>
      </div>
    </div>
    <div class="p-4 py-2 flex flex-col grow">
      <h3 class="font-bold text-gray-800 text-sm">{{ props.property.name }}</h3>
      <p class="text-xs text-gray-800">{{ props.property.address }}</p>
      <div class="grow"></div>
      <span class="block mt-1 text-lg font-bold text-primary">{{ formatPrice(props.property.price) }}</span>
    </div>
  </RouterLink>
</template>