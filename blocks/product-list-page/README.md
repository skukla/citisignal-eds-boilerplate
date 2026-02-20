# Product List Page Block

## Overview

The Product List Page block provides product search and browsing functionality using @dropins/storefront-product-discovery containers. It handles search results, faceted filtering, sorting, pagination, wishlist integration, and cart operations.

## Integration

### Block Configuration

- `urlpath` - Category URL path for category-specific product listings

### URL Parameters

- `q` - Search query string for keyword searches

### Events

#### Event Listeners

- `events.on('cart/data', callback)` - Listens for cart data changes to update add-to-cart button states
- `events.on('wishlist/alert', callback)` - Listens for wishlist action alerts to show notifications

## Behavior Patterns

### Page Context Detection

- **Search Mode**: When `q` URL parameter is present, operates in search results mode
- **Category Mode**: When `urlpath` block config is present, operates in category browsing mode

### User Interaction Flows

1. **Initialization**: Block renders facets, sort controls, product grid, and pagination
2. **Filtering**: Users can filter results using facet controls (category, price, attributes)
3. **Sorting**: Users can sort results by relevance, price, or name
4. **Pagination**: Users can navigate between result pages
5. **Add to Cart**: Users can add products directly from the product cards
6. **Wishlist**: Users can toggle wishlist status on product cards

### Error Handling

- **Search Errors**: If search API fails, shows empty state with appropriate messaging
- **Cart Errors**: If add-to-cart operations fail, shows error alerts with dismiss functionality
- **Image Rendering**: Falls back to placeholder images if product images fail to load
