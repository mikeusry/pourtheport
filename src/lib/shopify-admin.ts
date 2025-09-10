/**
 * Shopify Admin API Client for Pour the PORT
 * 
 * This module provides server-side utilities for interacting with Shopify's Admin API
 * for order processing, inventory management, and customer data operations.
 * 
 * SECURITY NOTE: These functions should only be used server-side or in API routes.
 * Never expose Admin API tokens in client-side code.
 */

// Environment variables - Admin API credentials (server-side only)
const STORE_DOMAIN = import.meta.env.PUBLIC_SHOPIFY_STORE_DOMAIN;
const ADMIN_ACCESS_TOKEN = import.meta.env.SHOPIFY_ADMIN_ACCESS_TOKEN;
const API_VERSION = import.meta.env.SHOPIFY_ADMIN_API_VERSION || '2024-10';

// Validate configuration
if (!STORE_DOMAIN || !ADMIN_ACCESS_TOKEN) {
  console.warn('Shopify Admin API not configured. Check SHOPIFY_ADMIN_ACCESS_TOKEN in .env');
}

// Base URL and headers for Admin API requests
const BASE_URL = `https://${STORE_DOMAIN}/admin/api/${API_VERSION}`;
const HEADERS = {
  'Content-Type': 'application/json',
  'X-Shopify-Access-Token': ADMIN_ACCESS_TOKEN || '',
};

// TypeScript interfaces for Admin API data
export interface ShopifyOrder {
  id: number;
  order_number: number;
  name: string;
  email: string;
  total_price: string;
  currency: string;
  financial_status: string;
  fulfillment_status: string | null;
  created_at: string;
  updated_at: string;
  customer: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
  } | null;
  line_items: Array<{
    id: number;
    title: string;
    quantity: number;
    price: string;
    product_id: number;
    variant_id: number;
  }>;
}

export interface ShopInfo {
  id: number;
  name: string;
  domain: string;
  email: string;
  currency: string;
  timezone: string;
  plan_name: string;
  created_at: string;
}

export interface ShopifyCustomer {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  created_at: string;
  updated_at: string;
  orders_count: number;
  total_spent: string;
}

// Utility function for making Admin API requests
async function makeAdminRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  if (!ADMIN_ACCESS_TOKEN) {
    throw new Error('Admin API token not configured');
  }

  const url = `${BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    headers: HEADERS,
    ...options,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Admin API Error ${response.status}: ${errorText}`);
  }

  return response.json();
}

// Admin API Functions

/**
 * Get shop information
 */
export async function getShopInfo(): Promise<ShopInfo | null> {
  try {
    const data = await makeAdminRequest<{ shop: ShopInfo }>('/shop.json');
    return data.shop;
  } catch (error) {
    console.error('Error fetching shop info:', error);
    return null;
  }
}

/**
 * Get recent orders
 */
export async function getRecentOrders(limit: number = 10): Promise<ShopifyOrder[]> {
  try {
    const data = await makeAdminRequest<{ orders: ShopifyOrder[] }>(
      `/orders.json?limit=${limit}&status=any&fields=id,order_number,name,email,total_price,currency,financial_status,fulfillment_status,created_at,customer,line_items`
    );
    return data.orders;
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
}

/**
 * Get order by ID
 */
export async function getOrderById(orderId: number): Promise<ShopifyOrder | null> {
  try {
    const data = await makeAdminRequest<{ order: ShopifyOrder }>(`/orders/${orderId}.json`);
    return data.order;
  } catch (error) {
    console.error(`Error fetching order ${orderId}:`, error);
    return null;
  }
}

/**
 * Get customer by ID
 */
export async function getCustomerById(customerId: number): Promise<ShopifyCustomer | null> {
  try {
    const data = await makeAdminRequest<{ customer: ShopifyCustomer }>(`/customers/${customerId}.json`);
    return data.customer;
  } catch (error) {
    console.error(`Error fetching customer ${customerId}:`, error);
    return null;
  }
}

/**
 * Search customers by email
 */
export async function searchCustomers(email: string): Promise<ShopifyCustomer[]> {
  try {
    const data = await makeAdminRequest<{ customers: ShopifyCustomer[] }>
      (`/customers/search.json?query=email:${encodeURIComponent(email)}`);
    return data.customers;
  } catch (error) {
    console.error(`Error searching customers with email ${email}:`, error);
    return [];
  }
}

/**
 * Update order fulfillment status (for order processing)
 */
export async function fulfillOrder(orderId: number, lineItems: Array<{ id: number; quantity: number }>) {
  try {
    const fulfillmentData = {
      fulfillment: {
        location_id: null, // Use default location
        tracking_number: null,
        notify_customer: true,
        line_items: lineItems
      }
    };

    const data = await makeAdminRequest(`/orders/${orderId}/fulfillments.json`, {
      method: 'POST',
      body: JSON.stringify(fulfillmentData),
    });

    return data;
  } catch (error) {
    console.error(`Error fulfilling order ${orderId}:`, error);
    throw error;
  }
}

/**
 * Add tags to a customer (for segmentation)
 */
export async function addCustomerTags(customerId: number, tags: string[]): Promise<boolean> {
  try {
    const customer = await getCustomerById(customerId);
    if (!customer) return false;

    const existingTags = customer.tags ? customer.tags.split(', ') : [];
    const newTags = [...new Set([...existingTags, ...tags])];

    const updateData = {
      customer: {
        id: customerId,
        tags: newTags.join(', ')
      }
    };

    await makeAdminRequest(`/customers/${customerId}.json`, {
      method: 'PUT',
      body: JSON.stringify(updateData),
    });

    return true;
  } catch (error) {
    console.error(`Error adding tags to customer ${customerId}:`, error);
    return false;
  }
}

// Utility functions

/**
 * Check if Admin API is configured
 */
export function isAdminApiConfigured(): boolean {
  return Boolean(STORE_DOMAIN && ADMIN_ACCESS_TOKEN);
}

/**
 * Format order for display
 */
export function formatOrderSummary(order: ShopifyOrder): string {
  const customerName = order.customer 
    ? `${order.customer.first_name} ${order.customer.last_name}`
    : 'Guest';
  
  return `Order #${order.order_number} - ${customerName} - $${order.total_price} - ${order.financial_status}`;
}

/**
 * Get orders for Pour the PORT product specifically
 */
export async function getPourThePortOrders(): Promise<ShopifyOrder[]> {
  try {
    const orders = await getRecentOrders(50); // Get more orders to filter
    
    // Filter orders that contain Pour the PORT products
    const pourThePortOrders = orders.filter(order => 
      order.line_items.some(item => 
        item.title.toLowerCase().includes('pour the port') ||
        item.title.toLowerCase().includes('septic tank treatment')
      )
    );
    
    return pourThePortOrders;
  } catch (error) {
    console.error('Error fetching Pour the PORT orders:', error);
    return [];
  }
}

// Export configuration for debugging
export const adminConfig = {
  storeDomain: STORE_DOMAIN,
  hasAdminToken: Boolean(ADMIN_ACCESS_TOKEN),
  apiVersion: API_VERSION,
  isConfigured: isAdminApiConfigured(),
};