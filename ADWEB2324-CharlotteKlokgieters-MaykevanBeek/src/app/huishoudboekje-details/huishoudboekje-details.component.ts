import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../auth.service";
import {HuishoudboekjeService} from "../huishoudboekje.service";

@Component({
  selector: 'app-huishoudboekje-details',
  templateUrl: './huishoudboekje-details.component.html',
  styleUrl: './huishoudboekje-details.component.css'
})

export class HuishoudboekjeDetailsComponent {
  ownerId: string | undefined = undefined
  huidigHuishoudboekjeOwner: string | undefined;
  huidigHuishoudboekjeID: string | null;

  constructor(private route: ActivatedRoute, private  authService: AuthService, private  huishoudService: HuishoudboekjeService) {
    this.huidigHuishoudboekjeID = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
      if (this.huidigHuishoudboekjeID != null) {
        this.huishoudService.getHuishoudboekje(this.huidigHuishoudboekjeID).subscribe(owner => {
          this.huidigHuishoudboekjeOwner = owner?.ownerId
        })

      this.authService.getCurrentUserId().subscribe(userId => {
        this.ownerId = userId;
      });
    }
  }
}
