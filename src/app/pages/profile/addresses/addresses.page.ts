import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  IonContent,
  IonButton,
  IonIcon,
  IonChip,
  IonFab,
  IonFabButton
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  arrowBack,
  add,
  create,
  trash,
  call,
  home,
  business,
  location
} from 'ionicons/icons';

interface Address {
  name: string;
  type: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  isDefault: boolean;
}

@Component({
  selector: 'app-addresses',
  templateUrl: 'addresses.page.html',
  styleUrls: ['addresses.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonButton,
    IonIcon,
    IonChip,
    IonFab,
    IonFabButton
  ]
})
export class AddressesPage implements OnInit {
  addresses: Address[] = [
    {
      name: 'John Doe',
      type: 'Home',
      street: 'Floor 1st, ASG',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      phone: '+91 98765 43210',
      isDefault: true
    },
    {
      name: 'John Doe',
      type: 'Work',
      street: 'Office Building, Sector 5',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400052',
      phone: '+91 98765 43210',
      isDefault: false
    },
    {
      name: 'Jane Doe',
      type: 'Other',
      street: 'Apartment 302, Green Valley',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400092',
      phone: '+91 98765 43211',
      isDefault: false
    }
  ];

  constructor(private router: Router) {
    addIcons({
      arrowBack,
      add,
      create,
      trash,
      call,
      home,
      business,
      location
    });
  }

  ngOnInit() {}

  goBack() {
    this.router.navigate(['/profile']);
  }

  getAddressIcon(type: string): string {
    const iconMap: { [key: string]: string } = {
      'Home': 'home',
      'Work': 'business',
      'Other': 'location'
    };
    return iconMap[type] || 'location';
  }

  addAddress() {
    const newAddress: Address = {
      name: 'New Address',
      type: 'Home',
      street: '',
      city: '',
      state: '',
      pincode: '',
      phone: '',
      isDefault: false
    };
    this.addresses.push(newAddress);
    this.editAddress(newAddress, this.addresses.length - 1);
  }

  editAddress(address: Address, index: number) {
    const name = prompt('Name:', address.name);
    const street = prompt('Street Address:', address.street);
    const city = prompt('City:', address.city);
    const state = prompt('State:', address.state);
    const pincode = prompt('Pincode:', address.pincode);
    const phone = prompt('Phone:', address.phone);
    const type = prompt('Type (Home/Work/Other):', address.type) || 'Home';

    if (name && street && city && state && pincode && phone) {
      this.addresses[index] = {
        name,
        type,
        street,
        city,
        state,
        pincode,
        phone,
        isDefault: address.isDefault
      };
      alert('Address updated successfully!');
    }
  }

  deleteAddress(index: number) {
    if (confirm('Are you sure you want to delete this address?')) {
      if (this.addresses[index].isDefault && this.addresses.length > 1) {
        // Set first address as default if deleting default
        this.addresses[0].isDefault = true;
      }
      this.addresses.splice(index, 1);
    }
  }

  setAsDefault(index: number) {
    this.addresses.forEach((addr, i) => {
      addr.isDefault = i === index;
    });
    alert('Default address updated!');
  }
}

