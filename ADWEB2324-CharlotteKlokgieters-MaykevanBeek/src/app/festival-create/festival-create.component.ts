import { Component } from '@angular/core';
import { Festival } from '../models/festival.model';

import { FestivalService } from '../festival.service';

@Component({
  selector: 'app-festival-create',
  templateUrl: './festival-create.component.html',
  styleUrl: './festival-create.component.css'
})
export class FestivalCreateComponent {
  festival: Festival = new Festival("", "", "", "");

  constructor(private service: FestivalService) {
  }

  onAdd() {
    if (this.festival.name != "") {
      this.service.addFestival(this.festival);
      this.festival = new Festival("", "", "", "");
    }
  }
}
