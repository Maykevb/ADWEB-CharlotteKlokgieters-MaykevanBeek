import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "../auth.service";
import { HuishoudboekjeService } from "../huishoudboekje.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-huishoudboekje-details',
  templateUrl: './huishoudboekje-details.component.html',
  styleUrl: './huishoudboekje-details.component.css'
})

export class HuishoudboekjeDetailsComponent {
  ownerId: string | undefined = undefined
  huidigHuishoudboekjeOwner: string | undefined;
  huidigHuishoudboekjeID: string | null;

  private subscriptions: Subscription = new Subscription();

  constructor(private route: ActivatedRoute, private  authService: AuthService,
              private huishoudService: HuishoudboekjeService) {
    this.huidigHuishoudboekjeID = this.route.snapshot.paramMap.get('id');

    if (this.huidigHuishoudboekjeID != null) {
      const huishoudSub = this.huishoudService.getHuishoudboekje(this.huidigHuishoudboekjeID)
        .subscribe(owner => {
        this.huidigHuishoudboekjeOwner = owner?.ownerId
      })
      const authSub = this.authService.getCurrentUserId().subscribe(userId => {
        this.ownerId = userId;
      });

      this.subscriptions.add(huishoudSub);
      this.subscriptions.add(authSub);
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
