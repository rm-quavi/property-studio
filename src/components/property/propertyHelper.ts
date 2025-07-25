export const getStatusTextColor = (status: string) => {
  switch (status) {
    case 'Available':
      return 'text-green-700'
    case 'Sold':
      return 'text-orange-400'
    case 'Under Contract':
      return 'text-blue-800'
    default:
      return 'text-gray-800'
  }
}
