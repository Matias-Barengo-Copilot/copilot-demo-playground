/**
 * Café customers (personas in the café scene) — single data layer.
 *
 * Data source: mocks (mocks/cafe-customers.json). Replace with DB when ready:
 * - Add e.g. getCafeCustomersFromDb() and use it here instead of loadFromMock().
 * - Keep the same public API: getCafeCustomers() and CafeCustomer type.
 */

import cafeCustomersMock from "@/mocks/cafe-customers.json";

export type CafeCustomerPosition = {
  left: string;
  top: string;
};

export type CafeCustomer = {
  id: string;
  name: string;
  title: string;
  company: string;
  industry: string;
  aiUseCase: string;
  impact: string;
  position: CafeCustomerPosition;
  externalLink?: string;
};

function loadCafeCustomers(): CafeCustomer[] {
  return cafeCustomersMock as CafeCustomer[];
}

const customers = loadCafeCustomers();

export function getCafeCustomers(): CafeCustomer[] {
  return customers;
}
