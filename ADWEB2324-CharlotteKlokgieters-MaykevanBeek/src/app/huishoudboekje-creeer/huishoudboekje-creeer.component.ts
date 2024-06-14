import { Component } from '@angular/core';
import { Huishoudboekje } from "../models/huishoudboekje.model";
import { HuishoudboekjeService } from "../huishoudboekje.service";
import { AuthService } from "../auth.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-huishoudboekje-creeer',
  templateUrl: './huishoudboekje-creeer.component.html',
  styleUrl: './huishoudboekje-creeer.component.css'
})
export class HuishoudboekjeCreeerComponent {
  ownerId: string | undefined = undefined;
  huishoudboekje: Huishoudboekje = new Huishoudboekje("", "", "", this.ownerId);
  submitted = false;
  private subscriptions: Subscription = new Subscription();

  constructor(private service: HuishoudboekjeService, private  authService: AuthService) {  }

  ngOnInit(): void {
    const authSub = this.authService.getCurrentUserId().subscribe(userId => {
      this.ownerId = userId;
      this.huishoudboekje = new Huishoudboekje("", "", "", this.ownerId);
    });

    this.subscriptions.add(authSub)
  }

  onAdd() {
    this.submitted = true;

    if (this.huishoudboekje.naam != "") {
      this.service.addHuishoudboekje(this.huishoudboekje);
      this.huishoudboekje = new Huishoudboekje("", "", "", this.ownerId);
      this.submitted = false
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
