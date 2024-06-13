import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-huishoudboekje-details',
  templateUrl: './huishoudboekje-details.component.html',
  styleUrl: './huishoudboekje-details.component.css'
})

export class HuishoudboekjeDetailsComponent {
  huidigHuishoudboekjeID: string | null;

  constructor(private route: ActivatedRoute) {
    this.huidigHuishoudboekjeID = this.route.snapshot.paramMap.get('id');
  }
}
