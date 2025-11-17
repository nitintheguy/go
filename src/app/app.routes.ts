import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/welcome/welcome.component').then(m => m.WelcomeComponent)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'tab4',
    loadComponent: () => import('./tab4/tab4.page').then( m => m.Tab4Page)
  },
  {
    path: 'tab5',
    loadComponent: () => import('./tab5/tab5.page').then( m => m.Tab5Page)
  },
  {
    path: 'category/:name',
    loadComponent: () => import('./components/category-items/category-items.component').then(m => m.CategoryItemsComponent)
  },
  // New routes for payment features
  {
    path: 'qr',
    loadComponent: () => import('./components/qr/qr.component').then(m => m.QRScannerComponent)
  },
  
  {
    path: 'send',
    loadComponent: () => import('./components/send/send.component').then(m => m.Send)
  },

  {
    path: 'request',
    loadComponent: () => import('./components/request/request.component').then(m => m.RequestComponent)
  },
  {
    path: 'card',
    loadComponent: () => import('./components/card/card.component').then(m => m.CardComponent)
  },
  {
  path: 'item/:id',
  loadComponent: () => import('./components/item/item.component').then(m => m.ItemComponent)
},
  {
    path: 'restaurant-products',
    loadComponent: () => import('./pages/restaurant-products/restaurant-products.page').then( m => m.RestaurantProductsPage)
  },
  {
    path: 'checkout',
    loadComponent: () => import('./pages/checkout/checkout.page').then( m => m.CheckoutPage)
  },
  // Profile routes
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile.page').then( m => m.ProfilePage)
  },
  {
    path: 'edit-profile',
    loadComponent: () => import('./pages/profile/edit-profile/edit-profile.page').then( m => m.EditProfilePage)
  },
  {
    path: 'settings',
    loadComponent: () => import('./pages/profile/settings/settings.page').then( m => m.SettingsPage)
  },
  {
    path: 'addresses',
    loadComponent: () => import('./pages/profile/addresses/addresses.page').then( m => m.AddressesPage)
  },
  {
    path: 'favorites',
    loadComponent: () => import('./pages/profile/favorites/favorites.page').then( m => m.FavoritesPage)
  },
  {
    path: 'help',
    loadComponent: () => import('./pages/profile/help/help.page').then( m => m.HelpPage)
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/profile/about/about.page').then( m => m.AboutPage)
  },
  {
    path: 'order-details/:id',
    loadComponent: () => import('./pages/profile/order-details/order-details.page').then( m => m.OrderDetailsPage)
  },
  // Logistics routes
  {
    path: 'logistics/packages',
    loadComponent: () => import('./pages/logistics/packages/packages.page').then( m => m.PackagesPage)
  },
  {
    path: 'logistics/documents',
    loadComponent: () => import('./pages/logistics/documents/documents.page').then( m => m.DocumentsPage)
  },
  {
    path: 'logistics/freight',
    loadComponent: () => import('./pages/logistics/freight/freight.page').then( m => m.FreightPage)
  },
  {
    path: 'logistics/express',
    loadComponent: () => import('./pages/logistics/express/express.page').then( m => m.ExpressPage)
  }
];