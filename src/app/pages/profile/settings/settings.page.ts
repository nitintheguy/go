import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent,
  IonButton,
  IonIcon,
  IonToggle
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  arrowBack,
  personCircle,
  lockClosed,
  location,
  notifications,
  mail,
  megaphone,
  language,
  colorPalette,
  shieldCheckmark,
  documentText,
  helpCircle,
  chatbubbleEllipses,
  informationCircle,
  chevronForward
} from 'ionicons/icons';

interface AppSettings {
  pushNotifications: boolean;
  emailNotifications: boolean;
  promotionalUpdates: boolean;
  locationServices: boolean;
  language: string;
  theme: string;
}

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonButton,
    IonIcon,
    IonToggle
  ]
})
export class SettingsPage implements OnInit {
  settings: AppSettings = {
    pushNotifications: true,
    emailNotifications: true,
    promotionalUpdates: false,
    locationServices: true,
    language: 'English',
    theme: 'Light'
  };

  constructor(private router: Router) {
    addIcons({
      arrowBack,
      personCircle,
      lockClosed,
      location,
      notifications,
      mail,
      megaphone,
      language,
      colorPalette,
      shieldCheckmark,
      documentText,
      helpCircle,
      chatbubbleEllipses,
      informationCircle,
      chevronForward
    });
  }

  ngOnInit() {
    // Load settings from storage
  }

  goBack() {
    this.router.navigate(['/profile']);
  }

  editProfile() {
    this.router.navigate(['/edit-profile']);
  }

  changePassword() {
    const newPassword = prompt('Enter new password:');
    if (newPassword) {
      alert('Password changed successfully!');
    }
  }

  goToAddresses() {
    this.router.navigate(['/addresses']);
  }

  viewPrivacyPolicy() {
    alert('Privacy Policy:\n\nWe respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you use our app.');
  }

  viewTerms() {
    alert('Terms of Service:\n\nBy using this app, you agree to our terms of service. Please read these terms carefully before using our services.');
  }

  goToHelp() {
    this.router.navigate(['/help']);
  }

  contactSupport() {
    alert('Contact Support:\n\nEmail: support@goapp.com\nPhone: +91 1800-123-4567\nHours: 24/7');
  }

  goToAbout() {
    this.router.navigate(['/about']);
  }
}

