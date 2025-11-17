import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  IonContent,
  IonButton,
  IonIcon
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  arrowBack,
  heart,
  heartOutline,
  star,
  cart,
  storefront
} from 'ionicons/icons';

interface FavoriteItem {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  weight: string;
  rating: number;
  discount?: number;
}

@Component({
  selector: 'app-favorites',
  templateUrl: 'favorites.page.html',
  styleUrls: ['favorites.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonButton,
    IonIcon
  ]
})
export class FavoritesPage implements OnInit {
  favorites: FavoriteItem[] = [
    {
      id: '1',
      name: 'Fresh Milk',
      image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300',
      price: 60,
      originalPrice: 70,
      weight: '1L',
      rating: 4.5,
      discount: 14
    },
    {
      id: '2',
      name: 'Whole Wheat Bread',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300',
      price: 40,
      weight: '400g',
      rating: 4.3
    },
    {
      id: '3',
      name: 'Organic Eggs',
      image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=300',
      price: 80,
      originalPrice: 90,
      weight: '12 pieces',
      rating: 4.7,
      discount: 11
    },
    {
      id: '4',
      name: 'Fresh Bananas',
      image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300',
      price: 45,
      weight: '1kg',
      rating: 4.4
    },
    {
      id: '5',
      name: 'Premium Rice',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300',
      price: 450,
      originalPrice: 500,
      weight: '5kg',
      rating: 4.6,
      discount: 10
    }
  ];

  constructor(private router: Router) {
    addIcons({
      arrowBack,
      heart,
      heartOutline,
      star,
      cart,
      storefront
    });
  }

  ngOnInit() {}

  goBack() {
    this.router.navigate(['/profile']);
  }

  viewItem(item: FavoriteItem) {
    this.router.navigate(['/item', item.id]);
  }

  removeFavorite(itemId: string, event: Event) {
    event.stopPropagation();
    if (confirm('Remove from favorites?')) {
      this.favorites = this.favorites.filter(item => item.id !== itemId);
    }
  }

  addToCart(item: FavoriteItem, event: Event) {
    event.stopPropagation();
    // Add to cart logic here
    alert(`${item.name} added to cart!`);
  }

  goToShop() {
    this.router.navigate(['/tabs/tab1']);
  }
}

