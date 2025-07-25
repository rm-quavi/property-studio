import { ref } from 'vue'
import { defineStore } from 'pinia'
import {
  getAllProperties,
  getProperty,
  updateProperty,
  addProperty,
  deleteProperty,
  searchAllProperties,
} from '@/services/mockApi'
import type { CreatePropertyInput, Property, UpdatePropertyInput } from '@/models/Property'

export const usePropertyStore = defineStore('property', () => {
  const properties = ref<Property[]>([])
  const currentProperty = ref<Property | null>(null)
  const loading = ref(false)

  const fetchAllProperties = async () => {
    if (properties.value.length > 0) {
      return // If properties are already loaded, skip fetching
    }

    loading.value = true
    try {
      const propertiesRes: Property[] = await getAllProperties()
      if (!propertiesRes) {
        throw new Error('Error fetching properties')
      }
      properties.value = propertiesRes
    } catch (error) {
      console.error('Failed to fetch properties:', error)
    } finally {
      loading.value = false
    }
  }

  const fetchCurrentProperty = async (id: number) => {
    loading.value = true
    try {
      const property: Property | null = await getProperty(id)
      if (!property) {
        throw new Error('Error fetching properties')
      }
      currentProperty.value = property
    } catch (error) {
      console.error('Failed to fetch properties:', error)
    } finally {
      loading.value = false
    }
  }

  const searchProperties = async (query: string) => {
    loading.value = true
    try {
      const propertiesRes: Property[] = await searchAllProperties(query)
      if (!propertiesRes) {
        throw new Error('Error fetching properties')
      }
      return propertiesRes
    } catch (error) {
      console.error('Failed to search properties:', error)
    } finally {
      loading.value = false
    }
  }

  const addNewProperty = async (property: CreatePropertyInput) => {
    loading.value = true
    try {
      const newProperty: Property = await addProperty(property)
      if (!newProperty) {
        throw new Error('Error adding property')
      }
      properties.value.push(newProperty) // Add the new property to the store
      return newProperty // Return the newly added property
    } catch (error) {
      console.error('Failed to add property:', error)
    } finally {
      loading.value = false
    }
  }

  const updateCurrentProperty = async (id: number, property: UpdatePropertyInput) => {
    loading.value = true
    try {
      const updatedProperty: Property = await updateProperty(id, property)
      if (!updatedProperty) {
        throw new Error('Error updating property')
      }

      // Make sure the properties are fetched
      await fetchAllProperties() // Refresh the properties list
      const index = properties.value.findIndex((p) => p.id === id)

      if (index !== -1) {
        properties.value[index] = updatedProperty
      } else {
        throw new Error('Property not found in the store')
      }
    } catch (error) {
      console.error('Failed to update property:', error)
    } finally {
      loading.value = false
    }
  }

  const removeProperty = async (id: number) => {
    loading.value = true
    try {
      await deleteProperty(id)

      // Make sure the properties are fetched
      await fetchAllProperties() // Refresh the properties list

      const index = properties.value.findIndex((p) => p.id === id)
      if (index !== -1) {
        properties.value[index].isDeleted = true // Mark as deleted instead of removing
      } else {
        throw new Error('Property not found in the store')
      }
    } catch (error) {
      console.error('Failed to delete property:', error)
    } finally {
      loading.value = false
    }
  }

  const clearCurrentProperty = () => {
    currentProperty.value = null
  }

  return {
    // states
    properties,
    currentProperty,
    loading,

    // actions
    fetchAllProperties,
    searchProperties,
    updateCurrentProperty,
    addNewProperty,
    removeProperty,
    fetchCurrentProperty,
    clearCurrentProperty,
  }
})
