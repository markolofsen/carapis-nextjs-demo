/**
 * Simple API Class
 * Everything in one place - auth, clients, configuration
 */

import { settings } from '@/core/settings';
import type { Encar_publicTypes } from '@carapis/api';
import { API } from '@carapis/api';

export type VehicleListQuery = Encar_publicTypes.DataEncarApiVehiclesWebListData['query'];

// SSR proxy url - use direct API URL for SSR, /apix proxy for client
const apiUrl = typeof window === 'undefined' ? settings.apiUrl : '/';

// Initialize API client with base URL only
const api = new API(apiUrl);
const headers = {
  'X-API-Key': settings.apiKey,
  'Content-Type': 'application/json',
};

// Wrapper for vehicle list
export const dataEncarApiVehiclesList = (query: VehicleListQuery) =>
  api.encar_public?.dataEncarApiVehiclesWebList({
    query,
    headers,
  });

// Wrapper for vehicle detail
export const dataEncarApiVehiclesRetrieve = (listing_id: string) =>
  api.encar_public?.dataEncarApiVehiclesWebRetrieve({
    path: { listing_id },
    headers,
  });

export default api;
