import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Global } from './global';

@Component({
  selector: 'app-root',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  isSignup = true;

  signupForm: FormGroup;
  signinForm: FormGroup;

  userData: any = null;
  errorMsg: string | null = null;

  showModal = signal(false);
  modalUserData: any[] = [];

  constructor(private fb: FormBuilder, private global: Global) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  openUserDataModal() {
    this.global.getUserData().subscribe({
      next: (data) => {
        this.modalUserData = [data];
        this.showModal.set(true);
      },
      error: (err) => {
        this.modalUserData = [{ error: err?.error?.message || 'Failed to fetch user data' }];
        this.showModal.set(true);
      }
    });
  }

  closeModal() {
    this.showModal.set(false);
    this.modalUserData = [];
  }
  onSignup() {
    if (this.signupForm.valid) {
      this.global.signup(this.signupForm.value).subscribe({
        next: (res) => {
          this.userData = res;
          this.errorMsg = null;
          this.signupForm.reset();
        },
        error: (err) => {
          this.errorMsg = err?.error?.message || 'Signup failed';
          this.userData = null;
        }
      });
    } else {
      this.signupForm.markAllAsTouched();
    }
  }

  onSignin() {
    if (this.signinForm.valid) {
      this.global.signin(this.signinForm.value).subscribe({
        next: (res) => {
          this.userData = res;
          this.errorMsg = null;
          this.signinForm.reset();
        },
        error: (err) => {
          this.errorMsg = err?.error?.message || 'Signin failed';
          this.userData = null;
        }
      });
    } else {
      this.signinForm.markAllAsTouched();
    }
  }

  protected readonly title = signal('test-front');
}
