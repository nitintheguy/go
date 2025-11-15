import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CartService, CartItem } from '../services/cart';

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

interface GroceryCategory {
  name: string;
  icon: string;
  items: GroceryItem[];
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule, FormsModule]
})
export class Tab1Page implements OnInit, OnDestroy {
  searchPlaceholders = [
    'Search "Snacks"',
    'Search "Coke"',
    'Search "Milk"',
    'Search "Bread"',
    'Search "Eggs"',
    'Search "Fruits"'
  ];
  currentPlaceholder = '';
  placeholderIndex = 0;
  
  cartItems: CartItem[] = [];
  cartTotal = 0;
  cartItemCount = 0;
  showCartBubble = false;
  isCartPulsing = false;

  // Search functionality
  searchText = '';
  searchResults: GroceryItem[] = [];
  isSearching = false;
  showSearchResults = false;

  categories = [
    { name: 'All', icon: 'apps' },
    { name: 'Electronics', icon: 'hardware-chip' },
    { name: 'Beauty', icon: 'sparkles' },
    { name: 'Winter', icon: 'snow' },
    { name: 'Decor', icon: 'home' },
    { name: 'Kitchen', icon: 'restaurant' },
    { name: 'Pharma', icon: 'medical' },
    { name: 'Fashion', icon: 'shirt' }
  ];

  quickCategories = [
    { name: 'Fruits', icon: 'nutrition', color: '#4caf50' },
    { name: 'Vegetables', icon: 'leaf', color: '#8bc34a' },
    { name: 'Dairy', icon: 'water', color: '#2196f3' },
    { name: 'Snacks', icon: 'fast-food', color: '#ff9800' },
    { name: 'Beverages', icon: 'cafe', color: '#795548' },
    { name: 'Personal Care', icon: 'body', color: '#e91e63' },
    { name: 'Cleaning', icon: 'sparkles', color: '#00bcd4' },
    { name: 'Baby Care', icon: 'heart', color: '#ff4081' }
  ];

  frequentItems: GroceryItem[] = [
    { 
      id: '1',
      name: 'Amul Milk', 
      image: 'assets/milk.jpeg', 
      category: 'dairy',
      price: 60,
      originalPrice: 65,
      weight: '500ml',
      rating: 4.5,
      discount: 8
    },
    { 
      id: '2',
      name: 'Britannia Bread', 
      image: 'assets/bread.jpg', 
      category: 'bakery',
      price: 40,
      originalPrice: 45,
      weight: '400g',
      rating: 4.3,
      discount: 11
    },
    { 
      id: '3',
      name: 'Fresh Eggs', 
      image: 'assets/egg.jpeg', 
      category: 'dairy',
      price: 80,
      weight: '6 pcs',
      rating: 4.7
    },
    { 
      id: '4',
      name: 'Banana', 
      image: 'assets/banana.jpeg', 
      category: 'fruits',
      price: 45,
      weight: '1kg',
      rating: 4.4
    },
    { 
      id: '5',
      name: 'Coca Cola', 
      image: 'assets/coke.jpeg', 
      category: 'beverages',
      price: 90,
      originalPrice: 99,
      weight: '2L',
      rating: 4.6,
      discount: 9
    },
    { 
      id: '6',
      name: 'Lays Chips', 
      image: 'assets/chips.jpeg', 
      category: 'snacks',
      price: 20,
      weight: '50g',
      rating: 4.2
    }
  ];

  groceryCategories: GroceryCategory[] = [
    {
      name: 'Grocery & Kitchen',
      icon: 'restaurant',
      items: [
        { 
          id: '7',
          name: 'Basmati Rice', 
          image: 'assets/rice.jpg', 
          price: 120, 
          originalPrice: 140,
          weight: '1kg', 
          rating: 4.5,
          discount: 14
        },
        { 
          id: '8',
          name: 'Aashirvaad Atta', 
          image: 'assets/aata.jpeg', 
          price: 280, 
          weight: '5kg', 
          rating: 4.6 
        },
        { 
          id: '9',
          name: 'Fortune Oil', 
          image: 'assets/oil.webp', 
          price: 180, 
          originalPrice: 200,
          weight: '1L', 
          rating: 4.4,
          discount: 10
        },
        { 
          id: '10',
          name: 'Tata Salt', 
          image: 'assets/salt.jpg', 
          price: 25, 
          weight: '1kg', 
          rating: 4.7 
        },
        { 
          id: '11',
          name: 'Sugar', 
          image: 'assets/sugar.jpeg', 
          price: 45, 
          originalPrice: 50,
          weight: '1kg', 
          rating: 4.3,
          discount: 10
        },
        { 
          id: '12',
          name: 'Taj Mahal Tea', 
          image: 'assets/tea.jpeg', 
          price: 150, 
          weight: '250g', 
          rating: 4.8 
        }
      ]
    },
    {
      name: 'Snacks & Drinks',
      icon: 'fast-food',
      items: [
        { 
          id: '13',
          name: 'Parle-G Biscuits', 
          image: 'assets/biscuit.webp', 
          price: 30, 
          weight: '150g', 
          rating: 4.5 
        },
        { 
          id: '14',
          name: 'Cadbury Chocolate', 
          image: 'assets/chocolate.jpeg', 
          price: 50, 
          originalPrice: 60,
          weight: '40g', 
          rating: 4.7,
          discount: 17
        },
        { 
          id: '15',
          name: 'Real Juice', 
          image: 'assets/juice.jpeg', 
          price: 99, 
          weight: '1L', 
          rating: 4.4 
        },
        { 
          id: '16',
          name: 'Maggi Noodles', 
          image: 'assets/noodles.jpeg', 
          price: 60, 
          originalPrice: 70,
          weight: '280g', 
          rating: 4.6,
          discount: 14
        },
        { 
          id: '17',
          name: 'Popcorn', 
          image: 'assets/popcorn.jpeg', 
          price: 35, 
          weight: '100g', 
          rating: 4.2 
        },
        { 
          id: '18',
          name: 'Monster Energy', 
          image: 'assets/monster.jpeg', 
          price: 120, 
          weight: '500ml', 
          rating: 4.3 
        }
      ]
    },
    {
      name: 'Personal Care',
      icon: 'body',
      items: [
        { 
          id: '19',
          name: 'Dove Shampoo', 
          image: 'assets/shampoo.jpeg', 
          price: 240, 
          originalPrice: 280,
          weight: '340ml', 
          rating: 4.5,
          discount: 14
        },
        { 
          id: '20',
          name: 'Lux Soap', 
          image: 'assets/soap.jpeg', 
          price: 45, 
          weight: '75g', 
          rating: 4.4 
        },
        { 
          id: '21',
          name: 'Colgate Paste', 
          image: 'assets/toothpaste.jpeg', 
          price: 85, 
          originalPrice: 95,
          weight: '100g', 
          rating: 4.6,
          discount: 11
        },
        { 
          id: '22',
          name: 'Pond\'s Cream', 
          image: 'assets/cream.jpeg', 
          price: 120, 
          weight: '50g', 
          rating: 4.3 
        },
        { 
          id: '23',
          name: 'Nivea Deo', 
          image: 'assets/deo.jpeg', 
          price: 180, 
          originalPrice: 200,
          weight: '150ml', 
          rating: 4.5,
          discount: 10
        },
        { 
          id: '24',
          name: 'Gillette Razor', 
          image: 'assets/razor.jpeg', 
          price: 220, 
          weight: '4 pcs', 
          rating: 4.7 
        }
      ]
    }
  ];

