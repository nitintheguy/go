import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  IonContent,
  IonButton,
  IonIcon,
  IonAvatar
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  arrowBack,
  camera,
  personCircle,
  person,
  mail,
  call,
  location,
  create,
  receipt,
  receiptOutline,
  chevronForward,
  logOut,
  apps,
  card,
  heart,
  settings,
  helpCircle,
  informationCircle,
  checkmarkCircle,
  time,
  closeCircle
} from 'ionicons/icons';
import { UserProfileService, UserProfile } from '../../services/user-profile.service';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  date: string;
  status: string;
  items: OrderItem[];
  total: number;
}

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonButton,
    IonIcon,
    IonAvatar
  ]
})
export class ProfilePage implements OnInit, OnDestroy {
  userProfile: UserProfile = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 98765 43210',
    address: 'Home - Floor 1st, ASG, Mumbai, Maharashtra 400001',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face',
    totalOrders: 24,
    totalSpent: 45678,
    memberSince: '2023'
  };
  
  private profileSubscription?: Subscription;

  orders: Order[] = [
    {
      id: 'ORD-2024-001',
      date: 'Today, 14:30',
      status: 'Delivered',
      items: [
        { name: 'Milk', quantity: 2, price: 120 },
        { name: 'Bread', quantity: 1, price: 40 },
        { name: 'Eggs', quantity: 1, price: 80 },
        { name: 'Butter', quantity: 1, price: 100 }
      ],
      total: 340
    },
    {
      id: 'ORD-2024-002',
      date: 'Yesterday, 18:45',
      status: 'Delivered',
      items: [
        { name: 'Pizza', quantity: 2, price: 600 },
        { name: 'Coke', quantity: 2, price: 80 }
      ],
      total: 680
    },
    {
      id: 'ORD-2024-003',
      date: '2 days ago, 12:15',
      status: 'In Transit',
      items: [
        { name: 'Rice', quantity: 1, price: 450 },
        { name: 'Wheat Flour', quantity: 1, price: 320 },
        { name: 'Sugar', quantity: 1, price: 180 }
      ],
      total: 950
    },
    {
      id: 'ORD-2024-004',
      date: '3 days ago, 16:20',
      status: 'Delivered',
      items: [
        { name: 'Shampoo', quantity: 1, price: 250 },
        { name: 'Soap', quantity: 3, price: 90 },
        { name: 'Toothpaste', quantity: 2, price: 200 }
      ],
      total: 540
    },
    {
      id: 'ORD-2024-005',
      date: '5 days ago, 10:30',
      status: 'Cancelled',
      items: [
        { name: 'Laptop', quantity: 1, price: 45000 }
      ],
      total: 45000
    }
  ];

  constructor(
    private router: Router,
    private userProfileService: UserProfileService
  ) {
    addIcons({
      arrowBack,
      camera,
      personCircle,
      person,
      mail,
      call,
      location,
      create,
      receipt,
      receiptOutline,
      chevronForward,
      logOut,
      apps,
      card,
      heart,
      settings,
      helpCircle,
      informationCircle,
      checkmarkCircle,
      time,
      closeCircle
    });
  }

  ngOnInit() {
    // Load initial profile
    this.userProfile = this.userProfileService.getProfile();
    
    // Subscribe to profile updates
    this.profileSubscription = this.userProfileService.profile$.subscribe(
      (profile: UserProfile) => {
        this.userProfile = profile;
      }
    );
  }

  ngOnDestroy() {
    // Unsubscribe to prevent memory leaks
    if (this.profileSubscription) {
      this.profileSubscription.unsubscribe();
    }
  }

  goBack() {
    this.router.navigate(['/tabs/tab1']);
  }

  editProfile() {
    this.router.navigate(['/edit-profile']);
  }

  viewOrderDetails(order: Order) {
    this.router.navigate(['/order', order.id]);
  }

  getStatusClass(status: string): string {
    const statusMap: { [key: string]: string } = {
      'Delivered': 'status-delivered',
      'In Transit': 'status-transit',
      'Processing': 'status-processing',
      'Cancelled': 'status-cancelled'
    };
    return statusMap[status] || 'status-default';
  }

  getStatusIcon(status: string): string {
    const iconMap: { [key: string]: string } = {
      'Delivered': 'checkmark-circle',
      'In Transit': 'time',
      'Processing': 'time',
      'Cancelled': 'close-circle'
    };
    return iconMap[status] || 'time';
  }

  goToShop() {
    this.router.navigate(['/tabs/tab1']);
  }

  goToAddresses() {
    this.router.navigate(['/addresses']);
  }

  goToPaymentMethods() {
    this.router.navigate(['/card']);
  }

  goToFavorites() {
    this.router.navigate(['/favorites']);
  }

  goToSettings() {
    this.router.navigate(['/settings']);
  }

  goToHelp() {
    this.router.navigate(['/help']);
  }

  goToAbout() {
    this.router.navigate(['/about']);
  }

  logout() {
    // Show confirmation alert
    if (confirm('Are you sure you want to logout?')) {
      // Clear user data, tokens, etc.
      // Navigate to welcome/login page
      this.router.navigate(['/']);
    }
  }
}

