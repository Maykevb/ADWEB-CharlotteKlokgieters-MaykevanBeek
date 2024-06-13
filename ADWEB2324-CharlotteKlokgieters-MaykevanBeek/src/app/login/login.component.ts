import { Component } from '@angular/core';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  hide: boolean = true;
  signInForm!: FormGroup;

  constructor(private authService: AuthService, private  router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  signInWithEmailAndPass() {
    if (this.signInForm.valid) {
      const userData = this.signInForm.value;
      this.authService.signInEmailAndPass(userData).subscribe(
        (userCredential) => {
          this.router.navigateByUrl('huishoudboekjes-overzicht');
        },
        (error) => {
          console.error('Login error:', error);
          alert('Inloggen gefaald. Check a.u.b. uw inloggegevens.');
        }
      );
    }
  }
}
