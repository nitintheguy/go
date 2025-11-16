// services/food-cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isVeg: boolean;
  restaurantId: string;
  restaurantName: string;
  customizations?: FoodCustomization[];
  available: boolean;
}

export interface FoodCustomization {
  name: string;
  options: { name: string; price: number }[];
  required: boolean;
  multiple: boolean;
  selectedOptions?: string[];
}

export interface FoodCartItem {
  item: FoodItem;
  quantity: number;
  customizations: FoodCustomization[];
  specialInstructions?: string;
  totalPrice: number;
}

export interface FoodOrder {
  id: string;
  items: FoodCartItem[];
  total: number;
  status: 'preparing' | 'on_the_way' | 'delivered' | 'cancelled';
  restaurantId: string;
  restaurantName: string;
  deliveryAddress: string;
  paymentMethod: string;
  orderTime: Date;
  estimatedDelivery: Date;
}

@Injectable({
  providedIn: 'root',
})
export class FoodCart {
  private cartItems: FoodCartItem[] = [];
  private orders: FoodOrder[] = [];
  
  private cartSubject = new BehaviorSubject<FoodCartItem[]>([]);
  private cartTotalSubject = new BehaviorSubject<number>(0);
  private cartCountSubject = new BehaviorSubject<number>(0);

  // Observables for components to subscribe to
  cartItems$ = this.cartSubject.asObservable();
  cartTotal$ = this.cartTotalSubject.asObservable();
  cartCount$ = this.cartCountSubject.asObservable();

  constructor() {
    this.loadCartFromStorage();
    this.loadOrdersFromStorage();
  }

  // Add item to cart with customizations
  addToCart(item: FoodItem, quantity: number = 1, customizations: FoodCustomization[] = [], specialInstructions: string = ''): void {
    // Check if we're adding from same restaurant
    if (!this.isSameRestaurant(item.restaurantId) && this.cartItems.length > 0) {
      throw new Error('Cannot add items from different restaurants. Please clear your cart first.');
    }

    // Calculate total price including customizations
    const basePrice = item.price;
    const customizationPrice = this.calculateCustomizationPrice(customizations);
    const totalPrice = (basePrice + customizationPrice) * quantity;

    const cartItem: FoodCartItem = {
      item: { ...item },
      quantity,
      customizations: JSON.parse(JSON.stringify(customizations)), // Deep clone
      specialInstructions,
      totalPrice
    };

    this.cartItems.push(cartItem);
    this.saveCart();
    this.updateCartData();
  }

  // Remove item from cart by index
  removeFromCart(itemIndex: number): void {
    if (itemIndex >= 0 && itemIndex < this.cartItems.length) {
      this.cartItems.splice(itemIndex, 1);
      this.saveCart();
      this.updateCartData();
    }
  }

  // Update quantity of an item
  updateQuantity(itemIndex: number, quantity: number): void {
    if (itemIndex >= 0 && itemIndex < this.cartItems.length) {
      if (quantity > 0) {
        this.cartItems[itemIndex].quantity = quantity;
        // Recalculate total price
        const basePrice = this.cartItems[itemIndex].item.price;
        const customizationPrice = this.calculateCustomizationPrice(this.cartItems[itemIndex].customizations);
        this.cartItems[itemIndex].totalPrice = (basePrice + customizationPrice) * quantity;
        
        this.saveCart();
        this.updateCartData();
      } else {
        this.removeFromCart(itemIndex);
      }
    }
  }

  // Get all cart items
  getCartItems(): FoodCartItem[] {
    return [...this.cartItems];
  }

  // Get cart total amount
  getCartTotal(): number {
    return this.cartItems.reduce((total, cartItem) => total + cartItem.totalPrice, 0);
  }

  // Get total number of items in cart
  getCartItemCount(): number {
    return this.cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
  }

  // Check if all items are from the same restaurant
  isSameRestaurant(restaurantId: string): boolean {
    if (this.cartItems.length === 0) return true;
    return this.cartItems.every(item => item.item.restaurantId === restaurantId);
  }

