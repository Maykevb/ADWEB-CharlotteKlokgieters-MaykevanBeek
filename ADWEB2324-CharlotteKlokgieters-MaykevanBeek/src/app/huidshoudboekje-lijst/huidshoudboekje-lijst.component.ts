import { Component } from '@angular/core';
import {Huishoudboekje} from "../models/huishoudboekje.model";
import {HuishoudboekjeService} from "../huishoudboekje.service";

@Component({
  selector: 'app-huidshoudboekje-lijst',
  templateUrl: './huidshoudboekje-lijst.component.html',
  styleUrl: './huidshoudboekje-lijst.component.css'
})
export class HuidshoudboekjeLijstComponent {
  query: string = ""
  activeTab: string = 'active';
  huishoudboekjes: Huishoudboekje[] = [];

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  constructor(private service: HuishoudboekjeService) {
    service.getHuishoudboekjes().subscribe(huishoudboekjes => {
      this.huishoudboekjes = huishoudboekjes;
    })
  }

  onArchive(huishoudboekje: Huishoudboekje, archive: boolean) {
    huishoudboekje.gearchiveerd = archive;
    this.service.updateHuishoudboekje(huishoudboekje);
  }
}


