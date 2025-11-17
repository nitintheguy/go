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
  documentText,
  rocket,
  mail,
  lockClosed,
  checkmarkCircle,
  time,
  shieldCheckmark,
  send,
  search,
  folder,
  receipt,
  card,
  school,
  business,
  medicalOutline
} from 'ionicons/icons';

interface DocumentType {
  name: string;
  icon: string;
  description: string;
}

@Component({
  selector: 'app-documents',
  templateUrl: 'documents.page.html',
  styleUrls: ['documents.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonButton,
    IonIcon
  ]
})
export class DocumentsPage implements OnInit {
  documentTypes: DocumentType[] = [
    {
      name: 'Legal Documents',
      icon: 'folder',
      description: 'Contracts, agreements, certificates'
    },
    {
      name: 'Financial Documents',
      icon: 'receipt',
      description: 'Invoices, statements, cheques'
    },
    {
      name: 'Identity Documents',
      icon: 'card',
      description: 'Passports, IDs, licenses'
    },
    {
      name: 'Academic Documents',
      icon: 'school',
      description: 'Certificates, transcripts, diplomas'
    },
    {
      name: 'Business Documents',
      icon: 'business',
      description: 'Reports, proposals, contracts'
    },
    {
      name: 'Medical Documents',
      icon: 'medical-outline',
      description: 'Reports, prescriptions, records'
    }
  ];

  constructor(private router: Router) {
    addIcons({
      arrowBack,
      documentText,
      rocket,
      mail,
      lockClosed,
      checkmarkCircle,
      time,
      shieldCheckmark,
      send,
      search,
      folder,
      receipt,
      card,
      school,
      business,
      medicalOutline
    });
  }

  ngOnInit() {}

  goBack() {
    this.router.navigate(['/tabs/tab5']);
  }

  selectService(serviceType: string) {
    alert(`Selected ${serviceType} service. Redirecting to booking...`);
  }

  schedulePickup() {
    this.router.navigate(['/tabs/tab5']);
  }

  trackDocument() {
    this.router.navigate(['/tabs/tab5']);
  }
}

