import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, NavController, ModalController, ToastController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart';
import { FoodCart } from '../../services/food-cart';
import lottie, { AnimationItem } from 'lottie-web';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  restaurantId?: string;
  restaurantName?: string;
}

interface Coupon {
  code: string;
  description: string;
  discount: string;
  validTill: string;
  type: 'percentage' | 'fixed';
  value: number;
}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule]
})
export class CheckoutPage implements OnInit, OnDestroy {
  @Input() isGrocery: boolean = false;
  @Input() cartItems: CartItem[] = [];
  
  // Order details
  subtotal: number = 0;
  deliveryFee: number = 0;
  taxes: number = 0;
  discount: number = 0;
  totalAmount: number = 0;
  
  // Payment
  selectedPaymentMethod: string = 'gopay';
  goPayBalance: number = 1250.50;
  card = { number: '', name: '', expiry: '', cvv: '' };
  upi = { id: '' };
  showPaymentErrors = false;
  
  // Coupon
  couponCode: string = '';
  couponApplied: boolean = false;
  showCoupons: boolean = false;
  
  // Sequence state
  view: 'checkout' | 'orderPlaced' | 'tracking' = 'checkout';
  mapAsset: string = '';
  private mapAnim?: AnimationItem;
  
  // Invoice
  orderId: string = '';
  orderTime: Date | null = null;
  invoiceItems: CartItem[] = [];
  invoiceTotals = { subtotal: 0, deliveryFee: 0, taxes: 0, discount: 0, total: 0 };
  
  availableCoupons: Coupon[] = [
    {
      code: 'WELCOME20',
      description: '20% off on first order',
      discount: '20% OFF',
      validTill: '30 Dec 2024',
      type: 'percentage',
      value: 20
    },
    {
      code: 'FREEDEL',
      description: 'Free delivery on orders above ₹299',
      discount: 'FREE DELIVERY',
      validTill: '15 Jan 2024',
      type: 'fixed',
      value: 0
    },
    {
      code: 'GOFOOD25',
      description: '₹25 off on food orders',
      discount: '₹25 OFF',
      validTill: '25 Dec 2024',
      type: 'fixed',
      value: 25
    }
  ];
  
