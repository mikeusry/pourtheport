/**
 * Shopify Storefront API Client for Pour the PORT
 * 
 * This module provides utilities for interacting with Shopify's Storefront API
 * to handle product data, cart functionality, and checkout processes.
 */

import { createStorefrontApiClient } from '@shopify/storefront-api-client';

// Environment variables validation
const STORE_DOMAIN = import.meta.env.PUBLIC_SHOPIFY_STORE_DOMAIN;
const STOREFRONT_ACCESS_TOKEN = import.meta.env.PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const PRODUCT_HANDLE = import.meta.env.PUBLIC_SHOPIFY_PRODUCT_HANDLE || 'pour-the-port-3-pack';
const PRODUCT_ID = import.meta.env.PUBLIC_SHOPIFY_PRODUCT_ID;

if (!STORE_DOMAIN || !STOREFRONT_ACCESS_TOKEN) {
  console.warn('Shopify configuration missing. Please check your environment variables.');
}

// Initialize Shopify Storefront API client
export const shopifyClient = STORE_DOMAIN && STOREFRONT_ACCESS_TOKEN 
  ? createStorefrontApiClient({
      storeDomain: `https://${STORE_DOMAIN}`,
      apiVersion: '2024-10',
      publicAccessToken: STOREFRONT_ACCESS_TOKEN,
    })
  : null;

// TypeScript interfaces for Shopify data
export interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: {
    nodes: Array<{
      id: string;
      url: string;
      altText: string | null;
      width: number;
      height: number;
    }>;
  };
  variants: {
    nodes: Array<{
      id: string;
      title: string;
      price: {
        amount: string;
        currencyCode: string;
      };
      availableForSale: boolean;
      quantityAvailable: number;
    }>;
  };
}

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    totalAmount: {
      amount: string;
      currencyCode: string;
    };
    subtotalAmount: {
      amount: string;
      currencyCode: string;
    };
  };
  lines: {
    nodes: Array<{
      id: string;
      quantity: number;
      merchandise: {
        id: string;
        title: string;
        product: {
          title: string;
          handle: string;
        };
        price: {
          amount: string;
          currencyCode: string;
        };
      };
    }>;
  };
}

// GraphQL Queries
const PRODUCT_BY_HANDLE_QUERY = `
  query getProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      handle
      title
      description
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 5) {
        nodes {
          id
          url
          altText
          width
          height
        }
      }
      variants(first: 10) {
        nodes {
          id
          title
          price {
            amount
            currencyCode
          }
          availableForSale
          quantityAvailable
        }
      }
    }
  }
`;

const CREATE_CART_MUTATION = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
        totalQuantity
        cost {
          totalAmount {
            amount
            currencyCode
          }
          subtotalAmount {
            amount
            currencyCode
          }
        }
        lines(first: 100) {
          nodes {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
                product {
                  title
                  handle
                }
                price {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const ADD_TO_CART_MUTATION = `
  mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        checkoutUrl
        totalQuantity
        cost {
          totalAmount {
            amount
            currencyCode
          }
          subtotalAmount {
            amount
            currencyCode
          }
        }
        lines(first: 100) {
          nodes {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
                product {
                  title
                  handle
                }
                price {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

// API Functions

/**
 * Fetch product data by handle
 */
export async function getProduct(handle: string = PRODUCT_HANDLE): Promise<ShopifyProduct | null> {
  if (!shopifyClient) {
    console.error('Shopify client not initialized');
    return null;
  }

  try {
    const response = await shopifyClient.request(PRODUCT_BY_HANDLE_QUERY, {
      variables: { handle }
    });

    if (response.data?.product) {
      console.log('Product loaded from Shopify:', response.data.product.title);
      return response.data.product as ShopifyProduct;
    }
    
    console.error('Product not found by handle:', handle);
    
    // Try to get product by ID if we have it
    if (PRODUCT_ID) {
      console.log('Trying to fetch product by ID:', PRODUCT_ID);
      return await getProductById(PRODUCT_ID);
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

/**
 * Fetch product data by ID
 */
export async function getProductById(id: string): Promise<ShopifyProduct | null> {
  if (!shopifyClient) {
    console.error('Shopify client not initialized');
    return null;
  }

  const PRODUCT_BY_ID_QUERY = `
    query getProductById($id: ID!) {
      product(id: $id) {
        id
        handle
        title
        description
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 5) {
          nodes {
            id
            url
            altText
            width
            height
          }
        }
        variants(first: 10) {
          nodes {
            id
            title
            price {
              amount
              currencyCode
            }
            availableForSale
            quantityAvailable
          }
        }
      }
    }
  `;

  try {
    const graphqlId = `gid://shopify/Product/${id}`;
    console.log('Fetching product with GraphQL ID:', graphqlId);
    
    const response = await shopifyClient.request(PRODUCT_BY_ID_QUERY, {
      variables: { id: graphqlId }
    });

    console.log('Shopify API response:', response);

    if (response.data?.product) {
      console.log('Product loaded by ID from Shopify:', response.data.product.title);
      console.log('Product handle:', response.data.product.handle);
      return response.data.product as ShopifyProduct;
    }
    
    console.error('Product not found by ID:', id);
    console.error('Full response:', response);
    return null;
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    console.error('Full error:', error);
    return null;
  }
}

