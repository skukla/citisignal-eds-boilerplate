import { getHeaders } from '@dropins/tools/lib/aem/configs.js';
import { initializers } from '@dropins/tools/initializer.js';
import { events } from '@dropins/tools/event-bus.js';
import { initialize, setFetchGraphQlHeaders } from '@dropins/storefront-personalization/api.js';
import { initializeDropin } from './index.js';
import { checkIsAuthenticated } from '../commerce.js';

let personalizationInitialized = false;

/**
 * Initialize the personalization dropin.
 * Only runs once per page load.
 */
const initPersonalization = async () => {
  if (personalizationInitialized) return;

  setFetchGraphQlHeaders((prev) => ({ ...prev, ...getHeaders('cart') }));
  await initializers.mountImmediately(initialize, {});
  personalizationInitialized = true;
};

await initializeDropin(async () => {
  // Only initialize personalization for authenticated users
  // This prevents "Authorization header missing" errors for guests
  // when the dropin makes customerGroup/customerSegments queries
  if (checkIsAuthenticated()) {
    await initPersonalization();
  }

  // Initialize when user logs in during the session
  events.on('authenticated', async (isAuthenticated) => {
    if (isAuthenticated && !personalizationInitialized) {
      await initPersonalization();
    }
  });
})();
