import { Customer } from "../types/customerType";
import { SERVER_BASE_URL } from "../utils/constant";

export const fetchCustomers = async (): Promise<Customer[]> => {
  try {
    const response = await fetch(`${SERVER_BASE_URL}/customers`);
    if (!response.ok) {
      throw new Error(`Failed to fetch customers: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};
