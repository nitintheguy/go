import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IonContent,
  IonButton,
  IonIcon
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  arrowBack,
  checkmarkCircle,
  time,
  closeCircle,
  call,
  refresh,
  download
} from 'ionicons/icons';

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
  selector: 'app-order-details',
  templateUrl: 'order-details.page.html',
  styleUrls: ['order-details.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonButton,
    IonIcon
  ]
})
export class OrderDetailsPage implements OnInit {
  order: Order | null = null;
  orderId: string = '';

  // Sample orders data
  private ordersData: { [key: string]: Order } = {
    'ORD-2024-001': {
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
    'ORD-2024-002': {
      id: 'ORD-2024-002',
      date: 'Yesterday, 18:45',
      status: 'Delivered',
      items: [
        { name: 'Pizza', quantity: 2, price: 600 },
        { name: 'Coke', quantity: 2, price: 80 }
      ],
      total: 680
    },
    'ORD-2024-003': {
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
    'ORD-2024-004': {
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
    'ORD-2024-005': {
      id: 'ORD-2024-005',
      date: '5 days ago, 10:30',
      status: 'Cancelled',
      items: [
        { name: 'Laptop', quantity: 1, price: 45000 }
      ],
      total: 45000
    }
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    addIcons({
      arrowBack,
      checkmarkCircle,
      time,
      closeCircle,
      call,
      refresh,
      download
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.orderId = params.get('id') || '';
      if (this.orderId && this.ordersData[this.orderId]) {
        this.order = this.ordersData[this.orderId];
      } else {
        // If order not found, redirect back
        this.router.navigate(['/profile']);
      }
    });
  }

  goBack() {
    this.router.navigate(['/profile']);
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

  getSubtotal(): number {
    if (!this.order) return 0;
    return this.order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  reorder() {
    alert('Items added to cart for reorder!');
    this.router.navigate(['/tabs/tab1']);
  }

  cancelOrder() {
    if (confirm('Are you sure you want to cancel this order?')) {
      if (this.order) {
        this.order.status = 'Cancelled';
        alert('Order cancelled successfully!');
      }
    }
  }

  downloadInvoice() {
    alert('Invoice download started!');
  }
}

