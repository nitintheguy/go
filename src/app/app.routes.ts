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
}
];