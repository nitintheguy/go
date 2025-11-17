import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonContent, IonSegment, IonSegmentButton, IonLabel, IonItem, IonInput, IonButton, IonAvatar, IonChip, IonSearchbar, IonIcon } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserProfileService, UserProfile } from '../services/user-profile.service';
import { addIcons } from 'ionicons';
import {
  cube,
  location,
  calendar,
  business,
  search,
  barcode,
  navigate,
  chevronForward,
  time,
  home,
  person,
  call,
  card,
  shieldCheckmark,
  archive,
  headset,
  grid,
  documentText,
  boat,
  rocket
} from 'ionicons/icons';

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
    IonItem,
    IonInput,
    IonButton,
    IonAvatar,
    IonChip,
    IonSearchbar,
    IonIcon
  ],
})
export class Tab5Page implements OnInit, OnDestroy {
  selectedSegment: string = 'track';
  currentPlaceholder: string = 'Search shipments, tracking IDs...';
  profileAvatarUrl: string = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face';
  private profileSubscription?: Subscription;
  
  // Form inputs
  trackingId: string = '';
  pickupAddress: string = '';
  contactPerson: string = '';
  phoneNumber: string = '';
  serviceLocation: string = '';

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

  constructor(
    private router: Router,
    private userProfileService: UserProfileService
  ) {
    addIcons({
      cube,
      location,
      calendar,
      business,
      search,
      barcode,
      navigate,
      chevronForward,
      time,
      home,
      person,
      call,
      card,
      shieldCheckmark,
      archive,
      headset,
      grid,
      documentText,
      boat,
      rocket
    });
  }

  ngOnInit() {
    // Load initial profile
    const profile = this.userProfileService.getProfile();
    this.profileAvatarUrl = profile.avatar;
    
    // Subscribe to profile updates
    this.profileSubscription = this.userProfileService.profile$.subscribe(
      (profile) => {
        this.profileAvatarUrl = profile.avatar;
      }
    );
  }

  ngOnDestroy() {
    // Unsubscribe to prevent memory leaks
    if (this.profileSubscription) {
      this.profileSubscription.unsubscribe();
    }
  }

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
    if (!this.trackingId.trim()) {
      alert('Please enter a tracking ID');
      return;
    }
    console.log('Tracking shipment:', this.trackingId);
    // Navigate to tracking details or show tracking info
    alert(`Tracking shipment: ${this.trackingId}\n\nThis feature will show real-time tracking information.`);
  }

  viewShipmentDetails(id: string) {
    console.log('Viewing details for shipment:', id);
    // Navigate to shipment details page or show a modal
    alert(`Shipment Details:\nID: ${id}\n\nThis will show detailed tracking information.`);
  }

  schedulePickup() {
    if (!this.pickupAddress.trim() || !this.contactPerson.trim() || !this.phoneNumber.trim()) {
      alert('Please fill in all required fields');
      return;
    }
    console.log('Scheduling pickup...', {
      address: this.pickupAddress,
      contact: this.contactPerson,
      phone: this.phoneNumber
    });
    alert(`Pickup Scheduled!\n\nAddress: ${this.pickupAddress}\nContact: ${this.contactPerson}\nPhone: ${this.phoneNumber}\n\nWe'll pick up within 2 hours.`);
    // Reset form
    this.pickupAddress = '';
    this.contactPerson = '';
    this.phoneNumber = '';
  }

  findServicePoints() {
    if (!this.serviceLocation.trim()) {
      alert('Please enter your location');
      return;
    }
    console.log('Finding service points near:', this.serviceLocation);
    alert(`Finding service points near: ${this.serviceLocation}\n\nThis will show nearby service centers on a map.`);
  }

  findDropOff() {
    console.log('Finding drop-off points...');
    alert('Finding nearest drop-off points...\n\nThis will show drop-off locations on a map.');
  }

  findPickup() {
    console.log('Finding pickup centers...');
    alert('Finding nearest pickup centers...\n\nThis will show pickup center locations on a map.');
  }

  contactSupport() {
    console.log('Contacting support...');
    alert('Contact Support\n\nPhone: 1800-XXX-XXXX\nEmail: support@go.com\n\nOur support team is available 24/7.');
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