import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import lottie from 'lottie-web';

@Component({
  selector: 'app-send',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule],
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.scss'],
})
export class Send implements AfterViewInit {
  @ViewChild('animationContainer', { static: false }) animationContainer!: ElementRef;

  recentContacts = [
    {
      name: 'John Doe',
      phone: '+91 98765 43210',
      avatar: 'https://ionicframework.com/docs/img/demos/avatar.svg'
    },
    {
      name: 'Jane Smith',
      phone: '+91 98765 43211',
      avatar: 'https://ionicframework.com/docs/img/demos/avatar.svg'
    },
    {
      name: 'Mike Johnson',
      phone: '+91 98765 43212',
      avatar: 'https://ionicframework.com/docs/img/demos/avatar.svg'
    },
    {
      name: 'Sarah Wilson',
      phone: '+91 98765 43213',
      avatar: 'https://ionicframework.com/docs/img/demos/avatar.svg'
    }
  ];

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
          path: 'assets/pay.json'
        });
      } catch (error) {
        console.error('Error loading Lottie animation:', error);
        this.animationContainer.nativeElement.innerHTML = `
          <div style="color: #667eea; text-align: center; padding: 20px;">
            <ion-icon name="send" style="font-size: 3rem; margin-bottom: 10px;"></ion-icon>
            <div>Send Money</div>
          </div>
        `;
      }
    }
  }

  sendToContact(contact: any) {
    console.log('Sending money to:', contact.name);
  }
}