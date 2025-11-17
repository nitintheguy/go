import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-pin-entry',
  templateUrl: './pin-entry.component.html',
  styleUrls: ['./pin-entry.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class PinEntryComponent {
  @Input() paymentMethod: string = '';
  @Input() amount: number = 0;
  @Input() primaryColor: string = '#ff6f00';
  @Input() recipientName: string = 'Merchant';
  @Input() tabTheme: string = 'tab2'; // tab1, tab2, tab3, tab4, tab5
  @Output() pinVerified = new EventEmitter<string>();
  @Output() pinCancelled = new EventEmitter<void>();

  pin: string[] = ['', '', '', '', '', ''];
  showError: boolean = false;
  errorMessage: string = '';
  isVerifying: boolean = false;
  showPin: boolean = false;

  // Keypad layout matching UPI style: 3 rows of 3, then bottom row with backspace, 0, submit
  keypadRows = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['backspace', '0', 'submit']
  ];

  constructor(private modalCtrl: ModalController) {}

  get tabThemeConfig() {
    const themes: { [key: string]: { color: string; gradient: string; rgb: string } } = {
      'tab1': { 
        color: '#00aa13', 
        gradient: 'linear-gradient(135deg, #00aa13 0%, #00c853 100%)',
        rgb: '0, 170, 19'
      },
      'tab2': { 
        color: '#ff6f00', 
        gradient: 'linear-gradient(135deg, #ff6f00 0%, #ff8f00 100%)',
        rgb: '255, 111, 0'
      },
      'tab3': { 
        color: '#4a00e0', 
        gradient: 'linear-gradient(135deg, #4a00e0 0%, #8e2de2 100%)',
        rgb: '74, 0, 224'
      },
      'tab4': { 
        color: '#d32f2f', 
        gradient: 'linear-gradient(135deg, #d32f2f 0%, #ff5252 100%)',
        rgb: '211, 47, 47'
      },
      'tab5': { 
        color: '#004d40', 
        gradient: 'linear-gradient(135deg, #004d40 0%, #00897b 100%)',
        rgb: '0, 77, 64'
      }
    };
    return themes[this.tabTheme] || themes['tab2'];
  }

  onNumberClick(num: string) {
    if (this.isVerifying) return;
    
    const emptyIndex = this.pin.findIndex(digit => digit === '');
    if (emptyIndex !== -1) {
      this.pin[emptyIndex] = num;
      this.showError = false;
      // NO AUTO-SUBMIT - user must click submit button
    }
  }

  onBackspace() {
    if (this.isVerifying) return;
    
    const lastFilledIndex = this.pin.map((d, i) => d !== '' ? i : -1).filter(i => i !== -1).pop();
    if (lastFilledIndex !== undefined && lastFilledIndex >= 0) {
      this.pin[lastFilledIndex] = '';
      this.showError = false;
    }
  }

  handleKeypadClick(key: string) {
    if (key === 'backspace') {
      this.onBackspace();
    } else if (key === 'submit') {
      this.verifyPin();
    } else if (key !== '') {
      this.onNumberClick(key);
    }
  }

  togglePinVisibility() {
    this.showPin = !this.showPin;
  }

  verifyPin() {
    const enteredPin = this.pin.join('');
    
    if (enteredPin.length !== 6) {
      this.showError = true;
      this.errorMessage = 'Please enter 6 digits';
      return;
    }

    this.isVerifying = true;
    this.showError = false;

    // Simulate PIN verification
    setTimeout(() => {
      const isValid = enteredPin.length === 6; // Replace with actual PIN verification
      
      if (isValid) {
        this.pinVerified.emit(enteredPin);
        this.modalCtrl.dismiss({ verified: true, pin: enteredPin });
      } else {
        this.showError = true;
        this.errorMessage = 'Incorrect PIN. Please try again.';
        this.clearPin();
        this.isVerifying = false;
      }
    }, 800);
  }

  clearPin() {
    this.pin = ['', '', '', '', '', ''];
    this.showError = false;
    this.isVerifying = false;
  }

  cancel() {
    this.pinCancelled.emit();
    this.modalCtrl.dismiss({ verified: false, cancelled: true });
  }

  get canSubmit(): boolean {
    return this.pin.every(digit => digit !== '') && !this.isVerifying;
  }

  getRecipientName(): string {
    return this.recipientName || 'Merchant';
  }

  getPaymentMethodName(): string {
    switch (this.paymentMethod) {
      case 'gopay': return 'goPay';
      case 'card': return 'BANK';
      case 'upi': return 'UPI';
      case 'netbanking': return 'BANK';
      case 'send': return 'goPay';
      case 'request': return 'goPay';
      default: return 'BANK';
    }
  }
}