  private cartSubscription!: Subscription;

  constructor(
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.startPlaceholderAnimation();
    this.subscribeToCartUpdates();
  }

  ngOnDestroy() {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  subscribeToCartUpdates() {
    this.cartSubscription = this.cartService.cartItems$.subscribe((items: CartItem[]) => {
      this.cartItems = items;
      this.updateCartTotals();
    });
  }

  startPlaceholderAnimation() {
    this.currentPlaceholder = this.searchPlaceholders[0];
    
    setInterval(() => {
      this.placeholderIndex = (this.placeholderIndex + 1) % this.searchPlaceholders.length;
      this.currentPlaceholder = this.searchPlaceholders[this.placeholderIndex];
    }, 2000);
  }

  onSearchInput(event: any) {
    const searchTerm = event.target.value.toLowerCase().trim();
    this.searchText = searchTerm;
    
    if (searchTerm.length === 0) {
      this.showSearchResults = false;
      this.searchResults = [];
      return;
    }

    this.isSearching = true;
    
    setTimeout(() => {
      this.performSearch(searchTerm);
      this.isSearching = false;
    }, 300);
  }

  performSearch(searchTerm: string) {
    const allItems = [
      ...this.frequentItems,
      ...this.groceryCategories.reduce((acc: GroceryItem[], category: GroceryCategory) => {
        return acc.concat(category.items);
      }, [])
    ];

    this.searchResults = allItems.filter((item: GroceryItem) => 
      item.name.toLowerCase().includes(searchTerm) ||
      (item.category && item.category.toLowerCase().includes(searchTerm)) ||
      item.weight.toLowerCase().includes(searchTerm)
    );

    this.showSearchResults = true;
  }

  clearSearch() {
    this.searchText = '';
    this.showSearchResults = false;
    this.searchResults = [];
  }

  filterByCategory(category: string) {
    console.log('Filtering by category:', category);
  }

  viewAllFrequent() {
    console.log('Viewing all frequent items');
  }

  viewCategory(category: GroceryCategory) {
    console.log('Viewing category:', category.name);
  }

  viewItem(item: GroceryItem) {
    this.router.navigate(['/item', item.id]);
  }

 addToCart(item: GroceryItem, event: Event) {
  event.stopPropagation();
  
  // Use the main addToCart method with default quantity of 1
  this.cartService.addToCart(item, 1);
  this.showCartAnimation();
  
  console.log('Added to cart:', item.name);
}

  decrementQuantity(itemId: string, event: Event) {
    event.stopPropagation();
    
    const currentQuantity = this.cartService.getItemQuantity(itemId);
    
    if (currentQuantity > 1) {
      this.cartService.updateQuantity(itemId, currentQuantity - 1);
    } else {
      this.cartService.removeFromCart(itemId);
    }
  }

  getItemQuantity(itemId: string): number {
    return this.cartService.getItemQuantity(itemId);
  }

  updateCartTotals() {
    this.cartItemCount = this.cartService.getCartItemCount();
    this.cartTotal = this.cartService.getCartTotal();
    this.showCartBubble = this.cartItemCount > 0;
  }

  showCartAnimation() {
    this.isCartPulsing = true;
    setTimeout(() => {
      this.isCartPulsing = false;
    }, 600);
  }

  clearCart() {
    this.cartService.clearCart();
  }

  viewCart() {
    console.log('Viewing cart with', this.cartItemCount, 'items');
  }

  isItemInCart(itemId: string): boolean {
    return this.cartService.isItemInCart(itemId);
  }
}