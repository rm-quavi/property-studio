import { render, screen } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import PropertyItem from '../components/property/PropertyItem.vue'
import { createMemoryHistory, createRouter } from 'vue-router'
import type { Property } from '@/types/property'

const mockProperty: Property = {
  id: 99,
  name: 'Sunny Villa',
  address: '123 Main St, New York, NY',
  price: 500000,
  status: 'Available',
  image: 'https://example.com/image.jpg',
  description:
    'Luxurious 3-bedroom penthouse overlooking the San Francisco Bay. The unit features a state-of-the-art kitchen, floor-to-ceiling windows, and a rooftop terrace with 360-degree views. Smart home technology and premium finishes define every corner. Walkable to tech hubs, cafes, and waterfront parks.',
  isDeleted: false,
  createdAt: '2024-06-10T12:00:00Z',
  updatedAt: '2024-06-30T19:45:00Z',
}

// Define dummy route to avoid errors with <RouterLink>
const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    {
      path: '/property/:id',
      name: 'property-detail',
      component: { template: '<div>Property Page</div>' },
    },
  ],
})

describe('PropertyItem.vue', () => {
  it('renders property details correctly', async () => {
    const { getByRole, getByText, getByAltText } = render(PropertyItem, {
      props: { property: mockProperty },
      global: { plugins: [router] },
    })

    // Check property details rendering
    getByRole('heading', { name: /sunny villa/i })
    getByText('123 Main St, New York, NY')

    // Check if price is formatted correctly
    getByText('$500,000')

    // Check image rendering
    const img = getByAltText('Property Image') as HTMLImageElement
    expect(img.src).toBe('https://example.com/image.jpg')
  })
})
