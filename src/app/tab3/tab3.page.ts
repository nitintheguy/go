import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { IonContent, IonSegment, IonSegmentButton, IonLabel, IonList, IonItem, IonInput, IonButton, IonAvatar, IonChip, IonSearchbar, IonIcon, ModalController } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import lottie from 'lottie-web';
import { CheckoutPage } from '../pages/checkout/checkout.page';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonList,
    IonItem,
    IonInput,
    IonButton,
    FormsModule,
    CommonModule,
    IonAvatar,
    IonChip,
    IonSearchbar,
    IonIcon
  ],
})
export class Tab3Page implements AfterViewInit {
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;

  rideType: string = 'uberx';
  currentPlaceholder: string = 'Where to?';
  profileAvatarUrl: string = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face';
  pickupLocation: string = 'Current location';
  destination: string = '';
  selectedCategory: string = 'All';
  searchQuery: string = '';

  categories = [
    { name: 'All', icon: 'car' },
    { name: 'Car', icon: 'car-sport' },
    { name: 'Bike', icon: 'bicycle' },
    { name: 'Auto', icon: 'car-outline' },
    { name: 'Taxi', icon: 'taxi' },
  ];

  allRideTypes = {
    'uberx': { name: 'UberX', price: 149, icon: 'car-sport', description: 'Affordable, everyday rides', category: 'Car' },
    'uberblack': { name: 'Uber Black', price: 249, icon: 'diamond', description: 'Premium luxury rides', category: 'Car' },
    'uberxl': { name: 'UberXL', price: 199, icon: 'people', description: 'Larger vehicles for groups', category: 'Car' },
    'bike': { name: 'Bike Ride', price: 79, icon: 'bicycle', description: 'Quick and affordable', category: 'Bike' },
    'auto': { name: 'Auto Rickshaw', price: 99, icon: 'car-outline', description: 'Traditional auto ride', category: 'Auto' },
    'taxi': { name: 'Taxi', price: 179, icon: 'taxi', description: 'Standard taxi service', category: 'Taxi' }
  };

  availableRideTypes: any = {};

  constructor(
    private router: Router,
    private modalCtrl: ModalController
  ) {
    this.availableRideTypes = { ...this.allRideTypes };
  }

  ngAfterViewInit() {
    this.loadLottieAnimation();
  }

  segmentChanged(event: any) {
    console.log('Segment changed to', event.detail.value);
    this.rideType = event.detail.value;
  }

  loadLottieAnimation() {
    if (this.mapContainer && this.mapContainer.nativeElement) {
      try {
        const animation = lottie.loadAnimation({
          container: this.mapContainer.nativeElement,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: 'assets/map.json'
        });

        // Scale up the animation
        animation.addEventListener('DOMLoaded', () => {
          const svg = this.mapContainer.nativeElement.querySelector('svg');
          if (svg) {
            svg.style.transform = 'scale(1.3)';
            svg.style.width = '130%';
            svg.style.height = '130%';
          }
        });

      } catch (error) {
        console.error('Error loading Lottie animation:', error);
        // Fallback background if animation fails
        this.mapContainer.nativeElement.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        this.mapContainer.nativeElement.innerHTML = `
          <div style="color: white; text-align: center; padding: 20px;">
            <ion-icon name="map" style="font-size: 3rem; margin-bottom: 10px;"></ion-icon>
            <div>Interactive Map View</div>
          </div>
        `;
      }
    }
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
    
    if (category === 'All') {
      this.availableRideTypes = { ...this.allRideTypes };
    } else {
      const filtered: any = {};
      Object.keys(this.allRideTypes).forEach(key => {
        if (this.allRideTypes[key as keyof typeof this.allRideTypes].category === category) {
          filtered[key] = this.allRideTypes[key as keyof typeof this.allRideTypes];
        }
      });
      this.availableRideTypes = filtered;
      
      // If current rideType is not in filtered list, switch to first available
      if (!this.availableRideTypes[this.rideType]) {
        const firstKey = Object.keys(this.availableRideTypes)[0];
        if (firstKey) {
          this.rideType = firstKey;
        }
      }
    }
  }

  onSearchChange(event: any) {
    this.searchQuery = event.detail.value || '';
    this.updateDestination({ target: { value: this.searchQuery } });
  }

  async requestRide() {
    if (!this.destination.trim()) {
      alert('Please enter a destination');
      return;
    }

    const selectedRide = this.allRideTypes[this.rideType as keyof typeof this.allRideTypes];
    const rideItem = {
      id: `ride-${Date.now()}`,
      name: `${selectedRide.name} - ${this.pickupLocation} to ${this.destination}`,
      price: selectedRide.price,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300',
      rideType: this.rideType,
      pickupLocation: this.pickupLocation,
      destination: this.destination
    };

    const modal = await this.modalCtrl.create({
      component: CheckoutPage,
      componentProps: {
        isGrocery: false,
        isRide: true,
        cartItems: [rideItem]
      },
      breakpoints: [0, 0.75, 1],
      initialBreakpoint: 1
    });
    
    await modal.present();
  }

  updateDestination(event: any) {
    this.destination = event.target.value;
  }

  updatePickup(event: any) {
    this.pickupLocation = event.target.value || 'Current location';
  }

  openProfile() {
    this.router.navigate(['/profile']);
  }

  getAvailableRideKeys(): string[] {
    return Object.keys(this.availableRideTypes);
  }
}