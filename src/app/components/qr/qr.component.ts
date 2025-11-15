import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import lottie from 'lottie-web';

@Component({
  selector: 'app-qr',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule],
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.scss'],
})
export class QRScannerComponent implements AfterViewInit {
  @ViewChild('qrContainer', { static: false }) qrContainer!: ElementRef;

  constructor() {}

  ngAfterViewInit() {
    this.loadLottieAnimation();
  }

  goBack() {
    history.back();
  }

  loadLottieAnimation() {
    if (this.qrContainer && this.qrContainer.nativeElement) {
      try {
        const animation = lottie.loadAnimation({
          container: this.qrContainer.nativeElement,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: 'assets/animations/qr-scanner.json' // Update this path
        });

        // Scale the animation if needed
        animation.addEventListener('DOMLoaded', () => {
          const svg = this.qrContainer.nativeElement.querySelector('svg');
          if (svg) {
            svg.style.transform = 'scale(1.2)';
            svg.style.width = '120%';
            svg.style.height = '120%';
          }
        });

      } catch (error) {
        console.error('Error loading Lottie animation:', error);
        // Fallback UI
        this.qrContainer.nativeElement.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        this.qrContainer.nativeElement.innerHTML = `
          <div style="color: white; text-align: center; padding: 20px;">
            <ion-icon name="qr-code" style="font-size: 3rem; margin-bottom: 10px;"></ion-icon>
            <div>QR Scanner</div>
          </div>
        `;
      }
    }
  }
}