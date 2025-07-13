/**
 * Simple API Class
 * Everything in one place - auth, clients, configuration
 */

import { settings } from '@/core/settings';
import type { Encar_publicTypes } from '@carapis/api';
import { API } from '@carapis/api';

export type VehicleListQuery = Encar_publicTypes.DataEncarApiVehiclesWebListData['query'];

// Initialize API client with base URL only
const api = new API(settings.url);
const apiClient = api.encar_public;

// Wrapper for vehicle list
export const dataEncarApiVehiclesList = (query: VehicleListQuery) =>
  apiClient?.dataEncarApiVehiclesWebList({
    query,
  });

// Wrapper for vehicle detail
export const dataEncarApiVehiclesRetrieve = (listing_id: string) =>
  apiClient?.dataEncarApiVehiclesWebRetrieve({
    path: { listing_id },
  });

export default api;
