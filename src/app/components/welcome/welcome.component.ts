import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

// Import Lottie
import lottie from 'lottie-web';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class WelcomeComponent implements OnInit, AfterViewInit {
  currentAnimationIndex = 0;
  animations = [
    { path: 'assets/food.json', label: 'Food' },
    { path: 'assets/ride.json', label: 'Ride' },
    { path: 'assets/Grocery.json', label: 'Grocery' },
    { path: 'assets/Payment.json', label: 'Payments' },
    { path: 'assets/delivery.json', label: 'Logistics' }
  ];

  private lottieInstance: any;
  private animationTimer: any;
  private navigateTimer: any;

  constructor(private router: Router) {}

  ngOnInit() {
    // Set total animation time (5 animations × 1.5 seconds each = 7.5 seconds)
    this.navigateTimer = setTimeout(() => {
      this.navigateToTabs();
    }, 7500); // 7.5 seconds total

    // Rotate through animations every 1.5 seconds (faster)
    this.animationTimer = setInterval(() => {
      this.currentAnimationIndex = (this.currentAnimationIndex + 1) % this.animations.length;
      this.loadAnimation();
    }, 1500); // Faster rotation - 1.5 seconds
  }

  ngAfterViewInit() {
    this.loadAnimation();
  }

  loadAnimation() {
    const container = document.getElementById('lottie-container');
    
    if (container && this.animations[this.currentAnimationIndex]) {
      // Destroy previous animation
      if (this.lottieInstance) {
        this.lottieInstance.destroy();
      }

      // Load new animation
      this.lottieInstance = lottie.loadAnimation({
        container: container,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: this.animations[this.currentAnimationIndex].path
      });
    }
  }

  navigateToTabs() {
    // Clear timers
    if (this.animationTimer) {
      clearInterval(this.animationTimer);
    }
    if (this.navigateTimer) {
      clearTimeout(this.navigateTimer);
    }
    
    // Navigate to tabs
    this.router.navigate(['/tabs']);
  }

  get currentAnimation() {
    return this.animations[this.currentAnimationIndex];
  }

  ngOnDestroy() {
    // Clean up timers
    if (this.animationTimer) {
      clearInterval(this.animationTimer);
    }
    if (this.navigateTimer) {
      clearTimeout(this.navigateTimer);
    }
    
    // Clean up Lottie instance
    if (this.lottieInstance) {
      this.lottieInstance.destroy();
    }
  }
}