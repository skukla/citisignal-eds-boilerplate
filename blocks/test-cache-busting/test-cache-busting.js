/**
 * Test Cache-Busting Block
 * Demonstrates fetchWithCacheBusting() utility usage for non-fragment blocks
 */

import { fetchWithCacheBusting } from '../../scripts/aem.js';

export default async function decorate(block) {
  // Get the data file path from block content
  const link = block.querySelector('a');
  const dataPath = link ? link.getAttribute('href') : '/test-data.json';

  try {
    // Use cache-busting utility - ensures authors see fresh content in UE
    const response = await fetchWithCacheBusting(dataPath);

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const data = await response.json();

    // Display the data
    block.innerHTML = `
      <div class="test-cache-busting-container">
        <h3>${data.title || 'Test Data'}</h3>
        <p>${data.message || 'No message'}</p>
        <div class="test-cache-busting-meta">
          <small>Last updated: ${data.timestamp || 'Unknown'}</small>
        </div>
      </div>
    `;
  } catch (error) {
    block.innerHTML = `
      <div class="test-cache-busting-error">
        <p>Error loading data: ${error.message}</p>
      </div>
    `;
  }
}
