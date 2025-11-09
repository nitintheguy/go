import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

interface GroceryItem {
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
  imports: [CommonModule, IonicModule, RouterModule]
})
export class Tab1Page implements OnInit {
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
      name: 'Fresh Eggs', 
      image: 'assets/egg.jpeg', 
      category: 'dairy',
      price: 80,
      weight: '6 pcs',
      rating: 4.7
    },
    { 
      name: 'Banana', 
      image: 'assets/banana.jpeg', 
      category: 'fruits',
      price: 45,
      weight: '1kg',
      rating: 4.4
    },
    { 
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
      icon: '',
      items: [
        { 
          name: 'Basmati Rice', 
          image: 'assets/rice.jpg', 
          price: 120, 
          originalPrice: 140,
          weight: '1kg', 
          rating: 4.5,
          discount: 14
        },
        { 
          name: 'Aashirvaad Atta', 
          image: 'assets/aata.jpeg', 
          price: 280, 
          weight: '5kg', 
          rating: 4.6 
        },
        { 
          name: 'Fortune Oil', 
          image: 'assets/oil.webp', 
          price: 180, 
          originalPrice: 200,
          weight: '1L', 
          rating: 4.4,
          discount: 10
        },
        { 
          name: 'Tata Salt', 
          image: 'assets/salt.jpg', 
          price: 25, 
          weight: '1kg', 
          rating: 4.7 
        },
        { 
          name: 'Sugar', 
          image: 'assets/sugar.jpeg', 
          price: 45, 
          originalPrice: 50,
          weight: '1kg', 
          rating: 4.3,
          discount: 10
        },
        { 
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
      icon: '',
      items: [
        { 
          name: 'Parle-G Biscuits', 
          image: 'assets/biscuit.webp', 
          price: 30, 
          weight: '150g', 
          rating: 4.5 
        },
        { 
          name: 'Cadbury Chocolate', 
          image: 'assets/chocolate.jpeg', 
          price: 50, 
          originalPrice: 60,
          weight: '40g', 
          rating: 4.7,
          discount: 17
        },
        { 
          name: 'Real Juice', 
          image: 'assets/juice.jpeg', 
          price: 99, 
          weight: '1L', 
          rating: 4.4 
        },
        { 
          name: 'Maggi Noodles', 
          image: 'assets/noodles.jpeg', 
          price: 60, 
          originalPrice: 70,
          weight: '280g', 
          rating: 4.6,
          discount: 14
        },
        { 
          name: 'Popcorn', 
          image: 'assets/popcorn.jpeg', 
          price: 35, 
          weight: '100g', 
          rating: 4.2 
        },
        { 
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
      icon: '',
      items: [
        { 
          name: 'Dove Shampoo', 
          image: 'assets/shampoo.jpeg', 
          price: 240, 
          originalPrice: 280,
          weight: '340ml', 
          rating: 4.5,
          discount: 14
        },
        { 
          name: 'Lux Soap', 
          image: 'assets/soap.jpeg', 
          price: 45, 
          weight: '75g', 
          rating: 4.4 
        },
        { 
          name: 'Colgate Paste', 
          image: 'assets/toothpaste.jpeg', 
          price: 85, 
          originalPrice: 95,
          weight: '100g', 
          rating: 4.6,
          discount: 11
        },
        { 
          name: 'Pond\'s Cream', 
          image: 'assets/cream.jpeg', 
          price: 120, 
          weight: '50g', 
          rating: 4.3 
        },
        { 
          name: 'Nivea Deo', 
          image: 'assets/deo.jpeg', 
          price: 180, 
          originalPrice: 200,
          weight: '150ml', 
          rating: 4.5,
          discount: 10
        },
        { 
          name: 'Gillette Razor', 
          image: 'assets/razor.jpeg', 
          price: 220, 
          weight: '4 pcs', 
          rating: 4.7 
        }
      ]
    }
  ];

  searchText = '';

  ngOnInit() {
    this.startPlaceholderAnimation();
  }

  startPlaceholderAnimation() {
    this.currentPlaceholder = this.searchPlaceholders[0];
    
    setInterval(() => {
      this.placeholderIndex = (this.placeholderIndex + 1) % this.searchPlaceholders.length;
      this.currentPlaceholder = this.searchPlaceholders[this.placeholderIndex];
    }, 2000);
  }

  onSearchInput(event: any) {
    this.searchText = event.target.value;
    console.log('Searching for:', this.searchText);
  }

  clearSearch() {
    this.searchText = '';
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
    console.log('Viewing item:', item.name);
  }

  addToCart(item: GroceryItem, event: Event) {
    event.stopPropagation();
    console.log('Added to cart:', item.name);
    // Add cart logic here
  }
}