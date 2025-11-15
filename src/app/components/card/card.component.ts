import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import lottie from 'lottie-web';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule],
})
export class CardComponent implements AfterViewInit {
  @ViewChild('animationContainer', { static: false }) animationContainer!: ElementRef;

  cards = [
    {
      type: 'Visa',
      number: '**** 4832',
      name: 'Primary Card',
      balance: '₹45,670.00',
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      expires: '12/25',
      cardHolder: 'John Doe',
      cvv: '***'
    },
    {
      type: 'Mastercard',
      number: '**** 1567',
      name: 'Travel Card',
      balance: '₹12,340.00',
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      expires: '09/26',
      cardHolder: 'John Doe',
      cvv: '***'
    },
    {
      type: 'Visa',
      number: '**** 8910',
      name: 'Savings Card',
      balance: '₹78,900.00',
      color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      expires: '03/27',
      cardHolder: 'John Doe',
      cvv: '***'
    }
  ];

  cardActions = [
    {
      icon: 'lock-closed',
      title: 'Freeze Card',
      description: 'Temporarily block your card'
    },
    {
      icon: 'eye',
      title: 'View Details',
      description: 'Card number & CVV'
    },
    {
      icon: 'settings',
      title: 'Settings',
      description: 'Manage card preferences'
    },
    {
      icon: 'document',
      title: 'Statements',
      description: 'View transactions'
    },
    {
      icon: 'swap-horizontal',
      title: 'Replace Card',
      description: 'Order new card'
    },
    {
      icon: 'trash',
      title: 'Close Card',
      description: 'Permanently close',
      danger: true
    }
  ];

  selectedCard: any = null;

  constructor() {}

  ngAfterViewInit() {
    this.loadLottieAnimation();
  }

  goBack() {
    history.back();
  }

  loadLottieAnimation() {
    if (this.animationContainer && this.animationContainer.nativeElement) {
      try {
        lottie.loadAnimation({
          container: this.animationContainer.nativeElement,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: 'assets/card.json'
        });
      } catch (error) {
        console.error('Error loading Lottie animation:', error);
        this.animationContainer.nativeElement.innerHTML = `
          <div style="color: #667eea; text-align: center; padding: 20px;">
            <ion-icon name="card" style="font-size: 3rem; margin-bottom: 10px;"></ion-icon>
            <div>My Cards</div>
          </div>
        `;
      }
    }
  }

  selectCard(card: any) {
    this.selectedCard = this.selectedCard === card ? null : card;
  }

  performAction(action: any) {
    console.log('Performing action:', action.title);
    // Add your action logic here
  }

  addNewCard() {
    console.log('Adding new card');
  }
}