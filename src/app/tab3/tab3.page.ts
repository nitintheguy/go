import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { IonContent, IonSegment, IonSegmentButton, IonLabel, IonList, IonItem, IonInput, IonButton, IonAvatar, IonChip, IonSearchbar, IonIcon } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import lottie from 'lottie-web';

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

  categories = [
    { name: 'All', icon: 'car' },
    { name: 'Car', icon: 'car-sport' },
    { name: 'Bike', icon: 'bicycle' },
    { name: 'Auto', icon: 'car-outline' },
    { name: 'Taxi', icon: 'taxi' },
  ];

  constructor() {}

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

  requestRide() {
    console.log('Ride requested for:', this.rideType);
    // Add your ride request logic here
  }
}