import { Customer } from "../types/customerType";
import { getApiUrl } from "../utils/constant";

export const fetchCustomers = async (): Promise<Customer[]> => {
  try {
    const response = await fetch(getApiUrl("customers"));
    if (!response.ok) {
      throw new Error(`Failed to fetch customers: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};
