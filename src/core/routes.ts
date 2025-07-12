/**
 * Application Routes Configuration
 * Extends BaseRouteManager to define specific routes
 */

import { BaseMenuManager, BaseRouteManager, IRouteConfig, IRouteWithParams, MenuItem } from '@carapis/nextjs/utils';

class Routes extends BaseRouteManager {
  constructor() {
    super();

    this.initDefaultCallbackUrl('Dashboard', '/dashboard', 'dashboard');
    this.initDefaultAuthCallbackUrl('Auth', '/dashboard', 'login');
  }

  // Root routes
  home = this.route('/', {
    label: 'Home',
    description: 'Home page',
    requiresAuth: false,
    icon: 'home',
  });

  about = this.route('/about/', {
    label: 'About',
    description: 'About us',
    requiresAuth: false,
    icon: 'info',
  });

  // Catalog routes
  catalog = {
    index: this.route('/catalog', {
      label: 'Catalog',
      description: 'Vehicle catalog',
      requiresAuth: false,
      icon: 'inventory',
    }),

    brand: this.routeWithParams('/catalog/[brand]', ['brand'], {
      label: 'Brand Catalog',
      description: 'Browse vehicles by brand',
      requiresAuth: false,
      icon: 'branding_watermark',
    }),

    model: this.routeWithParams('/catalog/[brand]/[model]', ['brand', 'model'], {
      label: 'Model Catalog',
      description: 'Browse vehicles by model',
      requiresAuth: false,
      icon: 'model_training',
    }),

    vehicle: this.routeWithParams('/catalog/[brand]/[model]/[vehicle_id]', ['brand', 'model', 'vehicle_id'], {
      label: 'Vehicle Details',
      description: 'Vehicle details page',
      requiresAuth: false,
      icon: 'directions_car',
    }),
  };

  // Dashboard routes
  dashboard = {
    index: this.route('/dashboard', {
      label: 'Dashboard',
      description: 'Dashboard page',
      requiresAuth: true,
      icon: 'dashboard',
    }),
  };

  // Auth routes
  auth = {
    default: this.route('/auth', {
      label: 'Auth',
      description: 'Auth page',
      requiresAuth: false,
      icon: 'login',
    }),
  };
}

class AppMenu extends BaseMenuManager {
  constructor(private routes: Routes) {
    super();
  }

  // Dashboard menu items
  dashboard = this.menuItem('Dashboard', '/dashboard', 'dashboard');

  // Catalog menu item
  catalog = this.menuItem('Catalog', '/catalog', 'inventory');

  // Implementation of abstract buildMenu method
  buildMenu(userRoles: string[] = []): MenuItem[] {
    const menu: MenuItem[] = [];

    // Always add dashboard and catalog
    menu.push(this.dashboard);
    menu.push(this.catalog);

    return menu;
  }
}

// Create singleton instances
const routes = new Routes();
const appMenu = new AppMenu(routes);

// Set menu manager for routes
routes.setMenuManager(appMenu);

export default routes;
