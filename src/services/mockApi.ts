import { properties } from '@/data/properties'
import type { Property, UpdatePropertyInput, CreatePropertyInput } from '@/models/Property'

const getAllProperties = (): Promise<Property[]> => {
  return new Promise((resolve) => {
    resolve(properties)
  })
}

const getProperty = (id: number): Promise<Property | null> => {
  return new Promise((resolve) => {
    const property = properties.find((p) => p.id === id)
    resolve(property ? { ...property } : null) // Return a copy to avoid mutation
  })
}

const addProperty = (property: CreatePropertyInput): Promise<Property> => {
  return new Promise((resolve) => {
    const newProperty: Property = {
      ...property,
      id: properties.length + 1, // Simple ID generation
      isDeleted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    resolve(newProperty)
  })
}

const updateProperty = (id: number, newProperty: UpdatePropertyInput): Promise<Property> => {
  return new Promise((resolve) => {
    // Just returning the updated property for simplicity
    // In a real application, you would update the property in the database or state management
    const oldProperty = properties.find((p) => p.id === id)

    if (!oldProperty) {
      throw new Error('Error updating property')
    }

    resolve({ ...oldProperty, ...newProperty } as Property)
  })
}

const deleteProperty = (id: number): Promise<void> => {
  return new Promise((resolve) => {
    const index = properties.findIndex((p) => p.id === id)
    if (index !== -1) {
      properties[index].isDeleted = true
    }
    resolve()
  })
}

const searchAllProperties = (query: string): Promise<Property[]> => {
  return new Promise((resolve) => {
    const results = properties.filter(
      (property) =>
        property.name.toLowerCase().includes(query.toLowerCase()) ||
        property.address.toLowerCase().includes(query.toLowerCase()) ||
        property.description.toLowerCase().includes(query.toLowerCase()),
    )
    resolve(results)
  })
}

export {
  getAllProperties,
  getProperty,
  updateProperty,
  addProperty,
  deleteProperty,
  searchAllProperties,
}
