import { Component } from '@angular/core';
import { Huishoudboekje } from '../../models/huishoudboekje.model';
import { HuishoudboekjeService } from '../../services/huishoudboekje.service';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-huidshoudboekje-lijst',
  templateUrl: './huidshoudboekje-lijst.component.html',
  styleUrls: ['./huidshoudboekje-lijst.component.css']
})
export class HuidshoudboekjeLijstComponent {
  ownerId: string | undefined = undefined;
  query: string = ""
  activeTab: string = 'active';
  huishoudboekjes: Huishoudboekje[] = [];
  submitted = false;

  subscriptions: Subscription = new Subscription();

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  constructor(private service: HuishoudboekjeService, private authService: AuthService, private router: Router) {  }

  ngOnInit(): void {
    const huishoudSub = this.service.getHuishoudboekjes().subscribe(huishoudboekjes => {
      this.huishoudboekjes = huishoudboekjes;
    });

    const authSub = this.authService.getCurrentUserId().subscribe(userId => {
      this.ownerId = userId;
    });

    this.subscriptions.add(huishoudSub);
    this.subscriptions.add(authSub);
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

  signOut() {
    const authSub = this.authService.signOut().subscribe(
      () => {
        this.router.navigateByUrl('login');
      },
      (error) => {
        console.error('Sign-out error:', error);
        alert('Uitloggen gefaald. Probeer opnieuw a.u.b.');
      }
    );

    this.subscriptions.add(authSub)
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  protected readonly undefined = undefined;
}


