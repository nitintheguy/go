import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService, CartItem } from '../../services/cart';

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
  description?: string;
  sizes?: { name: string; price: number; weight: string }[];
}

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule]
})
export class ItemComponent implements OnInit {
  item: GroceryItem | null = null;
  selectedSize: string = '';
  quantity: number = 1;
  isCartPulsing = false;
  currentItemInCart: CartItem | null = null;
  selectedPrice: number = 0;

  productData: { [key: string]: GroceryItem } = {
    '1': {
      id: '1',
      name: 'Amul Milk',
      image: 'assets/milk.jpeg',
      category: 'dairy',
      price: 60,
      originalPrice: 65,
      weight: '500ml',
      rating: 4.5,
      discount: 8,
      description: 'Fresh pasteurized milk, rich in calcium and protein. Perfect for daily consumption.',
      sizes: [
        { name: 'Small', price: 60, weight: '500ml' },
        { name: 'Medium', price: 110, weight: '1L' },
        { name: 'Large', price: 200, weight: '2L' }
      ]
    },
    '2': {
      id: '2',
      name: 'Britannia Bread',
      image: 'assets/bread.jpg',
      category: 'bakery',
      price: 40,
      originalPrice: 45,
      weight: '400g',
      rating: 4.3,
      discount: 11,
      description: 'Freshly baked whole wheat bread. Soft and nutritious for healthy breakfast.',
      sizes: [
        { name: 'Regular', price: 40, weight: '400g' },
        { name: 'Family Pack', price: 75, weight: '800g' }
      ]
    },
    '3': {
      id: '3',
      name: 'Fresh Eggs',
      image: 'assets/egg.jpeg',
      category: 'dairy',
      price: 80,
      weight: '6 pcs',
      rating: 4.7,
      description: 'Farm fresh eggs, rich in protein and essential nutrients. Perfect for breakfast.',
      sizes: [
        { name: '6 Eggs', price: 80, weight: '6 pcs' },
        { name: '12 Eggs', price: 150, weight: '12 pcs' },
        { name: '24 Eggs', price: 280, weight: '24 pcs' }
      ]
    },
    '4': {
      id: '4',
      name: 'Banana',
      image: 'assets/banana.jpeg',
      category: 'fruits',
      price: 45,
      weight: '1kg',
      rating: 4.4,
      description: 'Fresh ripe bananas, rich in potassium and natural energy.',
      sizes: [
        { name: 'Half Dozen', price: 25, weight: '500g' },
        { name: 'Dozen', price: 45, weight: '1kg' },
        { name: '2 Dozen', price: 85, weight: '2kg' }
      ]
    },
    '5': {
      id: '5',
      name: 'Coca Cola',
      image: 'assets/coke.jpeg',
      category: 'beverages',
      price: 90,
      originalPrice: 99,
      weight: '2L',
      rating: 4.6,
      discount: 9,
      description: 'Refreshing carbonated beverage. Perfect for parties and gatherings.',
      sizes: [
        { name: '250ml', price: 25, weight: '250ml' },
        { name: '500ml', price: 45, weight: '500ml' },
        { name: '1L', price: 70, weight: '1L' },
        { name: '2L', price: 90, weight: '2L' }
      ]
    },
    '6': {
      id: '6',
      name: 'Lays Chips',
      image: 'assets/chips.jpeg',
      category: 'snacks',
      price: 20,
      weight: '50g',
      rating: 4.2,
      description: 'Crispy potato chips with perfect seasoning. Great snack for movie nights.',
      sizes: [
        { name: 'Small', price: 20, weight: '50g' },
        { name: 'Medium', price: 35, weight: '100g' },
        { name: 'Large', price: 60, weight: '200g' }
      ]
    },
    '7': {
      id: '7',
      name: 'Basmati Rice',
      image: 'assets/rice.jpg',
      category: 'grocery',
      price: 120,
      originalPrice: 140,
      weight: '1kg',
      rating: 4.5,
      discount: 14,
      description: 'Premium quality basmati rice with long grains and aromatic flavor.',
      sizes: [
        { name: '1kg', price: 120, weight: '1kg' },
        { name: '5kg', price: 550, weight: '5kg' },
        { name: '10kg', price: 1000, weight: '10kg' }
      ]
    }
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const itemId = params.get('id');
      if (itemId && this.productData[itemId]) {
        this.item = this.productData[itemId];
        this.selectedSize = this.item.sizes ? this.item.sizes[0].name : '';
        this.updateSelectedPrice();
        this.checkIfItemInCart();
      } else {
        this.router.navigate(['/tabs/tab1']);
      }
    });
  }

  updateSelectedPrice() {
    if (this.item?.sizes) {
      const selectedSizeObj = this.item.sizes.find(size => size.name === this.selectedSize);
      this.selectedPrice = selectedSizeObj ? selectedSizeObj.price : this.item.price;
    } else {
      this.selectedPrice = this.item?.price || 0;
    }
  }

  onSizeChange() {
    this.updateSelectedPrice();
    this.checkIfItemInCart();
  }

  checkIfItemInCart() {
    if (!this.item) return;
    
    const cartItem = this.cartService.getCartItems().find(cartItem => 
      cartItem.item.id === this.item?.id && 
      cartItem.selectedSize === this.selectedSize
    );

    this.currentItemInCart = cartItem || null;

    if (this.currentItemInCart) {
      this.quantity = this.currentItemInCart.quantity;
    } else {
      this.quantity = 1;
    }
  }

  incrementQuantity() {
    this.quantity++;
  }

  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart() {
    if (!this.item) return;

    this.cartService.addToCart(
      { ...this.item, price: this.selectedPrice },
      this.quantity,
      this.selectedSize
    );

    this.showCartAnimation();
    this.checkIfItemInCart();
  }

  removeFromCart() {
    if (!this.item) return;

    this.cartService.removeFromCart(this.item.id, this.selectedSize);
    this.checkIfItemInCart();
  }

  showCartAnimation() {
    this.isCartPulsing = true;
    setTimeout(() => {
      this.isCartPulsing = false;
    }, 600);
  }

  goBack() {
    this.router.navigate(['/tabs/tab1']);
  }

  getCurrentPrice(): number {
    return this.selectedPrice;
  }

  getOriginalPrice(): number | undefined {
    if (this.item?.originalPrice && this.item.sizes) {
      return this.item.originalPrice;
    }
    return this.item?.originalPrice;
  }

  getSelectedWeight(): string {
    if (this.item?.sizes) {
      const selectedSizeObj = this.item.sizes.find(size => size.name === this.selectedSize);
      return selectedSizeObj ? selectedSizeObj.weight : this.item.weight;
    }
    return this.item?.weight || '';
  }

  hasSizes(): boolean {
    return !!(this.item?.sizes && this.item.sizes.length > 0);
  }

  getSizes(): { name: string; price: number; weight: string }[] {
    return this.item?.sizes || [];
  }
}