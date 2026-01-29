import { render as orderRenderer } from '@dropins/storefront-order/render.js';
import { OrderProductList } from '@dropins/storefront-order/containers/OrderProductList.js';
import GiftOptions from '@dropins/storefront-cart/containers/GiftOptions.js';
import { render as CartProvider } from '@dropins/storefront-cart/render.js';
import { tryRenderAemAssetsImage } from '../../scripts/aem-assets.js';

// Initialize
import '../../scripts/initializers/order.js';
import { rootLink, encodeSkuForUrl } from '../../scripts/commerce.js';

export default async function decorate(block) {
  // Encode slashes in SKU as __ (decoded by getSkuFromUrl in commerce.js)
  const getProductLink = (product) => rootLink(`/products/${product.productUrlKey}/${encodeSkuForUrl(product.productSku)}`);
  await orderRenderer.render(OrderProductList, {
    slots: {
      CartSummaryItemImage: (ctx) => {
        const { data, defaultImageProps } = ctx;
        const anchor = document.createElement('a');
        anchor.href = getProductLink(data);

        tryRenderAemAssetsImage(ctx, {
          alias: data.product.sku,
          imageProps: defaultImageProps,
          wrapper: anchor,

          params: {
            width: defaultImageProps.width,
            height: defaultImageProps.height,
          },
        });
      },
      Footer: (ctx) => {
        const giftOptions = document.createElement('div');

        CartProvider.render(GiftOptions, {
          item: ctx.item,
          view: 'product',
          dataSource: 'order',
          isEditable: false,
          slots: {
            SwatchImage: (swatchCtx) => {
              const { defaultImageProps, imageSwatchContext } = swatchCtx;
              tryRenderAemAssetsImage(swatchCtx, {
                alias: imageSwatchContext.label,
                imageProps: defaultImageProps,
                wrapper: document.createElement('span'),

                params: {
                  width: defaultImageProps.width,
                  height: defaultImageProps.height,
                },
              });
            },
          },
        })(giftOptions);

        ctx.appendChild(giftOptions);
      },
    },
    routeProductDetails: getProductLink,
  })(block);
}
