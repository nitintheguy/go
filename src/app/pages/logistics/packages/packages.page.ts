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
  cube,
  cubeOutline,
  rocket,
  flash,
  shieldCheckmark,
  location,
  time,
  cash,
  calendar,
  search,
  archive,
  barbell
} from 'ionicons/icons';

interface PackageType {
  name: string;
  icon: string;
  description: string;
  maxWeight: string;
  maxSize: string;
}

@Component({
  selector: 'app-packages',
  templateUrl: 'packages.page.html',
  styleUrls: ['packages.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonButton,
    IonIcon
  ]
})
export class PackagesPage implements OnInit {
  packageTypes: PackageType[] = [
    {
      name: 'Small Package',
      icon: 'cube-outline',
      description: 'Books, electronics, small items',
      maxWeight: '2 kg',
      maxSize: '30x30x15 cm'
    },
    {
      name: 'Medium Package',
      icon: 'cube',
      description: 'Clothing, accessories, medium items',
      maxWeight: '10 kg',
      maxSize: '50x50x30 cm'
    },
    {
      name: 'Large Package',
      icon: 'archive',
      description: 'Furniture parts, large items',
      maxWeight: '30 kg',
      maxSize: '100x80x60 cm'
    },
    {
      name: 'Heavy Package',
      icon: 'barbell',
      description: 'Heavy equipment, machinery parts',
      maxWeight: '50 kg',
      maxSize: '120x100x80 cm'
    }
  ];

  constructor(private router: Router) {
    addIcons({
      arrowBack,
      cube,
      cubeOutline,
      rocket,
      flash,
      shieldCheckmark,
      location,
      time,
      cash,
      calendar,
      search,
      archive,
      barbell
    });
  }

  ngOnInit() {}

  goBack() {
    this.router.navigate(['/tabs/tab5']);
  }

  selectService(serviceType: string) {
    alert(`Selected ${serviceType} service. Redirecting to booking...`);
    // Navigate to booking page with service type
  }

  schedulePickup() {
    this.router.navigate(['/tabs/tab5']);
    // Could navigate to a booking page
  }

  trackPackage() {
    this.router.navigate(['/tabs/tab5']);
    // Could navigate to tracking page
  }
}

