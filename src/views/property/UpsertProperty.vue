<script setup lang="ts">
import { reactive, onMounted, onBeforeUnmount, computed, ref } from 'vue';
import { defaultProperty } from '@/data/properties';
import type { Property } from '@/models/Property'
import { useRoute, useRouter } from 'vue-router'
import { usePropertyStore } from '@/stores/property'
import { useVuelidate } from '@vuelidate/core'
import { required, numeric } from "@vuelidate/validators"
import { Image, Trash2 } from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const propertyStore = usePropertyStore()

const isEditMode = computed(() => !!route.params.propertyId)
const propertyId = parseFloat(route.params.propertyId as string)

onMounted(async () => {
  if (!isEditMode.value) {
    return
  }
  await propertyStore.fetchCurrentProperty(propertyId)
  Object.assign(propertyForm, { ...propertyStore.currentProperty } as Property)
})

onBeforeUnmount(() => {
  propertyStore.clearCurrentProperty()
})

const propertyForm = reactive<Property>({ ...defaultProperty })
const hasImageError = ref(false)
const rules = {
  name: { required },
  address: { required },
  price: { required, numeric },
  description: { required },
  status: { required }
}
const v$ = useVuelidate(rules, propertyForm);

const getFormState = (property: string): boolean => {
  if (!v$.value[property]) return true
  return v$.value[property].$dirty && v$.value[property].$invalid;
}

const getFormError = (property: string): string => {
  if (v$.value[property].required.$invalid) return 'This field is required'
  if (v$.value[property].numeric.$invalid) return 'This field is must be a number'
  return ''
}

const handleFileChange = (event: Event) => {
  const file = (event.target as HTMLInputElement)?.files?.[0]
  if (file) {
    propertyForm.image = URL.createObjectURL(file)
    hasImageError.value = false
  }
}

const upsertProperty = async () => {
  // Form validation
  v$.value.$touch();
  if (v$.value.$invalid) {
    return
  }

  if (!propertyForm.image) {
    hasImageError.value = true
    return
  }

  // If in edit mode, update the property; otherwise, create a new one
  if (isEditMode.value) {
    await propertyStore.updateCurrentProperty(propertyId, propertyForm)
    router.push(`/property/${propertyId}`)
  } else {
    const newProperty = await propertyStore.addNewProperty(propertyForm);
    if (newProperty) {
      router.push(`/property/${newProperty.id}`)
    }
  }
}
</script>

<template>
  <div class="max-w-5xl mx-auto p-4 ">
    <div v-if="propertyStore.currentProperty || !isEditMode" class="flex flex-wrap flex-col md:flex-row md:flex-nowrap">
      <h2 class="font-light text-2xl mb-4 md:hidden">{{ isEditMode ? 'Edit' : 'Add a new' }} property</h2>
      <div class="md:basis-2/5 mb-4 flex flex-col items-center">
        <label v-if="!propertyForm.image" for="imageFileInput"
          class="my-4 md:mt-15 w-30 h-30 rounded-lg bg-gray-200 flex items-center justify-center flex-col text-center relative cursor-pointer">
          <Image class="w-9 h-9 text-gray-500 mb-3" />
          <span class="text-gray-500 text-xs">Select an image</span>
          <input id="imageFileInput" type="file" accept="image/*" class="hidden absolute inset-0"
            @change="handleFileChange" />
        </label>
        <div v-if="propertyForm.image" class="flex flex-col items-center">
          <img :src="propertyForm.image" alt="Property Image" class="w-full h-auto rounded-lg shadow-md" />
          <button class="mt-3 text-red-500 text-sm flex items-center cursor-pointer" @click="propertyForm.image = ''">
            <Trash2 class="h-4 w-4 inline mr-1" />
            <span>Remove Image</span>
          </button>
        </div>
        <span v-if="hasImageError" class="text-red-500 text-xs">Please select an image for the property</span>
      </div>

      <div class="md:basis-3/5 md:pl-6 w-full">
        <h2 class="font-light text-2xl mb-4 hidden md:block">{{ isEditMode ? 'Edit' : 'Add a new' }} property</h2>
        <div>
          <label for="name" class="form-label">
            Name
            <span class="text-red-500">*</span>
          </label>
          <input v-model="v$.name.$model" type="text" id="name" name="name" class="w-full form-input"
            placeholder="Enter the property name" />
          <span v-if="getFormState('name')" class="text-xs text-red-500">{{ getFormError('name') }}</span>
        </div>
        <div class="mt-4">
          <label for="address" class="form-label">
            Address
            <span class="text-red-500">*</span>
          </label>
          <input v-model="v$.address.$model" type="text" id="address" name="address" class="w-full form-input"
            placeholder="Enter the property address" />
          <span v-if="getFormState('address')" class="text-xs text-red-500">{{ getFormError('address') }}</span>
        </div>
        <div class="mt-4">
          <label for="price" class="form-label">
            Price
            <span class="text-red-500">*</span>
          </label>
          <div
            class="flex items-center rounded-md border border-gray-300 shadow-sm focus-within:ring-1 focus-within:ring-blue-500">
            <span class="px-3 text-gray-500 border-r border-gray-300">$</span>
            <input v-model="v$.price.$model" type="number" id="price" name="price"
              class="w-full flex-1 px-3 py-2 focus:outline-none rounded-r-md" placeholder="Enter the property price" />
          </div>
          <span v-if="getFormState('price')" class="text-xs text-red-500">{{ getFormError('price') }}</span>
        </div>
        <div class="mt-4">
          <label for="status" class="form-label">
            Status
            <span class="text-red-500">*</span>
          </label>
          <select v-model="v$.status.$model" class="form-select w-full">
            <option value="Available">Available</option>
            <option value="Sold">Sold</option>
            <option value="Under Contract">Under Contract</option>
          </select>
        </div>
        <div class="mt-4">
          <label for="description" class="form-label">
            Description
            <span class="text-red-500">*</span>
          </label>
          <textarea v-model="v$.description.$model" type="text" id="description" name="description"
            class="w-full form-input" placeholder="Enter the property description" rows="7" />
          <span v-if="getFormState('description')" class="text-xs text-red-500">{{ getFormError('description') }}</span>
        </div>
        <button class="mt-2 primary-button block" @click="upsertProperty()">Save Property</button>
      </div>
    </div>
  </div>
</template>