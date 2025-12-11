const API_URL = 'http://localhost:3000';

export async function searchDishes(params) {
  try {
    const queryParams = new URLSearchParams({
      name: params.name,
      minPrice: params.minPrice,
      maxPrice: params.maxPrice
    });

    const response = await fetch(`${API_URL}/search/dishes?${queryParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to search dishes');
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message || 'Network error. Make sure the backend server is running on http://localhost:3000');
  }
}
