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
        discount: 8
      },
      { 
        name: 'Britannia Bread', 
        price: '₹40', 
        originalPrice: '₹45',
        image: 'assets/bread.jpg', 
        weight: '400g',
        rating: 4.3,
        ratingCount: 189,
        discount: 11
      },
      { 
        name: 'Farm Fresh Eggs', 
        price: '₹80', 
        image: 'assets/egg.jpeg', 
        weight: '6 pcs',
        rating: 4.7,
        ratingCount: 312,
        isFavorite: true
      },
      { 
        name: 'Organic Banana', 
        price: '₹45', 
        image: 'assets/banana.jpeg', 
        weight: '1kg',
        rating: 4.4,
        ratingCount: 156
      },
      { 
        name: 'Coca Cola', 
        price: '₹90', 
        originalPrice: '₹99',
        image: 'assets/coke.jpeg', 
        weight: '2L',
        rating: 4.6,
        ratingCount: 278,
        discount: 9
      },
      { 
        name: 'Lays Potato Chips', 
        price: '₹20', 
        image: 'assets/chips.jpeg', 
        weight: '50g',
        rating: 4.2,
        ratingCount: 421
      },
      { 
        name: 'Basmati Rice', 
        price: '₹120', 
        originalPrice: '₹140',
        image: 'assets/rice.jpg', 
        weight: '1kg',
        rating: 4.5,
        ratingCount: 134,
        discount: 14
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
  }

  viewItem(item: CategoryItem) {
    console.log('Viewing item:', item.name);
    // Navigate to item detail page or show modal
  }

  addToCart(item: CategoryItem, event: Event) {
    event.stopPropagation();
    console.log('Added to cart:', item.name);
    // Add cart logic here
  }
}