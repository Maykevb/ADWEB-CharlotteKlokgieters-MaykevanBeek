import { Component } from '@angular/core';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm!: FormGroup;

  constructor(private authService: AuthService, private  router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  registerWithEmailAndPass() {
    if (this.registerForm.valid) {
      const userData = this.registerForm.value;
      this.authService.registerEmailAndPass(userData).subscribe(
        (userCredential) => {
          this.router.navigateByUrl('huishoudboekjes-overzicht');
        },
        (error) => {
          console.error('Login error:', error);
          alert('Registreren gefaald.');
        }
      );
    }
  }
}
