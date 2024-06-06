import { Component, Input } from '@angular/core';
import { Festival } from '../models/festival.model';

import { FestivalService } from '../festival.service';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-festival-details',
  templateUrl: './festival-details.component.html',
  styleUrl: './festival-details.component.css'
})
export class FestivalDetailsComponent {
  selected_id: string = "";

  festival$: Observable<Festival | undefined>;
  organiser$: Observable<string>;
  participants$: Observable<string[]>;

  constructor(private service: FestivalService, private route: ActivatedRoute) {
    this.selected_id = this.route.snapshot.paramMap.get('id') ?? "";

    this.festival$ = this.service.getFestival(this.selected_id);
    this.organiser$ = this.service.getFestivalOrganiser(this.selected_id);
    this.participants$ = this.service.getFestivalParticipants(this.selected_id);
  }
}