/**
 * Create a new cart with initial line items
 */
export async function createCart(variantId: string, quantity: number = 1): Promise<ShopifyCart | null> {
  if (!shopifyClient) {
    console.error('Shopify client not initialized');
    return null;
  }

  console.log('Creating cart with:', { variantId, quantity });

  try {
    const cartInput = {
      lines: [
        {
          merchandiseId: variantId,
          quantity: quantity
        }
      ]
    };

    console.log('Cart input:', JSON.stringify(cartInput, null, 2));

    const response = await shopifyClient.request(CREATE_CART_MUTATION, {
      variables: { input: cartInput }
    });

    console.log('Full cart response:', JSON.stringify(response, null, 2));

    if (response.data?.cartCreate?.cart) {
      console.log('✅ Cart created successfully:', response.data.cartCreate.cart.id);
      return response.data.cartCreate.cart as ShopifyCart;
    }
    
    if (response.data?.cartCreate?.userErrors?.length > 0) {
      console.error('❌ Cart creation user errors:', response.data.cartCreate.userErrors);
      response.data.cartCreate.userErrors.forEach(error => {
        console.error(`  - [${error.code}] ${error.field}: ${error.message}`);
      });
    } else {
      console.error('❌ Cart creation returned null with no errors - this usually means:');
      console.error('  1. Variant is not available for sale');
      console.error('  2. Product requires special checkout (subscription)');
      console.error('  3. Store settings prevent cart creation');
    }
    
    return null;
  } catch (error) {
    console.error('Error creating cart:', error);
    return null;
  }
}

/**
 * Add items to an existing cart
 */
export async function addToCart(cartId: string, variantId: string, quantity: number = 1): Promise<ShopifyCart | null> {
  if (!shopifyClient) {
    console.error('Shopify client not initialized');
    return null;
  }

  try {
    const response = await shopifyClient.request(ADD_TO_CART_MUTATION, {
      variables: {
        cartId,
        lines: [
          {
            merchandiseId: variantId,
            quantity: quantity
          }
        ]
      }
    });

    if (response.data?.cartLinesAdd?.cart) {
      return response.data.cartLinesAdd.cart as ShopifyCart;
    }
    
    if (response.data?.cartLinesAdd?.userErrors?.length > 0) {
      console.error('Add to cart errors:', response.data.cartLinesAdd.userErrors);
    }
    
    return null;
  } catch (error) {
    console.error('Error adding to cart:', error);
    return null;
  }
}

/**
 * Format price for display
 */
export function formatPrice(amount: string, currencyCode: string = 'USD'): string {
  const numericAmount = parseFloat(amount);
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(numericAmount);
}

/**
 * Create a direct buy now flow (cart + immediate redirect)
 */
export async function buyNow(variantId: string, quantity: number = 1): Promise<string | null> {
  const cart = await createCart(variantId, quantity);
  
  if (cart?.checkoutUrl) {
    return cart.checkoutUrl;
  }
  
  return null;
}

/**
 * Get the default variant for a product (usually the first one)
 */
export function getDefaultVariant(product: ShopifyProduct) {
  return product.variants.nodes.find(variant => variant.availableForSale) || product.variants.nodes[0];
}

/**
 * Check if configuration is valid
 */
export function isShopifyConfigured(): boolean {
  return Boolean(STORE_DOMAIN && STOREFRONT_ACCESS_TOKEN && shopifyClient);
}

// Export configuration for debugging
export const shopifyConfig = {
  storeDomain: STORE_DOMAIN,
  productHandle: PRODUCT_HANDLE,
  hasAccessToken: Boolean(STOREFRONT_ACCESS_TOKEN),
  isConfigured: isShopifyConfigured(),
};

// Development mock data for testing when Shopify is not configured
export const mockProduct: ShopifyProduct = {
  id: 'mock-product-id',
  handle: 'pour-the-port-3-pack',
  title: 'Pour the PORT - 3-Pack Annual Supply',
  description: 'USDA Certified Biobased® septic tank treatment. Natural bacterial protection prevents costly system failures. Just 3 applications per year.',
  priceRange: {
    minVariantPrice: {
      amount: '84.00',
      currencyCode: 'USD'
    }
  },
  images: {
    nodes: [
      {
        id: 'mock-image-1',
        url: 'https://via.placeholder.com/400x400/22c55e/ffffff?text=Pour+the+PORT',
        altText: 'Pour the PORT 3-Pack',
        width: 400,
        height: 400
      }
    ]
  },
  variants: {
    nodes: [
      {
        id: 'mock-variant-1',
        title: 'Default Title',
        price: {
          amount: '84.00',
          currencyCode: 'USD'
        },
        availableForSale: true,
        quantityAvailable: 100
      }
    ]
  }
};