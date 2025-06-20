import type { ApiResponse, DetailedVehicleResponse } from '$lib/types/vehicle';

/**
 * Search for vehicles based on a query string
 * @param query The search query
 * @param offset Pagination offset
 * @param max Maximum number of results
 * @returns Promise with the search results
 */
export async function searchVehicles(query: string, offset = 0, max = 20): Promise<ApiResponse> {
	try {
		const response = await fetch(
			`http://localhost:5276/api/vehicles/initial-search?query=${encodeURIComponent(query)}&offset=${offset}&max=${max}`,
			{
				headers: {
					accept: 'text/plain'
				}
			}
		);

		if (!response.ok) {
			throw new Error(`API request failed with status ${response.status}`);
		}

		const data = await response.json();

		// Fix pagination URLs to point to our own API instead of external ones
		if (data.isSuccess && data.data?.meta?.pagination) {
			const pagination = data.data.meta.pagination;

			// Fix currentUrl
			pagination.currentUrl = `http://localhost:5276/api/vehicles/initial-search?query=${encodeURIComponent(query)}&offset=${offset}&max=${max}`;

			// Fix nextUrl
			if (pagination.nextUrl && offset + max < pagination.total) {
				pagination.nextUrl = `http://localhost:5276/api/vehicles/initial-search?query=${encodeURIComponent(query)}&offset=${offset + max}&max=${max}`;
			} else {
				pagination.nextUrl = null;
			}

			// Fix previousUrl
			if (offset > 0) {
				pagination.previousUrl = `http://localhost:5276/api/vehicles/initial-search?query=${encodeURIComponent(query)}&offset=${Math.max(0, offset - max)}&max=${max}`;
			} else {
				pagination.previousUrl = null;
			}
		}

		return data;
	} catch (error) {
		console.error('Error fetching vehicle data:', error);
		throw error;
	}
}

/**
 * Get vehicle details by ID
 * @param id The vehicle ID
 * @returns Promise with the vehicle details
 */
export async function getVehicleById(id: string): Promise<any> {
	try {
		const response = await fetch(`http://localhost:5276/api/vehicles/${id}`, {
			headers: {
				accept: 'text/plain'
			}
		});

		if (!response.ok) {
			throw new Error(`API request failed with status ${response.status}`);
		}

		return await response.json();
	} catch (error) {
		console.error('Error fetching vehicle details:', error);
		throw error;
	}
}

/**
 * Get detailed vehicle information by Year, Make, Model, Trim, and Series
 * @param modelYear The vehicle model year
 * @param make The vehicle make
 * @param model The vehicle model
 * @param trim The vehicle trim (optional)
 * @param series The vehicle series (optional)
 * @returns Promise with the vehicle details
 */
export async function getVehicleByYMMT(
	modelYear: number,
	make: string,
	model: string,
	trim?: string,
	series?: string
): Promise<DetailedVehicleResponse> {
	try {
		// Build the URL with optional parameters
		let url = `http://localhost:5276/api/vehicles/ymmt?modelYear=${modelYear}&make=${encodeURIComponent(make)}&model=${encodeURIComponent(model)}`;

		if (trim) {
			url += `&trim=${encodeURIComponent(trim)}`;
		}

		if (series) {
			url += `&series=${encodeURIComponent(series)}`;
		}

		const response = await fetch(url, {
			headers: {
				accept: 'text/plain'
			}
		});

		if (!response.ok) {
			throw new Error(`API request failed with status ${response.status}`);
		}

		return await response.json();
	} catch (error) {
		console.error('Error fetching vehicle details:', error);
		throw error;
	}
}
