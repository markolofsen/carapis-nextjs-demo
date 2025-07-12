/**
 * Simple API Class
 * Everything in one place - auth, clients, configuration
 */

import { settings } from '@/core/settings';
import { dataEncarApiVehiclesWebList, dataEncarApiVehiclesWebRetrieve } from './encar_public';
import { createClient } from './encar_public/client';

// Initialize the client with API Key
const myClient = createClient({
  baseUrl: settings.apiUrl,
  headers: {
    'X-API-Key': settings.apiKey,
    'Content-Type': 'application/json',
  },
});

// Fetch vehicle listings wrapper
const dataEncarApiVehiclesList = async (query: any) => {
  const response = await dataEncarApiVehiclesWebList({
    client: myClient,
    query,
  });
  return response;
};

// Fetch single vehicle wrapper
const dataEncarApiVehiclesRetrieve = async (path: { listing_id: string }) => {
  const response = await dataEncarApiVehiclesWebRetrieve({
    client: myClient,
    path,
  });
  return response;
};

export { dataEncarApiVehiclesList, dataEncarApiVehiclesRetrieve, myClient };
export default myClient;
