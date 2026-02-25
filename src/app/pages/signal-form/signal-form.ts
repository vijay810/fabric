import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, signal, computed } from '@angular/core';

@Component({
  selector: 'app-signal-form',
  imports: [NgIf, NgFor, CommonModule],
  standalone: true,
  templateUrl: './signal-form.html',
  styleUrl: './signal-form.scss',
})
export class SignalForm {
  // FORM SIGNALS
  name = signal('');
  email = signal('');
  age = signal<number | null>(null);
  dob = signal<string>('');
  address = signal('');
  gender = signal('');
  status = signal('');
  hobbies = signal<string[]>([]);

  // TOUCHED SIGNALS
  nameTouched = signal(false);
  emailTouched = signal(false);
  ageTouched = signal(false);
  dobTouched = signal(false);
  addressTouched = signal(false);
  genderTouched = signal(false);
  statusTouched = signal(false);
  hobbiesTouched = signal(false);

  // VALIDATION SIGNALS
  nameValid = computed(() => this.name().trim().length >= 3);
  emailValid = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email()));
  ageValid = computed(
    () => this.age() !== null && this.age()! > 0 && this.age()! <= 120
  );
  // dobValid = computed(() => this.dob().trim().length > 0);
  addressValid = computed(() => this.address().trim().length > 0);
  genderValid = computed(() => this.gender().trim().length > 0);
  statusValid = computed(() => this.status().trim().length > 0);
  hobbiesValid = computed(() => this.hobbies().length > 0);

  dobValid = computed(() => {
    if (!this.dob()) return false;

    const selected = new Date(this.dob());
    const today = new Date();

    // Remove time part for accurate comparison
    selected.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    // DOB must be before today
    return selected < today;
  });

  // FULL FORM VALID
  formValid = computed(
    () =>
      this.nameValid() &&
      this.emailValid() &&
      this.ageValid() &&
      this.dobValid() &&
      this.addressValid() &&
      this.genderValid() &&
      this.statusValid() &&
      this.hobbiesValid()
  );

  // HOBBIES CRUD
  addHobby(hobby: string) {
    if (hobby.trim()) this.hobbies.update((list) => [...list, hobby]);
    this.hobbiesTouched.set(true);
  }

  removeHobby(i: number) {
    this.hobbies.update((list) => list.filter((_, index) => index !== i));
  }

  // SUBMIT
  submit() {
    // mark all as touched on submit
    this.nameTouched.set(true);
    this.emailTouched.set(true);
    this.ageTouched.set(true);
    this.dobTouched.set(true);
    this.addressTouched.set(true);
    this.genderTouched.set(true);
    this.statusTouched.set(true);
    this.hobbiesTouched.set(true);

    if (!this.formValid()) return;

    const result = {
      name: this.name(),
      email: this.email(),
      age: this.age(),
      dob: this.dob(),
      address: this.address(),
      gender: this.gender(),
      status: this.status(),
      hobbies: this.hobbies(),
    };

    console.log('Form Submitted:', result);
    alert('Form submitted successfully!');
  }
}
