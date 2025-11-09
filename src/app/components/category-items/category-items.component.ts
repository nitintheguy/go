import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

interface CategoryItem {
  name: string;
  price: string;
  originalPrice?: string;
  image: string;
  weight: string;
  rating: number;
  ratingCount: number;
  discount?: number;
  isFavorite?: boolean;
  isBestseller?: boolean;
  isExpress?: boolean;
  isFresh?: boolean;
}

interface Filter {
  name: string;
  active: boolean;
  icon?: string;
}

@Component({
  selector: 'app-category-items',
  templateUrl: './category-items.component.html',
  styleUrls: ['./category-items.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class CategoryItemsComponent implements OnInit {
  categoryName: string | null = null;
  items: CategoryItem[] = [];
  filteredItems: CategoryItem[] = [];
  hasMoreItems: boolean = true;
  
  filters: Filter[] = [
    { name: 'All', active: true, icon: 'grid-outline' },
    { name: 'Popular', active: false, icon: 'flame-outline' },
    { name: 'Discount', active: false, icon: 'pricetag-outline' },
    { name: 'New', active: false, icon: 'sparkles-outline' },
    { name: 'Budget', active: false, icon: 'wallet-outline' },
    { name: 'Express', active: false, icon: 'flash-outline' },
    { name: 'Fresh', active: false, icon: 'leaf-outline' }
  ];

  currentSort: string = 'recommended';

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.categoryName = this.route.snapshot.paramMap.get('name');
    this.loadCategoryItems();
  }

  loadCategoryItems() {
    // Sample data - in real app, fetch from service based on category
    this.items = [
      { 
        name: 'Amul Fresh Milk', 
        price: '₹60', 
        originalPrice: '₹65',
        image: 'assets/milk.jpeg', 
        weight: '500ml',
        rating: 4.5,
        ratingCount: 234,
        discount: 8,
        isFresh: true,
        isExpress: true
      },
      { 
        name: 'Britannia Bread', 
        price: '₹40', 
        originalPrice: '₹45',
        image: 'assets/bread.jpg', 
        weight: '400g',
        rating: 4.3,
        ratingCount: 189,
        discount: 11,
        isBestseller: true
      },
      { 
        name: 'Farm Fresh Eggs', 
        price: '₹80', 
        image: 'assets/egg.jpeg', 
        weight: '6 pcs',
        rating: 4.7,
        ratingCount: 312,
        isFavorite: true,
        isFresh: true,
        isBestseller: true
      },
      { 
        name: 'Organic Banana', 
        price: '₹45', 
        image: 'assets/banana.jpeg', 
        weight: '1kg',
        rating: 4.4,
        ratingCount: 156,
        isFresh: true
      },
      { 
        name: 'Coca Cola', 
        price: '₹90', 
        originalPrice: '₹99',
        image: 'assets/coke.jpeg', 
        weight: '2L',
        rating: 4.6,
        ratingCount: 278,
        discount: 9,
        isBestseller: true
      },
      { 
        name: 'Lays Potato Chips', 
        price: '₹20', 
        image: 'assets/chips.jpeg', 
        weight: '50g',
        rating: 4.2,
        ratingCount: 421,
        isBestseller: true
      },
      { 
        name: 'Basmati Rice', 
        price: '₹120', 
        originalPrice: '₹140',
        image: 'assets/rice.jpg', 
        weight: '1kg',
        rating: 4.5,
        ratingCount: 134,
        discount: 14,
        isExpress: true
      },
      { 
        name: 'Aashirvaad Atta', 
        price: '₹280', 
        image: 'assets/aata.jpeg', 
        weight: '5kg',
        rating: 4.6,
        ratingCount: 298
      }
    ];
    
    this.filteredItems = [...this.items];
  }

  toggleFilter(filter: Filter) {
    // Reset all filters
    this.filters.forEach(f => f.active = false);
    
    // Activate the clicked filter
    filter.active = true;
    
    // Apply filter logic
    this.applyFilters();
  }

  applyFilters() {
    const activeFilter = this.filters.find(f => f.active);
    
    if (!activeFilter || activeFilter.name === 'All') {
      this.filteredItems = [...this.items];
      return;
    }

    switch (activeFilter.name) {
      case 'Popular':
        this.filteredItems = this.items.filter(item => item.rating >= 4.5);
        break;
      case 'Discount':
        this.filteredItems = this.items.filter(item => item.discount && item.discount > 0);
        break;
      case 'New':
        this.filteredItems = this.items.slice(0, 4); // Simulate new items
        break;
      case 'Budget':
        this.filteredItems = this.items.filter(item => {
          const price = parseInt(item.price.replace('₹', ''));
          return price < 100;
        });
        break;
      case 'Express':
        this.filteredItems = this.items.filter(item => item.isExpress);
        break;
      case 'Fresh':
        this.filteredItems = this.items.filter(item => item.isFresh);
        break;
      default:
        this.filteredItems = [...this.items];
    }
  }

  clearFilters() {
    this.filters.forEach(f => f.active = false);
    this.filters[0].active = true; // Activate "All" filter
    this.filteredItems = [...this.items];
  }

  getCurrentSortText(): string {
    const sortOptions: { [key: string]: string } = {
      'recommended': 'Recommended',
      'price-low': 'Price: Low to High',
      'price-high': 'Price: High to Low',
      'rating': 'Highest Rated',
      'popular': 'Most Popular'
    };
    return sortOptions[this.currentSort] || 'Recommended';
  }

  openSortModal() {
    // In a real app, this would open a modal with sort options
    console.log('Open sort modal');
  }

  calculateSaveAmount(item: CategoryItem): string {
    if (!item.originalPrice) return '';
    const current = parseInt(item.price.replace('₹', ''));
    const original = parseInt(item.originalPrice.replace('₹', ''));
    const save = original - current;
    return `₹${save}`;
  }

  toggleFavorite(item: CategoryItem, event: Event) {
    event.stopPropagation();
    item.isFavorite = !item.isFavorite;
    console.log(`${item.name} ${item.isFavorite ? 'added to' : 'removed from'} favorites`);
  }

  quickView(item: CategoryItem, event: Event) {
    event.stopPropagation();
    console.log('Quick view:', item.name);
    // Open quick view modal
  }

  viewItem(item: CategoryItem) {
    console.log('Viewing item:', item.name);
    // Navigate to item detail page
  }

  addToCart(item: CategoryItem, event: Event) {
    event.stopPropagation();
    console.log('Added to cart:', item.name);
    // Add cart logic here
  }

  loadMoreItems() {
    // Simulate loading more items
    console.log('Loading more items...');
    // In real app, this would fetch more data from API
  }
}