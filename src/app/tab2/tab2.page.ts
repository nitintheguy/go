import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule]
})
export class Tab2Page implements OnInit {
  searchPlaceholders = [
    'Search "Pizza"',
    'Search "Burger"',
    'Search "Sushi"',
    'Search "Italian"',
    'Search "Mexican"'
  ];
  currentPlaceholder = '';
  placeholderIndex = 0;

  categories = [
    { name: 'All', icon: 'restaurant' },
    { name: 'Pizza', icon: 'pizza' },
    { name: 'Burgers', icon: 'fast-food' },
    { name: 'Asian', icon: 'earth' },
    { name: 'Italian', icon: 'cafe' },
    { name: 'Mexican', icon: 'leaf' },
    { name: 'Healthy', icon: 'fitness' }
  ];

  quickCategories = [
    { name: 'Pizza', icon: 'pizza', color: '#ff6f00' },
    { name: 'Burger', icon: 'fast-food', color: '#ff4081' },
    { name: 'Sushi', icon: 'fish', color: '#2196f3' },
    { name: 'Pasta', icon: 'cafe', color: '#4caf50' },
    { name: 'Tacos', icon: 'bonfire', color: '#ff9800' },
    { name: 'Salad', icon: 'leaf', color: '#8bc34a' },
    { name: 'Dessert', icon: 'ice-cream', color: '#e91e63' },
    { name: 'Coffee', icon: 'cafe', color: '#795548' }
  ];

  topRestaurants = [
    {
      name: 'The Pizza Place',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300',
      rating: 4.5,
      deliveryTime: '25-35 min',
      cuisine: 'Pizza, Italian',
      minOrder: 199,
      freeDelivery: true,
      pureVeg: false,
      discount: 20
    },
    {
      name: 'Burger Queen',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300',
      rating: 4.2,
      deliveryTime: '20-30 min',
      cuisine: 'Burgers, Fast Food',
      minOrder: 149,
      freeDelivery: true,
      pureVeg: false,
      discount: 15
    },
    {
      name: 'Sushi Central',
      image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=300',
      rating: 4.8,
      deliveryTime: '35-45 min',
      cuisine: 'Sushi, Japanese',
      minOrder: 299,
      freeDelivery: false,
      pureVeg: false,
      discount: 10
    },
    {
      name: 'Pasta Palace',
      image: 'https://images.unsplash.com/photo-1598866594230-a626a8520334?w=300',
      rating: 4.6,
      deliveryTime: '30-40 min',
      cuisine: 'Italian, Pasta',
      minOrder: 249,
      freeDelivery: true,
      pureVeg: true,
      discount: 25
    }
  ];

  allRestaurants = [
    {
      name: 'Taco Town',
      image: 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=300',
      rating: 4.3,
      deliveryTime: '25-35 min',
      cuisine: 'Mexican, Tacos',
      minOrder: 179,
      freeDelivery: true,
      pureVeg: false,
      discount: 0
    },
    {
      name: 'Healthy Bites',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300',
      rating: 4.9,
      deliveryTime: '20-30 min',
      cuisine: 'Healthy, Salads',
      minOrder: 159,
      freeDelivery: true,
      pureVeg: true,
      discount: 10
    },
    {
      name: 'Curry House',
      image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=300',
      rating: 4.4,
      deliveryTime: '30-40 min',
      cuisine: 'Indian, Curry',
      minOrder: 199,
      freeDelivery: false,
      pureVeg: true,
      discount: 15
    },
    ...this.topRestaurants
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
    // Add search logic here
    console.log('Searching for:', this.searchText);
  }

  clearSearch() {
    this.searchText = '';
  }

  filterByCategory(category: string) {
    console.log('Filtering by category:', category);
    // Add category filter logic here
  }

  viewAllTopRestaurants() {
    console.log('Viewing all top restaurants');
    // Add navigation logic here
  }

  viewAllRestaurants() {
    console.log('Viewing all restaurants');
    // Add navigation logic here
  }
}