import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import lottie from 'lottie-web';
import { PinEntryComponent } from '../pin-entry/pin-entry.component';

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

  amount: number = 0;
  selectedContact: any = null;

  constructor(
    private modalCtrl: ModalController,
    private toastCtrl: ToastController
  ) {}

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

  async sendToContact(contact: any) {
    this.selectedContact = contact;
    
    // In a real app, you'd show an amount input dialog first
    // For now, we'll use a default amount
    this.amount = 1000; // Default amount, in real app this would come from user input

    // Show PIN entry modal
    const pinModal = await this.modalCtrl.create({
      component: PinEntryComponent,
      componentProps: {
        paymentMethod: 'send',
        amount: this.amount,
        primaryColor: '#d32f2f',
        recipientName: contact.name,
        tabTheme: 'tab4' // Pay tab theme
      },
      cssClass: 'pin-modal',
      backdropDismiss: false
    });

    await pinModal.present();

    const { data } = await pinModal.onWillDismiss();

    if (data && data.verified) {
      // PIN verified, proceed with sending money
      this.processSendMoney(contact);
    } else {
      // PIN cancelled or invalid
      if (data && data.cancelled) {
        this.presentToast('Transaction cancelled');
      }
    }
  }

  private async processSendMoney(contact: any) {
    console.log('Sending money to:', contact.name, 'Amount:', this.amount);
    const toast = await this.toastCtrl.create({
      message: `₹${this.amount} sent to ${contact.name} successfully!`,
      duration: 2000,
      position: 'bottom',
      color: 'success'
    });
    await toast.present();
  }

  private async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
  }
}