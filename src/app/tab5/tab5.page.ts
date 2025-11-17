import { Component } from '@angular/core';
import { IonContent, IonSegment, IonSegmentButton, IonLabel, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonInput, IonButton, IonList, IonListHeader, IonAvatar, IonChip, IonSearchbar, IonIcon } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab5',
  templateUrl: 'tab5.page.html',
  styleUrls: ['tab5.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonInput,
    IonButton,
    IonList,
    IonListHeader,
    IonAvatar,
    IonChip,
    IonSearchbar,
    IonIcon
  ],
})
export class Tab5Page {
  selectedSegment: string = 'track';
  currentPlaceholder: string = 'Search shipments, tracking IDs...';
  profileAvatarUrl: string = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face';

  categories = [
    { name: 'All', icon: 'grid' },
    { name: 'Packages', icon: 'cube' },
    { name: 'Documents', icon: 'document-text' },
    { name: 'Freight', icon: 'boat' },
    { name: 'Express', icon: 'rocket' },
  ];

  recentShipments = [
    { id: 'DEL123456789', status: 'In Transit', date: '2025-11-07' },
    { id: 'BLD987654321', status: 'Delivered', date: '2025-11-05' },
    { id: 'DEL555444333', status: 'Out for Delivery', date: '2025-11-08' },
  ];

  constructor(private router: Router) {}

  segmentChanged(event: any) {
    console.log('Segment changed to', event.detail.value);
    this.selectedSegment = event.detail.value;
  }

  getStatusClass(status: string): string {
    const statusMap: { [key: string]: string } = {
      'In Transit': 'in-transit',
      'Delivered': 'delivered',
      'Out for Delivery': 'out-for-delivery'
    };
    return statusMap[status] || 'in-transit';
  }

  trackShipment() {
    console.log('Tracking shipment...');
    // Add your shipment tracking logic here
  }

  viewShipmentDetails(id: string) {
    console.log('Viewing details for shipment:', id);
    // Navigate to shipment details page or show a modal
  }

  schedulePickup() {
    console.log('Scheduling pickup...');
    // Add your pickup scheduling logic here
  }

  findServicePoints() {
    console.log('Finding service points...');
    // Add your service point finding logic here
  }

  findDropOff() {
    console.log('Finding drop-off points...');
    // Add drop-off points logic
  }

  findPickup() {
    console.log('Finding pickup centers...');
    // Add pickup centers logic
  }

  contactSupport() {
    console.log('Contacting support...');
    // Add support contact logic
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  navigateToCategory(categoryName: string) {
    const routeMap: { [key: string]: string } = {
      'Packages': '/logistics/packages',
      'Documents': '/logistics/documents',
      'Freight': '/logistics/freight',
      'Express': '/logistics/express'
    };

    const route = routeMap[categoryName];
    if (route) {
      this.router.navigate([route]);
    }
    // 'All' category doesn't navigate anywhere
  }
}