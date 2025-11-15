import { Component } from '@angular/core';
import { IonContent, IonButton, IonIcon, IonList, IonItem, IonAvatar, IonLabel, IonNote, IonFab, IonFabButton, IonChip, IonSearchbar } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonButton,
    IonIcon,
    IonList,
    IonItem,
    IonAvatar,
    IonLabel,
    IonNote,
    IonFab,
    IonFabButton,
    IonChip,
    IonSearchbar
  ],
})
export class Tab4Page {
  currentPlaceholder: string = 'Search transactions, contacts...';
  profileAvatarUrl: string = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face';

  categories = [
    { name: 'All', icon: 'grid' },
    { name: 'Send', icon: 'send' },
    { name: 'Receive', icon: 'arrow-down-circle' },
    { name: 'Bills', icon: 'receipt' },
    { name: 'Top-up', icon: 'add-circle' },
  ];

  transactions = [
    {
      name: 'John Doe',
      date: 'Today, 14:30',
      amount: '-₹1,500.00',
      amountClass: 'negative',
      category: 'Personal Transfer',
      type: 'sent',
      avatar: 'https://ionicframework.com/docs/img/demos/avatar.svg',
    },
    {
      name: 'Jane Smith',
      date: 'Yesterday, 09:15',
      amount: '+₹7,500.00',
      amountClass: 'positive',
      category: 'Payment Received',
      type: 'received',
      avatar: 'https://ionicframework.com/docs/img/demos/avatar.svg',
    },
    {
      name: 'Grocery Store',
      date: 'Nov 06, 2025',
      amount: '-₹3,250.50',
      amountClass: 'negative',
      category: 'Shopping',
      type: 'shopping',
      avatar: 'https://ionicframework.com/docs/img/demos/card-media.png',
    },
    {
      name: 'Salary Credit',
      date: 'Nov 01, 2025',
      amount: '+₹85,000.00',
      amountClass: 'positive',
      category: 'Salary',
      type: 'received',
      avatar: 'https://ionicframework.com/docs/img/demos/avatar.svg',
    },
  ];

  constructor(private router: Router) {}

  scanQR() {
    console.log('Scan QR code');
    this.router.navigate(['/qr']);
  }

  newPayment() {
    console.log('New payment');
    // Add your new payment logic here
  }

  sendMoney() {
    console.log('Send money');
    this.router.navigate(['/send']);
  }

  requestMoney() {
    console.log('Request money');
    this.router.navigate(['/request']);
  }

  viewCards() {
    console.log('View cards');
    this.router.navigate(['/card']);
  }
}