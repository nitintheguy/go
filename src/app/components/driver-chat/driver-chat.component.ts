import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonButton, IonIcon, IonInput } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  person, 
  call, 
  send, 
  handLeft, 
  informationCircle, 
  time, 
  location, 
  heart, 
  chatbubble 
} from 'ionicons/icons';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'driver';
  timestamp: Date;
  isQuickReply?: boolean;
}

@Component({
  selector: 'app-driver-chat',
  templateUrl: './driver-chat.component.html',
  styleUrls: ['./driver-chat.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, IonButton, IonIcon, IonInput]
})
export class DriverChatComponent implements OnInit {
  @Input() driverName: string = 'Driver';
  @Input() driverAvatar: string = '';
  @Input() orderId: string = '';
  @Input() orderStatus: string = 'In Transit';
  
  @ViewChild('chatContent', { static: false }) chatContent!: ElementRef;

  messages: Message[] = [];
  newMessage: string = '';
  showQuickReplies: boolean = true;

  quickReplies = [
    { text: 'Hi', icon: 'hand-left' },
    { text: 'Order Status?', icon: 'information-circle' },
    { text: 'How much time?', icon: 'time' },
    { text: 'Where are you?', icon: 'location' },
    { text: 'Call me', icon: 'call' },
    { text: 'Thanks', icon: 'heart' }
  ];

  getAutoReply(key: string, orderId: string, status: string): string {
    const replies: { [key: string]: string } = {
      'hi': 'Hello! How can I help you with your order?',
      'order status': `Your order #${orderId} is ${status.toLowerCase()}. I'll keep you updated!`,
      'how much time': 'I should reach you in about 10-15 minutes. Thank you for your patience!',
      'where are you': 'I\'m on my way to your location. You can track my live location in the app.',
      'call me': 'Sure! I\'ll call you shortly.',
      'thanks': 'You\'re welcome! Happy to help. 😊'
    };
    return replies[key] || 'I received your message. I\'ll get back to you shortly!';
  }

  constructor() {
    addIcons({
      person,
      call,
      send,
      handLeft,
      informationCircle,
      time,
      location,
      heart,
      chatbubble
    });
  }

  ngOnInit() {
    // Add welcome message
    this.addMessage('driver', `Hello! I'm ${this.driverName}, your delivery partner. Your order is on the way!`);
  }

  sendMessage(text?: string) {
    const messageText = text || this.newMessage.trim();
    if (!messageText) return;

    // Add user message
    this.addMessage('user', messageText);
    this.newMessage = '';

    // Auto reply after 1 second
    setTimeout(() => {
      this.sendAutoReply(messageText);
    }, 1000);
  }

  sendQuickReply(reply: string) {
    this.sendMessage(reply);
    this.showQuickReplies = false;
  }

  private sendAutoReply(userMessage: string) {
    const lowerMessage = userMessage.toLowerCase();
    let replyKey = '';

    // Check for keywords
    if (lowerMessage.includes('hi') || lowerMessage.includes('hello')) {
      replyKey = 'hi';
    } else if (lowerMessage.includes('status') || lowerMessage.includes('order')) {
      replyKey = 'order status';
    } else if (lowerMessage.includes('time') || lowerMessage.includes('how long')) {
      replyKey = 'how much time';
    } else if (lowerMessage.includes('where') || lowerMessage.includes('location')) {
      replyKey = 'where are you';
    } else if (lowerMessage.includes('call')) {
      replyKey = 'call me';
    } else if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
      replyKey = 'thanks';
    }

    const reply = this.getAutoReply(replyKey, this.orderId, this.orderStatus);
    this.addMessage('driver', reply);
  }

  private addMessage(sender: 'user' | 'driver', text: string) {
    const message: Message = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date()
    };
    this.messages.push(message);
    
    // Scroll to bottom
    setTimeout(() => {
      this.scrollToBottom();
    }, 100);
  }

  private scrollToBottom() {
    if (this.chatContent) {
      const element = this.chatContent.nativeElement;
      element.scrollTop = element.scrollHeight;
    }
  }

  formatTime(date: Date): string {
    return new Date(date).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  }

  callDriver() {
    // This will be handled by parent component
    window.open(`tel:+919876543210`, '_self');
  }
}

