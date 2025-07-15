import { Customer } from "@/lib/types/customerType";

import { getApiUrl } from "@/lib/utils";

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