  // Instructions
  deliveryInstructions: string = '';
  selectedInstructions: string[] = [];
  quickInstructions: string[] = [
    'Leave at door',
    'Call before delivery',
    'No utensils needed',
    'Avoid ringing bell',
    'Leave with security'
  ];

  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private groceryCart: CartService,
    private foodCart: FoodCart,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.calculateOrderTotals();
    this.setDeliveryFee();
    this.mapAsset = this.isGrocery ? 'assets/blinkit-map.json' : 'assets/map.json';
  }

  calculateOrderTotals() {
    this.subtotal = this.cartItems.reduce((total, item) => {
      const price = Number(item.price) || 0;
      const qty = Number(item.quantity) || 0;
      return total + (price * qty);
    }, 0);
    
    this.taxes = Number((this.subtotal * 0.05).toFixed(2)); // 5% tax
    this.totalAmount = Number((this.subtotal + this.deliveryFee + this.taxes - this.discount).toFixed(2));
  }

  setDeliveryFee() {
    if (this.isGrocery) {
      this.deliveryFee = this.subtotal > 299 ? 0 : 40;
    } else {
      this.deliveryFee = this.subtotal > 199 ? 0 : 25;
    }
    this.calculateOrderTotals();
  }

  selectPaymentMethod(method: string) {
    this.selectedPaymentMethod = method;
    this.showPaymentErrors = false;
  }

  applyCoupon() {
    if (this.couponCode && !this.couponApplied) {
      const coupon = this.availableCoupons.find(c => c.code === this.couponCode);
      if (coupon) {
        if (coupon.type === 'percentage') {
          this.discount = Number((this.subtotal * (coupon.value / 100)).toFixed(2));
        } else {
          this.discount = coupon.value;
        }
        this.couponApplied = true;
        this.calculateOrderTotals();
        this.presentToast(`Coupon ${coupon.code} applied successfully!`);
      } else {
        this.presentToast('Invalid coupon code');
      }
    }
  }

  selectCoupon(coupon: Coupon) {
    this.couponCode = coupon.code;
    this.applyCoupon();
  }

  toggleInstruction(instruction: string) {
    const index = this.selectedInstructions.indexOf(instruction);
    if (index > -1) {
      this.selectedInstructions.splice(index, 1);
    } else {
      this.selectedInstructions.push(instruction);
    }
    this.updateDeliveryInstructions();
  }

  updateDeliveryInstructions() {
    this.deliveryInstructions = this.selectedInstructions.join(', ');
  }

  editOrder() {
    this.navCtrl.back();
  }

  editAddress() {
    console.log('Edit address clicked');
  }

  goBack() {
    this.modalCtrl.getTop().then(top => {
      if (top) {
        this.modalCtrl.dismiss();
      } else {
        this.navCtrl.back();
      }
    });
  }

  private validatePayment(): boolean {
    if (this.selectedPaymentMethod === 'card') {
      const valid = !!(this.card.number && this.card.name && this.card.expiry && this.card.cvv);
      this.showPaymentErrors = !valid;
      return valid;
    }
    if (this.selectedPaymentMethod === 'upi') {
      const valid = !!this.upi.id && this.upi.id.includes('@');
      this.showPaymentErrors = !valid;
      return valid;
    }
    return true;
  }

  placeOrder() {
    if (!this.validatePayment()) {
      return;
    }

    // Build invoice snapshot
    const snapshotItems: CartItem[] = this.isGrocery
      ? this.groceryCart.getCartItems().map(ci => ({
          id: ci.item.id, 
          name: ci.item.name, 
          price: ci.item.price,
          quantity: ci.quantity, 
          image: ci.item.image
        }))
      : this.foodCart.getCartItems().map(ci => ({
          id: ci.item.id, 
          name: ci.item.name, 
          price: ci.item.price,
          quantity: ci.quantity, 
          image: ci.item.image,
          restaurantId: ci.item.restaurantId, 
          restaurantName: ci.item.restaurantName
        }));
    
    const sSubtotal = Number(snapshotItems.reduce((t, it) => t + (Number(it.price)||0)*(Number(it.quantity)||0), 0).toFixed(2));
    const sDelivery = this.isGrocery ? (sSubtotal > 299 ? 0 : 40) : (sSubtotal > 199 ? 0 : 25);
    const sTaxes = Number((sSubtotal * 0.05).toFixed(2));
    const sTotal = Number((sSubtotal + sDelivery + sTaxes - this.discount).toFixed(2));
    
    this.invoiceItems = snapshotItems;
    this.invoiceTotals = { 
      subtotal: sSubtotal, 
      deliveryFee: sDelivery, 
      taxes: sTaxes, 
      discount: this.discount, 
      total: sTotal 
    };
    
    this.orderId = (this.isGrocery ? 'GRY' : 'FOD') + Date.now();
    this.orderTime = new Date();

    console.log('Placing order:', {
      id: this.orderId,
      items: this.invoiceItems,
      totals: this.invoiceTotals,
      paymentMethod: this.selectedPaymentMethod,
      createdAt: this.orderTime
    });
    
    // Start sequence
    this.view = 'orderPlaced';
    setTimeout(() => {
      this.view = 'tracking';
      setTimeout(() => this.initLottie(), 100);
      
      // Clear carts
      if (this.isGrocery) {
        this.groceryCart.clearCart();
      } else {
        try { 
          this.foodCart.createOrder({ paymentMethod: this.selectedPaymentMethod }); 
        } catch (e) {
          console.log('Order creation completed');
        }
      }
    }, 3000);
  }

  removeItem(item: CartItem) {
    if (this.isGrocery) {
      this.groceryCart.removeFromCart(item.id);
      this.cartItems = this.groceryCart.getCartItems().map(ci => ({
        id: ci.item.id,
        name: ci.item.name,
        price: ci.item.price,
        quantity: ci.quantity,
        image: ci.item.image
      }));
    } else {
      const idx = this.foodCart.getCartItems().findIndex(ci => ci.item.id === item.id);
      if (idx > -1) {
        this.foodCart.removeFromCart(idx);
      }
      this.cartItems = this.foodCart.getCartItems().map(ci => ({
        id: ci.item.id,
        name: ci.item.name,
        price: ci.item.price,
        quantity: ci.quantity,
        image: ci.item.image,
        restaurantId: ci.item.restaurantId,
        restaurantName: ci.item.restaurantName
      }));
    }
    this.calculateOrderTotals();
    this.setDeliveryFee();
  }

  updateQuantity(item: CartItem, quantity: number) {
    if (quantity <= 0) {
      this.removeItem(item);
      return;
    }
    
    if (this.isGrocery) {
      this.groceryCart.updateQuantity(item.id, quantity);
      this.cartItems = this.groceryCart.getCartItems().map(ci => ({
        id: ci.item.id,
        name: ci.item.name,
        price: ci.item.price,
        quantity: ci.quantity,
        image: ci.item.image
      }));
    } else {
      const idx = this.foodCart.getCartItems().findIndex(ci => ci.item.id === item.id);
      if (idx > -1) {
        this.foodCart.updateQuantity(idx, quantity);
      }
      this.cartItems = this.foodCart.getCartItems().map(ci => ({
        id: ci.item.id,
        name: ci.item.name,
        price: ci.item.price,
        quantity: ci.quantity,
        image: ci.item.image,
        restaurantId: ci.item.restaurantId,
        restaurantName: ci.item.restaurantName
      }));
    }
    this.calculateOrderTotals();
    this.setDeliveryFee();
  }

  toggleCoupons() {
    this.showCoupons = !this.showCoupons;
  }

  // Enhanced Invoice Methods
  getPaymentMethodIcon(): string {
    switch (this.selectedPaymentMethod) {
      case 'gopay': return 'flash';
      case 'card': return 'card';
      case 'upi': return 'phone-portrait';
      case 'netbanking': return 'business';
      case 'cod': return 'cash';
      default: return 'card';
    }
  }

  getPaymentMethodName(): string {
    switch (this.selectedPaymentMethod) {
      case 'gopay': return 'goPay Wallet';
      case 'card': return 'Credit/Debit Card';
      case 'upi': return 'UPI';
      case 'netbanking': return 'Net Banking';
      case 'cod': return 'Cash on Delivery';
      default: return 'Credit/Debit Card';
    }
  }

  getCurrentTime(): Date {
    return new Date();
  }

  getDeliveryTime(): Date {
    const time = new Date();
    time.setMinutes(time.getMinutes() + 15); // 15 minutes from now
    return time;
  }

  getEstimatedDeliveryTime(): Date {
    const time = new Date();
    if (this.isGrocery) {
      // Grocery delivery typically 2-4 hours
      time.setHours(time.getHours() + 3);
    } else {
      // Food delivery typically 30-45 minutes
      time.setMinutes(time.getMinutes() + 45);
    }
    return time;
  }

  downloadInvoice() {
    // Create a simple invoice download simulation
    const invoiceContent = this.generateInvoiceContent();
    const blob = new Blob([invoiceContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `invoice-${this.orderId}.txt`;
    link.click();
    window.URL.revokeObjectURL(url);
    
    this.presentToast('Invoice downloaded successfully!');
  }

  private generateInvoiceContent(): string {
    const items = this.invoiceItems.map(item => 
      `${item.name} x${item.quantity} - ₹${item.price * item.quantity}`
    ).join('\n');
    
    return `
INVOICE - ${this.orderId}
Order Date: ${this.orderTime?.toLocaleString()}
Payment Method: ${this.getPaymentMethodName()}

ITEMS:
${items}

SUMMARY:
Subtotal: ₹${this.invoiceTotals.subtotal}
Delivery Fee: ${this.invoiceTotals.deliveryFee === 0 ? 'FREE' : `₹${this.invoiceTotals.deliveryFee}`}
Taxes: ₹${this.invoiceTotals.taxes}
Discount: -₹${this.invoiceTotals.discount}
Total: ₹${this.invoiceTotals.total}

Delivery Address:
Floor 1st, ASG Apartments
Sector 15, Gandhinagar
Gujarat - 382015

Thank you for your order!
    `.trim();
  }

  contactSupport() {
    // Simulate calling support
    this.presentToast('Connecting to customer support...');
    // In a real app, you might use: window.open('tel:+911234567890', '_self');
    setTimeout(() => {
      this.presentToast('Customer support: +91 98765 43210');
    }, 1000);
  }

  trackOrder() {
    // Navigate to tracking or show tracking info
    if (this.view === 'tracking') {
      this.presentToast('Your order is on the way! Tracking active.');
    } else {
      this.presentToast('Your order is being prepared. Tracking will start soon.');
    }
  }

  private async presentToast(message: string) {
    const t = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'bottom'
    });
    await t.present();
  }

  private initLottie() {
    const container = document.getElementById('trackingMap');
    if (!container) return;
    
    if (this.mapAnim) {
      this.mapAnim.destroy();
    }
    
    this.mapAnim = lottie.loadAnimation({
      container,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: this.mapAsset
    });
  }

  ngOnDestroy(): void {
    if (this.mapAnim) {
      this.mapAnim.destroy();
    }
  }
}