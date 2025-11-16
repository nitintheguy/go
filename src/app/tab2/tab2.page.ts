import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FoodCart, FoodItem, FoodCartItem } from '../services/food-cart';
import { RestaurantProductsPage } from '../pages/restaurant-products/restaurant-products.page';
import { CheckoutPage } from '../pages/checkout/checkout.page'; // Add this import

interface Restaurant {
  id: string;
  name: string;
  image: string;
  rating: number;
  deliveryTime: string;
  cuisine: string;
  minOrder: number;
  freeDelivery: boolean;
  pureVeg: boolean;
  discount: number;
  distance: string;
  menu?: FoodItem[];
}

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule, FormsModule]
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

  // Cart properties
  cartItems: FoodCartItem[] = [];
  cartTotal = 0;
  cartItemCount = 0;
  showCartBubble = false;
  isCartPulsing = false;

  // Search properties
  searchText = '';
  isSearching = false;
  showSearchResults = false;
  searchResults: Restaurant[] = [];

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

  topRestaurants: Restaurant[] = [
    {
      id: '1',
      name: 'The Pizza Place',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300',
      rating: 4.5,
      deliveryTime: '25-35 min',
      cuisine: 'Pizza, Italian',
      minOrder: 199,
      freeDelivery: true,
      pureVeg: false,
      discount: 20,
      distance: '2.1 km',
      menu: [
        {
          id: 'p1',
          name: 'Margherita Pizza',
          description: 'Classic pizza with tomato sauce, mozzarella, and basil',
          price: 299,
          image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=200',
          category: 'Pizza',
          isVeg: true,
          restaurantId: '1',
          restaurantName: 'The Pizza Place',
          available: true,
          customizations: [
            {
              name: 'Size',
              required: true,
              multiple: false,
              options: [
                { name: 'Medium', price: 0 },
                { name: 'Large', price: 100 }
              ]
            }
          ]
        },
        {
          id: 'p2',
          name: 'Pepperoni Pizza',
          description: 'Spicy pepperoni with extra cheese and herbs',
          price: 349,
          image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=200',
          category: 'Pizza',
          isVeg: false,
          restaurantId: '1',
          restaurantName: 'The Pizza Place',
          available: true
        },
        {
          id: 'p3',
          name: 'Veg Supreme Pizza',
          description: 'Loaded with fresh vegetables and olives',
          price: 379,
          image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=200',
          category: 'Pizza',
          isVeg: true,
          restaurantId: '1',
          restaurantName: 'The Pizza Place',
          available: true
        },
        {
          id: 'p4',
          name: 'BBQ Chicken Pizza',
          description: 'Grilled chicken with BBQ sauce and onions',
          price: 399,
          image: 'https://images.unsplash.com/photo-1595708684082-a173bb3a06c5?w=200',
          category: 'Pizza',
          isVeg: false,
          restaurantId: '1',
          restaurantName: 'The Pizza Place',
          available: true
        },
        {
          id: 'p5',
          name: 'Garlic Bread',
          description: 'Freshly baked with garlic butter and herbs',
          price: 129,
          image: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=200',
          category: 'Sides',
          isVeg: true,
          restaurantId: '1',
          restaurantName: 'The Pizza Place',
          available: true
        },
        {
          id: 'p6',
          name: 'Chocolate Lava Cake',
          description: 'Warm chocolate cake with molten center',
          price: 179,
          image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=200',
          category: 'Desserts',
          isVeg: true,
          restaurantId: '1',
          restaurantName: 'The Pizza Place',
          available: true
        },
        {
          id: 'p7',
          name: 'Coca Cola',
          description: '500ml chilled beverage',
          price: 60,
          image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=200',
          category: 'Drinks',
          isVeg: true,
          restaurantId: '1',
          restaurantName: 'The Pizza Place',
          available: true
        },
        {
          id: 'p8',
          name: 'Mozzarella Sticks',
          description: 'Crispy fried cheese sticks with marinara sauce',
          price: 199,
          image: 'https://images.unsplash.com/photo-1562967916-eb82221dfb92?w=200',
          category: 'Sides',
          isVeg: true,
          restaurantId: '1',
          restaurantName: 'The Pizza Place',
          available: true
        }
      ]
    },
    {
      id: '2',
      name: 'Burger Queen',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300',
      rating: 4.2,
      deliveryTime: '20-30 min',
      cuisine: 'Burgers, Fast Food',
      minOrder: 149,
      freeDelivery: true,
      pureVeg: false,
      discount: 15,
      distance: '1.8 km',
      menu: [
        {
          id: 'b1',
          name: 'Classic Cheese Burger',
          description: 'Juicy beef patty with cheese, lettuce, and special sauce',
          price: 189,
          image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200',
          category: 'Burgers',
          isVeg: false,
          restaurantId: '2',
          restaurantName: 'Burger Queen',
          available: true
        },
        {
          id: 'b2',
          name: 'Chicken Burger',
          description: 'Crispy chicken fillet with mayo and veggies',
          price: 169,
          image: 'https://images.unsplash.com/photo-1606755962773-d324e383324b?w=200',
          category: 'Burgers',
          isVeg: false,
          restaurantId: '2',
          restaurantName: 'Burger Queen',
          available: true
        },
        {
          id: 'b3',
          name: 'Veg Supreme Burger',
          description: 'Grilled veg patty with fresh vegetables',
          price: 159,
          image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=200',
          category: 'Burgers',
          isVeg: true,
          restaurantId: '2',
          restaurantName: 'Burger Queen',
          available: true
        },
        {
          id: 'b4',
          name: 'Double Cheese Burger',
          description: 'Double beef patty with extra cheese',
          price: 249,
          image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=200',
          category: 'Burgers',
          isVeg: false,
          restaurantId: '2',
          restaurantName: 'Burger Queen',
          available: true
        },
        {
          id: 'b5',
          name: 'French Fries',
          description: 'Crispy golden fries with seasoning',
          price: 99,
          image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=200',
          category: 'Sides',
          isVeg: true,
          restaurantId: '2',
          restaurantName: 'Burger Queen',
          available: true
        },
        {
          id: 'b6',
          name: 'Onion Rings',
          description: 'Crispy battered onion rings',
          price: 119,
          image: 'https://images.unsplash.com/photo-1636567821810-4d5ba5d7e2c1?w=200',
          category: 'Sides',
          isVeg: true,
          restaurantId: '2',
          restaurantName: 'Burger Queen',
          available: true
        },
        {
          id: 'b7',
          name: 'Chocolate Shake',
          description: 'Creamy chocolate milkshake',
          price: 149,
          image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=200',
          category: 'Drinks',
          isVeg: true,
          restaurantId: '2',
          restaurantName: 'Burger Queen',
          available: true
        },
        {
          id: 'b8',
          name: 'Ice Cream Sundae',
          description: 'Vanilla ice cream with chocolate sauce',
          price: 129,
          image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=200',
          category: 'Desserts',
          isVeg: true,
          restaurantId: '2',
          restaurantName: 'Burger Queen',
          available: true
        }
      ]
    },
    {
      id: '3',
      name: 'Sushi Central',
      image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=300',
      rating: 4.8,
      deliveryTime: '35-45 min',
      cuisine: 'Sushi, Japanese',
      minOrder: 299,
      freeDelivery: false,
      pureVeg: false,
      discount: 10,
      distance: '3.2 km',
      menu: [
        {
          id: 's1',
          name: 'California Roll',
          description: 'Crab, avocado, and cucumber roll',
          price: 399,
          image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=200',
          category: 'Sushi',
          isVeg: false,
          restaurantId: '3',
          restaurantName: 'Sushi Central',
          available: true
        },
        {
          id: 's2',
          name: 'Salmon Sashimi',
          description: 'Fresh salmon slices with wasabi',
          price: 499,
          image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=200',
          category: 'Sushi',
          isVeg: false,
          restaurantId: '3',
          restaurantName: 'Sushi Central',
          available: true
        },
        {
          id: 's3',
          name: 'Dragon Roll',
          description: 'Eel and avocado with special sauce',
          price: 459,
          image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=200',
          category: 'Sushi',
          isVeg: false,
          restaurantId: '3',
          restaurantName: 'Sushi Central',
          available: true
        },
        {
          id: 's4',
          name: 'Vegetable Roll',
          description: 'Fresh vegetables with rice',
          price: 329,
          image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=200',
          category: 'Sushi',
          isVeg: true,
          restaurantId: '3',
          restaurantName: 'Sushi Central',
          available: true
        },
        {
          id: 's5',
          name: 'Miso Soup',
          description: 'Traditional Japanese soup',
          price: 129,
          image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=200',
          category: 'Sides',
          isVeg: true,
          restaurantId: '3',
          restaurantName: 'Sushi Central',
          available: true
        },
        {
          id: 's6',
          name: 'Edamame',
          description: 'Steamed soybeans with salt',
          price: 149,
          image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=200',
          category: 'Sides',
          isVeg: true,
          restaurantId: '3',
          restaurantName: 'Sushi Central',
          available: true
        },
        {
          id: 's7',
          name: 'Green Tea',
          description: 'Hot traditional green tea',
          price: 89,
          image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=200',
          category: 'Drinks',
          isVeg: true,
          restaurantId: '3',
          restaurantName: 'Sushi Central',
          available: true
        },
        {
          id: 's8',
          name: 'Mochi Ice Cream',
          description: 'Japanese rice cake with ice cream',
          price: 199,
          image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=200',
          category: 'Desserts',
          isVeg: true,
          restaurantId: '3',
          restaurantName: 'Sushi Central',
          available: true
        }
      ]
    },
    {
      id: '4',
      name: 'Pasta Palace',
      image: 'https://images.unsplash.com/photo-1598866594230-a626a8520334?w=300',
      rating: 4.6,
      deliveryTime: '30-40 min',
      cuisine: 'Italian, Pasta',
      minOrder: 249,
      freeDelivery: true,
      pureVeg: true,
      discount: 25,
      distance: '2.5 km',
      menu: [
        {
          id: 'pa1',
          name: 'Spaghetti Carbonara',
          description: 'Creamy pasta with bacon and parmesan',
          price: 279,
          image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=200',
          category: 'Pasta',
          isVeg: false,
          restaurantId: '4',
          restaurantName: 'Pasta Palace',
          available: true
        },
        {
          id: 'pa2',
          name: 'Fettuccine Alfredo',
          description: 'Creamy white sauce with fettuccine',
          price: 299,
          image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=200',
          category: 'Pasta',
          isVeg: true,
          restaurantId: '4',
          restaurantName: 'Pasta Palace',
          available: true
        },
        {
          id: 'pa3',
          name: 'Lasagna',
          description: 'Layered pasta with cheese and vegetables',
          price: 329,
          image: 'https://images.unsplash.com/photo-1619895092539-1288136c7d0a?w=200',
          category: 'Pasta',
          isVeg: true,
          restaurantId: '4',
          restaurantName: 'Pasta Palace',
          available: true
        },
        {
          id: 'pa4',
          name: 'Penne Arrabbiata',
          description: 'Spicy tomato sauce with penne',
          price: 259,
          image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=200',
          category: 'Pasta',
          isVeg: true,
          restaurantId: '4',
          restaurantName: 'Pasta Palace',
          available: true
        },
        {
          id: 'pa5',
          name: 'Garlic Bread',
          description: 'Toasted bread with garlic butter',
          price: 119,
          image: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=200',
          category: 'Sides',
          isVeg: true,
          restaurantId: '4',
          restaurantName: 'Pasta Palace',
          available: true
        },
        {
          id: 'pa6',
          name: 'Caesar Salad',
          description: 'Fresh greens with caesar dressing',
          price: 199,
          image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=200',
          category: 'Sides',
          isVeg: true,
          restaurantId: '4',
          restaurantName: 'Pasta Palace',
          available: true
        },
        {
          id: 'pa7',
          name: 'Tiramisu',
          description: 'Classic Italian coffee dessert',
          price: 179,
          image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=200',
          category: 'Desserts',
          isVeg: true,
          restaurantId: '4',
          restaurantName: 'Pasta Palace',
          available: true
        },
        {
          id: 'pa8',
          name: 'Red Wine',
          description: 'House red wine glass',
          price: 299,
          image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=200',
          category: 'Drinks',
          isVeg: true,
          restaurantId: '4',
          restaurantName: 'Pasta Palace',
          available: true
        }
      ]
    }
  ];

  allRestaurants: Restaurant[] = [
    ...this.topRestaurants,
    {
      id: '5',
      name: 'Taco Town',
      image: 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=300',
      rating: 4.3,
      deliveryTime: '25-35 min',
      cuisine: 'Mexican, Tacos',
      minOrder: 179,
      freeDelivery: true,
      pureVeg: false,
      discount: 0,
      distance: '2.5 km',
      menu: [
        {
          id: 't1',
          name: 'Beef Tacos',
          description: 'Three crispy tacos with seasoned beef',
          price: 229,
          image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=200',
          category: 'Tacos',
          isVeg: false,
          restaurantId: '5',
          restaurantName: 'Taco Town',
          available: true
        },
        {
          id: 't2',
          name: 'Chicken Tacos',
          description: 'Soft tortillas with grilled chicken',
          price: 219,
          image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=200',
          category: 'Tacos',
          isVeg: false,
          restaurantId: '5',
          restaurantName: 'Taco Town',
          available: true
        },
        {
          id: 't3',
          name: 'Veg Tacos',
          description: 'Fresh vegetables with beans',
          price: 199,
          image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=200',
          category: 'Tacos',
          isVeg: true,
          restaurantId: '5',
          restaurantName: 'Taco Town',
          available: true
        },
        {
          id: 't4',
          name: 'Burrito Bowl',
          description: 'Rice, beans, and toppings in a bowl',
          price: 249,
          image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=200',
          category: 'Tacos',
          isVeg: true,
          restaurantId: '5',
          restaurantName: 'Taco Town',
          available: true
        },
        {
          id: 't5',
          name: 'Nachos',
          description: 'Crispy tortilla chips with cheese',
          price: 179,
          image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=200',
          category: 'Sides',
          isVeg: true,
          restaurantId: '5',
          restaurantName: 'Taco Town',
          available: true
        },
        {
          id: 't6',
          name: 'Guacamole',
          description: 'Fresh avocado dip with chips',
          price: 149,
          image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=200',
          category: 'Sides',
          isVeg: true,
          restaurantId: '5',
          restaurantName: 'Taco Town',
          available: true
        },
        {
          id: 't7',
          name: 'Margarita',
          description: 'Classic tequila cocktail',
          price: 299,
          image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=200',
          category: 'Drinks',
          isVeg: true,
          restaurantId: '5',
          restaurantName: 'Taco Town',
          available: true
        },
        {
          id: 't8',
          name: 'Churros',
          description: 'Fried dough with cinnamon sugar',
          price: 159,
          image: 'https://images.unsplash.com/photo-1580370481825-7bb5a6c6d546?w=200',
          category: 'Desserts',
          isVeg: true,
          restaurantId: '5',
          restaurantName: 'Taco Town',
          available: true
        }
      ]
    },
    {
      id: '6',
      name: 'Healthy Bites',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300',
      rating: 4.9,
      deliveryTime: '20-30 min',
      cuisine: 'Healthy, Salads',
      minOrder: 159,
      freeDelivery: true,
      pureVeg: true,
      discount: 10,
      distance: '1.5 km',
      menu: [
        {
          id: 'h1',
          name: 'Caesar Salad',
          description: 'Fresh romaine lettuce with caesar dressing',
          price: 199,
          image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=200',
          category: 'Salads',
          isVeg: true,
          restaurantId: '6',
          restaurantName: 'Healthy Bites',
          available: true
        },
        {
          id: 'h2',
          name: 'Greek Salad',
          description: 'Cucumber, tomatoes, olives, and feta',
          price: 219,
          image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=200',
          category: 'Salads',
          isVeg: true,
          restaurantId: '6',
          restaurantName: 'Healthy Bites',
          available: true
        },
        {
          id: 'h3',
          name: 'Quinoa Bowl',
          description: 'Protein-packed quinoa with vegetables',
          price: 239,
          image: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=200',
          category: 'Salads',
          isVeg: true,
          restaurantId: '6',
          restaurantName: 'Healthy Bites',
          available: true
        },
        {
          id: 'h4',
          name: 'Avocado Toast',
          description: 'Whole grain bread with mashed avocado',
          price: 179,
          image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=200',
          category: 'Salads',
          isVeg: true,
          restaurantId: '6',
          restaurantName: 'Healthy Bites',
          available: true
        },
        {
          id: 'h5',
          name: 'Fruit Smoothie',
          description: 'Mixed fruits with yogurt and honey',
          price: 149,
          image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=200',
          category: 'Drinks',
          isVeg: true,
          restaurantId: '6',
          restaurantName: 'Healthy Bites',
          available: true
        },
        {
          id: 'h6',
          name: 'Protein Bowl',
          description: 'Chickpeas, beans, and fresh greens',
          price: 259,
          image: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=200',
          category: 'Salads',
          isVeg: true,
          restaurantId: '6',
          restaurantName: 'Healthy Bites',
          available: true
        },
        {
          id: 'h7',
          name: 'Green Detox',
          description: 'Spinach, kale, and apple juice',
          price: 129,
          image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=200',
          category: 'Drinks',
          isVeg: true,
          restaurantId: '6',
          restaurantName: 'Healthy Bites',
          available: true
        },
        {
          id: 'h8',
          name: 'Acai Bowl',
          description: 'Acai berries with granola and fruits',
          price: 279,
          image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=200',
          category: 'Salads',
          isVeg: true,
          restaurantId: '6',
          restaurantName: 'Healthy Bites',
          available: true
        }
      ]
    }
  ];

  // Filtered arrays for display
  filteredTopRestaurants: Restaurant[] = [];
  filteredAllRestaurants: Restaurant[] = [];
  filteredQuickCategories: any[] = [];

  constructor(
    private foodCart: FoodCart,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.startPlaceholderAnimation();
    this.resetFilters();
    this.subscribeToCartUpdates();
  }

  subscribeToCartUpdates() {
    this.foodCart.cartItems$.subscribe(items => {
      const previousCount = this.cartItemCount;
      this.cartItems = items;
      this.cartTotal = this.foodCart.getCartTotal();
      this.cartItemCount = this.foodCart.getCartItemCount();
      
      // Show cart toast when item count increases
      if (this.cartItemCount > previousCount) {
        this.showCartAnimation();
      }
      
      this.showCartBubble = this.cartItemCount > 0;
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
    this.searchText = event.target.value.toLowerCase().trim();
    this.isSearching = this.searchText.length > 0;
    
    if (this.isSearching) {
      this.performSearch();
    } else {
      this.resetFilters();
    }
  }

  performSearch() {
    const searchTerm = this.searchText.toLowerCase();
    
    // Search in top restaurants
    this.filteredTopRestaurants = this.topRestaurants.filter(restaurant => 
      this.restaurantMatchesSearch(restaurant, searchTerm)
    );

    // Search in all restaurants
    this.filteredAllRestaurants = this.allRestaurants.filter(restaurant => 
      this.restaurantMatchesSearch(restaurant, searchTerm)
    );

    // Search in quick categories
    this.filteredQuickCategories = this.quickCategories.filter(category =>
      category.name.toLowerCase().includes(searchTerm)
    );
  }

  restaurantMatchesSearch(restaurant: Restaurant, searchTerm: string): boolean {
    // Search in restaurant name
    if (restaurant.name.toLowerCase().includes(searchTerm)) {
      return true;
    }

    // Search in cuisine type
    if (restaurant.cuisine.toLowerCase().includes(searchTerm)) {
      return true;
    }

    // Search in menu items
    if (restaurant.menu) {
      const matchingMenuItems = restaurant.menu.filter(item =>
        item.name.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm)
      );
      if (matchingMenuItems.length > 0) {
        return true;
      }
    }

    return false;
  }

  resetFilters() {
    this.filteredTopRestaurants = [...this.topRestaurants];
    this.filteredAllRestaurants = [...this.allRestaurants];
    this.filteredQuickCategories = [...this.quickCategories];
  }

  clearSearch() {
    this.searchText = '';
    this.isSearching = false;
    this.resetFilters();
  }

  filterByCategory(category: string) {
    console.log('Filtering by category:', category);
    
    if (category === 'All') {
      this.resetFilters();
      return;
    }

    const categoryLower = category.toLowerCase();
    
    this.filteredTopRestaurants = this.topRestaurants.filter(restaurant =>
      restaurant.cuisine.toLowerCase().includes(categoryLower) ||
      restaurant.name.toLowerCase().includes(categoryLower)
    );

    this.filteredAllRestaurants = this.allRestaurants.filter(restaurant =>
      restaurant.cuisine.toLowerCase().includes(categoryLower) ||
      restaurant.name.toLowerCase().includes(categoryLower)
    );

    this.filteredQuickCategories = this.quickCategories.filter(cat =>
      cat.name.toLowerCase().includes(categoryLower)
    );
  }

  // Quick Bites: open a relevant restaurant menu for this category
  selectQuickCategory(name: string) {
    const key = name.toLowerCase();
    // Find first restaurant that has a menu item matching this quick category
    const match = this.allRestaurants.find(r =>
      r.menu && r.menu.some((item: FoodItem) =>
        (item.category || '').toLowerCase().includes(key) ||
        item.name.toLowerCase().includes(key)
      )
    );

    if (match) {
      this.openRestaurant(match);
    } else {
      // Fallback to simple filter if no menu match found
      this.filterByCategory(name);
    }
  }

  async openRestaurant(restaurant: Restaurant) {
    const modal = await this.modalCtrl.create({
      component: RestaurantProductsPage,
      componentProps: { restaurant },
      breakpoints: [0, 0.75, 1],
      initialBreakpoint: 1
    });
    
    await modal.present();
  }

  // UPDATED: Open checkout for food
  async openCheckout() {
    if (this.cartItems.length === 0) {
      console.log('Cart is empty');
      return;
    }

    const modal = await this.modalCtrl.create({
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
    
    await modal.present();
  }

  // UPDATED: View cart with option to checkout
  async openCart() {
    if (this.cartItems.length === 0) {
      console.log('Cart is empty');
      return;
    }
    
    // For now, directly open checkout
    this.openCheckout();
  }

  updateCartTotals() {
    this.cartItemCount = this.foodCart.getCartItemCount();
    this.cartTotal = this.foodCart.getCartTotal();
    this.showCartBubble = this.cartItemCount > 0;
  }

  showCartAnimation() {
    this.isCartPulsing = true;
    setTimeout(() => {
      this.isCartPulsing = false;
    }, 2000); // Show for 2 seconds
  }

  viewAllTopRestaurants() {
    console.log('Viewing all top restaurants');
  }

  viewAllRestaurants() {
    console.log('Viewing all restaurants');
  }

  // Helper method to check if we have search results
  hasSearchResults(): boolean {
    return this.filteredTopRestaurants.length > 0 || 
           this.filteredAllRestaurants.length > 0 ||
           this.filteredQuickCategories.length > 0;
  }

  // Check if we can add items from this restaurant
  canAddFromRestaurant(restaurantId: string): boolean {
    return this.foodCart.isSameRestaurant(restaurantId);
  }

  // Get current restaurant in cart
  getCartRestaurant(): string | null {
    return this.foodCart.getCartRestaurantName();
  }
}