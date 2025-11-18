import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface GroceryItem {
  id: string;
  name: string;
  image: string;
  category?: string;
  price: number;
  originalPrice?: number;
  weight: string;
  rating: number;
  discount?: number;
}

export interface CartItem {
  item: GroceryItem;
  quantity: number;
  selectedSize?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  private cartTotalSubject = new BehaviorSubject<number>(0);
  private cartCountSubject = new BehaviorSubject<number>(0);

  cartItems$ = this.cartSubject.asObservable();
  cartTotal$ = this.cartTotalSubject.asObservable();
  cartCount$ = this.cartCountSubject.asObservable();

  constructor() {
    this.loadCartFromStorage();
  }

  // Add or update item in cart - PROPERLY FIXED VERSION
  addToCart(item: GroceryItem, quantity: number = 1, selectedSize?: string): void {
    const existingItemIndex = this.cartItems.findIndex(cartItem => 
      cartItem.item.id === item.id && 
      cartItem.selectedSize === selectedSize
    );

    if (existingItemIndex > -1) {
      // If item exists, increment the quantity by the provided amount
      this.cartItems[existingItemIndex].quantity += quantity;
    } else {
      // If item doesn't exist, add it with the provided quantity
      const cartItem: CartItem = {
        item: { ...item },
        quantity: quantity,
        selectedSize
      };
      this.cartItems.push(cartItem);
    }

    this.saveCart();
    this.updateCartData();
  }

  // Remove item from cart
  removeFromCart(itemId: string, selectedSize?: string): void {
    this.cartItems = this.cartItems.filter(cartItem => 
      !(cartItem.item.id === itemId && cartItem.selectedSize === selectedSize)
    );
    
    this.saveCart();
    this.updateCartData();
  }

  // Update quantity of existing item
  updateQuantity(itemId: string, quantity: number, selectedSize?: string): void {
    const existingItem = this.cartItems.find(cartItem => 
      cartItem.item.id === itemId && 
      cartItem.selectedSize === selectedSize
    );

    if (existingItem) {
      if (quantity > 0) {
        existingItem.quantity = quantity;
      } else {
        this.removeFromCart(itemId, selectedSize);
        return;
      }
    }

    this.saveCart();
    this.updateCartData();
  }

  // Get current cart items
  getCartItems(): CartItem[] {
    return [...this.cartItems];
  }

  // Get cart total
  getCartTotal(): number {
    const total = this.cartItems.reduce((total, cartItem) => {
      const price = Number(cartItem.item.price) || 0;
      const quantity = Number(cartItem.quantity) || 0;
      const itemTotal = price * quantity;
      return total + (isNaN(itemTotal) ? 0 : itemTotal);
    }, 0);
    return isNaN(total) ? 0 : Number(total.toFixed(2));
  }

  // Get cart item count
  getCartItemCount(): number {
    const count = this.cartItems.reduce((total, cartItem) => {
      const quantity = Number(cartItem.quantity) || 0;
      return total + (isNaN(quantity) ? 0 : quantity);
    }, 0);
    return isNaN(count) ? 0 : count;
  }

  // Check if item is in cart
  isItemInCart(itemId: string, selectedSize?: string): boolean {
    return this.cartItems.some(cartItem => 
      cartItem.item.id === itemId && 
      cartItem.selectedSize === selectedSize
    );
  }

  // Get quantity of specific item
  getItemQuantity(itemId: string, selectedSize?: string): number {
    const cartItem = this.cartItems.find(cartItem => 
      cartItem.item.id === itemId && 
      cartItem.selectedSize === selectedSize
    );
    return cartItem ? cartItem.quantity : 0;
  }

  // Clear entire cart
  clearCart(): void {
    this.cartItems = [];
    this.saveCart();
    this.updateCartData();
  }

  // Private methods
  private updateCartData(): void {
    this.cartSubject.next([...this.cartItems]);
    this.cartTotalSubject.next(this.getCartTotal());
    this.cartCountSubject.next(this.getCartItemCount());
  }

  private saveCart(): void {
    localStorage.setItem('groceryCart', JSON.stringify(this.cartItems));
  }

  private loadCartFromStorage(): void {
    const savedCart = localStorage.getItem('groceryCart');
    if (savedCart) {
      try {
        this.cartItems = JSON.parse(savedCart);
        this.updateCartData();
      } catch (error) {
        console.error('Error loading cart from storage:', error);
        this.cartItems = [];
      }
    }
  }
}