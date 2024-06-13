import { Component } from '@angular/core';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  hide: boolean = true;
  registerForm!: FormGroup;

  constructor(private authService: AuthService, private  router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  registerWithEmailAndPass() {
    if (this.registerForm.valid) {
      const userData = this.registerForm.value;
      this.authService.registerEmailAndPass(userData)
        .then((res: any) => {
          this.router.navigateByUrl('huishoudboekjes-overzicht');
        })
        .catch((error: any) => {
          console.error(error);
        });
    }
  }
}
