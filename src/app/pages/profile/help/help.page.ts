import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent,
  IonButton,
  IonIcon,
  IonSearchbar
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  arrowBack,
  receipt,
  card,
  car,
  returnDownBack,
  chevronDown,
  chevronUp,
  mail,
  call,
  chatbubbleEllipses
} from 'ionicons/icons';

interface FAQ {
  question: string;
  answer: string;
  isOpen: boolean;
}

@Component({
  selector: 'app-help',
  templateUrl: 'help.page.html',
  styleUrls: ['help.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonButton,
    IonIcon,
    IonSearchbar
  ]
})
export class HelpPage implements OnInit {
  searchQuery: string = '';
  faqs: FAQ[] = [
    {
      question: 'How do I place an order?',
      answer: 'Simply browse through our products, add items to your cart, and proceed to checkout. You can pay using various payment methods including cards, UPI, or cash on delivery.',
      isOpen: false
    },
    {
      question: 'What are the delivery charges?',
      answer: 'Delivery charges vary based on your location and order value. Orders above ₹199 qualify for free delivery. Check the delivery charges at checkout.',
      isOpen: false
    },
    {
      question: 'How can I track my order?',
      answer: 'Once your order is confirmed, you will receive a tracking ID. You can use this ID in the Logistics tab to track your order in real-time.',
      isOpen: false
    },
    {
      question: 'Can I cancel my order?',
      answer: 'Yes, you can cancel your order within 30 minutes of placing it. After that, please contact our support team for assistance.',
      isOpen: false
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit/debit cards, UPI, net banking, and cash on delivery. All payments are secure and encrypted.',
      isOpen: false
    },
    {
      question: 'How do I return a product?',
      answer: 'You can initiate a return within 7 days of delivery. Go to your orders, select the item you want to return, and follow the return process. Our team will process your return within 2-3 business days.',
      isOpen: false
    },
    {
      question: 'Do you offer refunds?',
      answer: 'Yes, we offer full refunds for returned items. The refund will be processed to your original payment method within 5-7 business days after we receive the returned item.',
      isOpen: false
    }
  ];
  filteredFAQs: FAQ[] = [];

  constructor(private router: Router) {
    addIcons({
      arrowBack,
      receipt,
      card,
      car,
      returnDownBack,
      chevronDown,
      chevronUp,
      mail,
      call,
      chatbubbleEllipses
    });
  }

  ngOnInit() {
    this.filteredFAQs = [...this.faqs];
  }

  goBack() {
    this.router.navigate(['/profile']);
  }

  onSearch(event: any) {
    const query = event.target.value.toLowerCase();
    if (query) {
      this.filteredFAQs = this.faqs.filter(faq =>
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query)
      );
    } else {
      this.filteredFAQs = [...this.faqs];
    }
  }

  toggleFAQ(faq: FAQ) {
    faq.isOpen = !faq.isOpen;
  }

  viewTopic(topic: string) {
    const topicFAQs = this.faqs.filter(faq =>
      faq.question.toLowerCase().includes(topic) ||
      faq.answer.toLowerCase().includes(topic)
    );
    if (topicFAQs.length > 0) {
      this.filteredFAQs = topicFAQs;
      this.searchQuery = topic;
    }
  }

  contactEmail() {
    window.location.href = 'mailto:support@goapp.com?subject=Support Request';
  }

  contactPhone() {
    window.location.href = 'tel:+9118001234567';
  }

  contactChat() {
    alert('Live Chat:\n\nOur support team is available 24/7. Please wait while we connect you...');
  }
}

