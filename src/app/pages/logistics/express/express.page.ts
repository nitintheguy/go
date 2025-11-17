import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  IonContent,
  IonButton,
  IonIcon
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  arrowBack,
  rocket,
  flash,
  time,
  location,
  map,
  globe,
  search,
  checkmarkCircle,
  shieldCheckmark,
  timeOutline,
  notifications
} from 'ionicons/icons';

interface ExpressFeature {
  name: string;
  icon: string;
  description: string;
}

@Component({
  selector: 'app-express',
  templateUrl: 'express.page.html',
  styleUrls: ['express.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonButton,
    IonIcon
  ]
})
export class ExpressPage implements OnInit {
  expressFeatures: ExpressFeature[] = [
    {
      name: 'Real-time Tracking',
      icon: 'location',
      description: 'Track your shipment live'
    },
    {
      name: 'SMS Notifications',
      icon: 'notifications',
      description: 'Get updates via SMS'
    },
    {
      name: 'Guaranteed Delivery',
      icon: 'checkmark-circle',
      description: 'On-time delivery guarantee'
    },
    {
      name: 'Secure Handling',
      icon: 'shield-checkmark',
      description: 'Safe and secure transport'
    },
    {
      name: '24/7 Support',
      icon: 'time-outline',
      description: 'Round-the-clock assistance'
    },
    {
      name: 'Insurance',
      icon: 'shield-checkmark',
      description: 'Full insurance coverage'
    }
  ];

  constructor(private router: Router) {
    addIcons({
      arrowBack,
      rocket,
      flash,
      time,
      location,
      map,
      globe,
      search,
      checkmarkCircle,
      shieldCheckmark,
      timeOutline,
      notifications
    });
  }

  ngOnInit() {}

  goBack() {
    this.router.navigate(['/tabs/tab5']);
  }

  selectService(serviceType: string) {
    alert(`Selected ${serviceType} express service. Redirecting to booking...`);
  }

  bookExpress() {
    alert('Express delivery booking initiated!');
  }

  trackExpress() {
    this.router.navigate(['/tabs/tab5']);
  }
}

