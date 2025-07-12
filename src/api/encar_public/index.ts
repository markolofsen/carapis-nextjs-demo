/**
 * Public Data API - Index
 * Public data API
 * 
 * Zone: encar_public
 * Apps: src.data_encar_api
 */

export * from './sdk.gen';
export * from './types.gen';
export * from './client.gen';

// Re-export main client for convenience
export { client as default } from './client.gen'; 