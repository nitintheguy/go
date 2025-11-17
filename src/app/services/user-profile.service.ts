import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  avatar: string;
  totalOrders: number;
  totalSpent: number;
  memberSince: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  private readonly STORAGE_KEY = 'userProfile';
  private defaultProfile: UserProfile = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 98765 43210',
    address: 'Home - Floor 1st, ASG, Mumbai, Maharashtra 400001',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face',
    totalOrders: 24,
    totalSpent: 45678,
    memberSince: '2023'
  };

  private profileSubject = new BehaviorSubject<UserProfile>(this.defaultProfile);
  public profile$: Observable<UserProfile> = this.profileSubject.asObservable();

  constructor() {
    this.loadProfile();
  }

  getProfile(): UserProfile {
    return this.profileSubject.value;
  }

  updateProfile(updates: Partial<UserProfile>): void {
    const currentProfile = this.profileSubject.value;
    const updatedProfile: UserProfile = {
      ...currentProfile,
      ...updates
    };
    this.profileSubject.next(updatedProfile);
    this.saveProfile(updatedProfile);
  }

  private saveProfile(profile: UserProfile): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(profile));
    } catch (error) {
      console.error('Error saving profile to storage:', error);
    }
  }

  private loadProfile(): void {
    try {
      const savedProfile = localStorage.getItem(this.STORAGE_KEY);
      if (savedProfile) {
        const profile = JSON.parse(savedProfile);
        // Merge with default to ensure all fields exist
        const mergedProfile: UserProfile = {
          ...this.defaultProfile,
          ...profile
        };
        this.profileSubject.next(mergedProfile);
      } else {
        // Save default profile on first load
        this.saveProfile(this.defaultProfile);
      }
    } catch (error) {
      console.error('Error loading profile from storage:', error);
      this.profileSubject.next(this.defaultProfile);
    }
  }

  resetProfile(): void {
    this.profileSubject.next(this.defaultProfile);
    this.saveProfile(this.defaultProfile);
  }
}

