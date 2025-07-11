import { Customer } from "../types/customerType";
import { SERVER_BASE_URL } from "../utils/constant";

export const fetchCustomers = async (): Promise<Customer[]> => {
  const response = await fetch(`${SERVER_BASE_URL}/customers`);
  return response.json();
};
