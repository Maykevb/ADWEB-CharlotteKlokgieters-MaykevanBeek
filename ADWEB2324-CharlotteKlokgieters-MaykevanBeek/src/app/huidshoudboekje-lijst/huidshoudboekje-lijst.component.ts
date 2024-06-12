import { Component } from '@angular/core';
import { Huishoudboekje } from '../models/huishoudboekje.model';
import { HuishoudboekjeService } from '../huishoudboekje.service';

@Component({
  selector: 'app-huidshoudboekje-lijst',
  templateUrl: './huidshoudboekje-lijst.component.html',
  styleUrls: ['./huidshoudboekje-lijst.component.css']
})
export class HuidshoudboekjeLijstComponent {
  query: string = ""
  activeTab: string = 'active';
  huishoudboekjes: Huishoudboekje[] = [];
  submitted = false;

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  constructor(private service: HuishoudboekjeService) {
    service.getHuishoudboekjes().subscribe(huishoudboekjes => {
      this.huishoudboekjes = huishoudboekjes;
    });
  }

  toggleEdit(huishoudboekje: Huishoudboekje) {
    huishoudboekje.editMode = !huishoudboekje.editMode;
  }

  onSave(huishoudboekje: Huishoudboekje) {
    this.submitted = true;
    if (huishoudboekje.naam != "") {
      huishoudboekje.editMode = false;
      this.service.updateHuishoudboekje(huishoudboekje);
      this.submitted = false
    }
  }

  onArchive(huishoudboekje: Huishoudboekje, archive: boolean) {
    huishoudboekje.gearchiveerd = archive;
    this.service.updateHuishoudboekje(huishoudboekje);
  }
}


