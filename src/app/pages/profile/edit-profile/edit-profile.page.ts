import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent,
  IonButton,
  IonIcon,
  IonAvatar,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  arrowBack,
  camera,
  checkmark
} from 'ionicons/icons';
import { UserProfileService } from '../../services/user-profile.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: 'edit-profile.page.html',
  styleUrls: ['edit-profile.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonContent,
    IonButton,
    IonIcon,
    IonAvatar,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea
  ]
})
export class EditProfilePage implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  profileForm: FormGroup;
  avatarUrl: string = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userProfileService: UserProfileService
  ) {
    addIcons({ arrowBack, camera, checkmark });
    
    // Load current profile data
    const currentProfile = this.userProfileService.getProfile();
    this.avatarUrl = currentProfile.avatar;
    
    this.profileForm = this.fb.group({
      name: [currentProfile.name, [Validators.required, Validators.minLength(3)]],
      email: [currentProfile.email, [Validators.required, Validators.email]],
      phone: [currentProfile.phone, [Validators.required]],
      address: [currentProfile.address, [Validators.required]],
      avatar: [currentProfile.avatar]
    });
  }

  ngOnInit() {
    // Form is already initialized in constructor with current profile data
  }

  goBack() {
    this.router.navigate(['/profile']);
  }

  triggerFileInput() {
    // Trigger the hidden file input
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        input.value = ''; // Reset input
        return;
      }

      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        alert('Image size should be less than 5MB');
        input.value = ''; // Reset input
        return;
      }

      // Read file and convert to base64 data URL
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const result = e.target?.result as string;
        if (result) {
          this.avatarUrl = result;
          this.profileForm.patchValue({ avatar: result });
        }
        // Reset input to allow selecting the same file again
        input.value = '';
      };
      reader.onerror = () => {
        alert('Error reading file. Please try again.');
        input.value = ''; // Reset input
      };
      reader.readAsDataURL(file);
    }
  }

  saveProfile() {
    if (this.profileForm.valid) {
      const formValue = this.profileForm.value;
      // Update profile through service
      this.userProfileService.updateProfile({
        name: formValue.name,
        email: formValue.email,
        phone: formValue.phone,
        address: formValue.address,
        avatar: formValue.avatar
      });
      
      alert('Profile updated successfully!');
      this.goBack();
    }
  }
}

