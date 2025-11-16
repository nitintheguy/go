// pages/restaurant-products/restaurant-products.page.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController, NavParams } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { FoodCart, FoodItem } from '../../services/food-cart';
import { CheckoutPage } from '../checkout/checkout.page';

@Component({
  selector: 'app-restaurant-products',
  templateUrl: './restaurant-products.page.html',
  styleUrls: ['./restaurant-products.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule]
})
export class RestaurantProductsPage implements OnInit {
  restaurant: any;
  selectedCategory = 'All';
  categories: string[] = ['All', 'Pizza', 'Burgers', 'Sides', 'Drinks', 'Desserts', 'Salads', 'Tacos', 'Sushi', 'Pasta'];
  
  // Cart properties
  cartItems: any[] = [];
  cartTotal = 0;
  cartItemCount = 0;
  showCartToast = false;
  cartToastMessage = '';

  constructor(
    private navParams: NavParams,
    private modalCtrl: ModalController,
    private foodCart: FoodCart
  ) {
    this.restaurant = this.navParams.get('restaurant');
  }

  ngOnInit() {
    this.subscribeToCartUpdates();
    this.loadRestaurantMenu();
  }

  subscribeToCartUpdates() {
    this.foodCart.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.cartTotal = this.foodCart.getCartTotal();
      this.cartItemCount = this.foodCart.getCartItemCount();
    });
  }

  loadRestaurantMenu() {
    // Ensure menu items have restaurant info
    if (this.restaurant.menu) {
      this.restaurant.menu = this.restaurant.menu.map((item: FoodItem) => ({
        ...item,
        restaurantId: this.restaurant.id,
        restaurantName: this.restaurant.name
      }));
    }
  }

  get filteredMenu() {
    if (this.selectedCategory === 'All') {
      return this.restaurant.menu || [];
    }
    return (this.restaurant.menu || []).filter((item: FoodItem) => 
      item.category === this.selectedCategory
    );
  }

  addToCart(item: FoodItem) {
    try {
      // Check if we're adding from same restaurant
      if (!this.foodCart.isSameRestaurant(this.restaurant.id) && this.cartItems.length > 0) {
        const confirmClear = confirm(
          'Your cart contains items from another restaurant. Would you like to clear the cart and add items from this restaurant instead?'
        );
        
        if (confirmClear) {
          this.foodCart.clearCart();
        } else {
          return;
        }
      }

      this.foodCart.addToCart(item, 1);
      this.showCartToastMessage('Item added to cart!');
    } catch (error: any) {
      this.showCartToastMessage(error.message);
    }
  }

  incrementQuantity(item: FoodItem) {
    const itemIndex = this.findCartItemIndex(item.id);
    if (itemIndex > -1) {
      const currentQuantity = this.cartItems[itemIndex].quantity;
      this.foodCart.updateQuantity(itemIndex, currentQuantity + 1);
      this.showCartToastMessage('Quantity updated!');
    }
  }

  decrementQuantity(item: FoodItem) {
    const itemIndex = this.findCartItemIndex(item.id);
    if (itemIndex > -1) {
      const currentQuantity = this.cartItems[itemIndex].quantity;
      if (currentQuantity > 1) {
        this.foodCart.updateQuantity(itemIndex, currentQuantity - 1);
        this.showCartToastMessage('Quantity updated!');
      } else {
        this.removeFromCart(item);
      }
    }
  }

  removeFromCart(item: FoodItem) {
    const itemIndex = this.findCartItemIndex(item.id);
    if (itemIndex > -1) {
      this.foodCart.removeFromCart(itemIndex);
      this.showCartToastMessage('Item removed from cart!');
    }
  }

  findCartItemIndex(itemId: string): number {
    return this.cartItems.findIndex(cartItem => cartItem.item.id === itemId);
  }

  isItemInCart(itemId: string): boolean {
    return this.findCartItemIndex(itemId) > -1;
  }

  getItemQuantity(itemId: string): number {
    const itemIndex = this.findCartItemIndex(itemId);
    return itemIndex > -1 ? this.cartItems[itemIndex].quantity : 0;
  }

  showCartToastMessage(message: string) {
    this.cartToastMessage = message;
    this.showCartToast = true;
    setTimeout(() => {
      this.showCartToast = false;
    }, 2000);
  }

  close() {
    this.modalCtrl.dismiss();
  }

  async viewCart() {
    if (this.cartItems.length === 0) {
      this.showCartToastMessage('Cart is empty!');
      return;
    }

    // Close restaurant modal first
    await this.modalCtrl.dismiss();
    
    // Open checkout modal directly
    const checkoutModal = await this.modalCtrl.create({
      component: CheckoutPage,
      componentProps: {
        isGrocery: false,
        cartItems: this.cartItems.map(item => ({
          id: item.item.id,
          name: item.item.name,
          price: item.item.price,
          quantity: item.quantity,
          image: item.item.image,
          restaurantId: item.item.restaurantId,
          restaurantName: item.item.restaurantName
        }))
      },
      breakpoints: [0, 0.75, 1],
      initialBreakpoint: 1
    });
    
    await checkoutModal.present();
  }

  getCartRestaurantName(): string {
    return this.foodCart.getCartRestaurantName() || this.restaurant.name;
  }

  getAvailableCategories(): string[] {
    const categories = new Set<string>(['All']);
    if (this.restaurant.menu) {
      this.restaurant.menu.forEach((item: FoodItem) => {
        categories.add(item.category);
      });
    }
    return Array.from(categories);
  }
}