  // Get current restaurant ID from cart
  getCartRestaurantId(): string | null {
    if (this.cartItems.length === 0) return null;
    const firstRestaurantId = this.cartItems[0].item.restaurantId;
    return this.isSameRestaurant(firstRestaurantId) ? firstRestaurantId : null;
  }

  // Get restaurant name from cart
  getCartRestaurantName(): string | null {
    if (this.cartItems.length === 0) return null;
    return this.cartItems[0].item.restaurantName;
  }

  // Clear the entire cart
  clearCart(): void {
    this.cartItems = [];
    this.saveCart();
    this.updateCartData();
  }

  // Check if cart is empty
  isEmpty(): boolean {
    return this.cartItems.length === 0;
  }

  // Order Management
  createOrder(orderData: Partial<FoodOrder>): FoodOrder {
    const order: FoodOrder = {
      id: 'FOD' + Date.now(),
      items: [...this.cartItems],
      total: this.getCartTotal(),
      status: 'preparing',
      restaurantId: orderData.restaurantId || this.getCartRestaurantId() || '',
      restaurantName: orderData.restaurantName || this.getCartRestaurantName() || '',
      deliveryAddress: orderData.deliveryAddress || '',
      paymentMethod: orderData.paymentMethod || 'cash',
      orderTime: new Date(),
      estimatedDelivery: new Date(Date.now() + 45 * 60000) // 45 minutes from now
    };

    this.orders.unshift(order);
    this.clearCart();
    this.saveOrders();
    return order;
  }

  // Get all orders
  getOrders(): FoodOrder[] {
    return [...this.orders];
  }

  // Get order by ID
  getOrderById(orderId: string): FoodOrder | undefined {
    return this.orders.find(order => order.id === orderId);
  }

  // Update order status
  updateOrderStatus(orderId: string, status: FoodOrder['status']): void {
    const order = this.getOrderById(orderId);
    if (order) {
      order.status = status;
      this.saveOrders();
    }
  }

  // Calculate delivery fee (you can customize this logic)
  calculateDeliveryFee(subtotal: number): number {
    if (subtotal > 299) {
      return 0; // Free delivery above ₹299
    }
    return 30; // Standard delivery fee
  }

  // Calculate tax (5% GST)
  calculateTax(subtotal: number): number {
    return subtotal * 0.05;
  }

  // Private helper methods
  private calculateCustomizationPrice(customizations: FoodCustomization[]): number {
    return customizations.reduce((total, customization) => {
      if (customization.selectedOptions) {
        return total + customization.selectedOptions.reduce((optTotal, optName) => {
          const option = customization.options.find(opt => opt.name === optName);
          return optTotal + (option?.price || 0);
        }, 0);
      }
      return total;
    }, 0);
  }

  private updateCartData(): void {
    this.cartSubject.next([...this.cartItems]);
    this.cartTotalSubject.next(this.getCartTotal());
    this.cartCountSubject.next(this.getCartItemCount());
  }

  private saveCart(): void {
    localStorage.setItem('foodCart', JSON.stringify(this.cartItems));
  }

  private loadCartFromStorage(): void {
    const savedCart = localStorage.getItem('foodCart');
    if (savedCart) {
      try {
        this.cartItems = JSON.parse(savedCart);
        this.updateCartData();
      } catch (error) {
        console.error('Error loading food cart from storage:', error);
        this.cartItems = [];
      }
    }
  }

  private saveOrders(): void {
    localStorage.setItem('foodOrders', JSON.stringify(this.orders));
  }

  private loadOrdersFromStorage(): void {
    const savedOrders = localStorage.getItem('foodOrders');
    if (savedOrders) {
      try {
        this.orders = JSON.parse(savedOrders);
      } catch (error) {
        console.error('Error loading food orders from storage:', error);
        this.orders = [];
      }
    }
  }
}