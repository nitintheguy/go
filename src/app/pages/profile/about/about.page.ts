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
  storefront,
  restaurant,
  car,
  cube,
  wallet,
  mail,
  call,
  location,
  chevronForward
} from 'ionicons/icons';

@Component({
  selector: 'app-about',
  templateUrl: 'about.page.html',
  styleUrls: ['about.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonButton,
    IonIcon
  ]
})
export class AboutPage implements OnInit {
  constructor(private router: Router) {
    addIcons({
      arrowBack,
      storefront,
      restaurant,
      car,
      cube,
      wallet,
      mail,
      call,
      location,
      chevronForward
    });
  }

  ngOnInit() {}

  goBack() {
    this.router.navigate(['/profile']);
  }

  viewPrivacyPolicy() {
    alert('Privacy Policy:\n\nWe respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you use our app.');
  }

  viewTerms() {
    alert('Terms of Service:\n\nBy using this app, you agree to our terms of service. Please read these terms carefully before using our services.');
  }
}

