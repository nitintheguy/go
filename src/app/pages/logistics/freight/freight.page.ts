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
  boat,
  car,
  train,
  airplane,
  cube,
  shieldCheckmark,
  business,
  globe,
  calculator,
  search,
  archive,
  construct,
  home,
  storefront,
  businessOutline
} from 'ionicons/icons';

interface FreightType {
  name: string;
  icon: string;
  description: string;
  maxWeight: string;
}

@Component({
  selector: 'app-freight',
  templateUrl: 'freight.page.html',
  styleUrls: ['freight.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonButton,
    IonIcon
  ]
})
export class FreightPage implements OnInit {
  freightTypes: FreightType[] = [
    {
      name: 'Machinery',
      icon: 'construct',
      description: 'Industrial equipment, tools',
      maxWeight: '5,000 kg'
    },
    {
      name: 'Furniture',
      icon: 'home',
      description: 'Household and office furniture',
      maxWeight: '2,000 kg'
    },
    {
      name: 'Electronics',
      icon: 'storefront',
      description: 'Bulk electronics, appliances',
      maxWeight: '1,000 kg'
    },
    {
      name: 'Raw Materials',
      icon: 'business-outline',
      description: 'Construction materials, metals',
      maxWeight: '10,000 kg'
    },
    {
      name: 'Automotive',
      icon: 'car',
      description: 'Vehicle parts, accessories',
      maxWeight: '3,000 kg'
    },
    {
      name: 'Archives',
      icon: 'archive',
      description: 'Storage boxes, files',
      maxWeight: '500 kg'
    }
  ];

  constructor(private router: Router) {
    addIcons({
      arrowBack,
      boat,
      car,
      train,
      airplane,
      cube,
      shieldCheckmark,
      business,
      globe,
      calculator,
      search,
      archive,
      construct,
      home,
      storefront,
      businessOutline
    });
  }

  ngOnInit() {}

  goBack() {
    this.router.navigate(['/tabs/tab5']);
  }

  selectService(serviceType: string) {
    alert(`Selected ${serviceType} freight service. Redirecting to quote...`);
  }

  requestQuote() {
    alert('Quote request submitted! Our team will contact you shortly.');
  }

  trackFreight() {
    this.router.navigate(['/tabs/tab5']);
  }
}

