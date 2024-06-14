import { Component, Input, OnInit } from '@angular/core';
import { Saldo } from "../models/saldo.model";
import { SaldoService } from "../saldo.service";
import { Chart, registerables, ChartConfiguration, ChartOptions } from "chart.js";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-saldo-lijst',
  templateUrl: './saldo-lijst.component.html',
  styleUrls: ['./saldo-lijst.component.css']
})
export class SaldoLijstComponent implements OnInit {
  inkomsten: Saldo[] = [];
  filterInkomsten: Saldo[] = [];
  uitgaven: Saldo[] = [];
  filterUitgaven: Saldo[] = [];
  selectedMonth: string;
  totalInkomsten: number;
  totalUitgaven: number;
  totalSaldo: number;
  submitted = false;
  stopScrolling = true;

  @Input() huishoudboekje: string | null | undefined;
  private subscriptions: Subscription = new Subscription();

  public ChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: []
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false,
    scales: {
      x: {
        display: false,
      },
    },
  };

  public lineChartLegend = true;

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: []
  };

  public barChartOptions: ChartOptions<'bar'> = {
    responsive: false,
    scales: {
      x: {
        display: true,
      },
      y: {
        beginAtZero: true
      }
    },
  };

  public barChartLegend = false;

  constructor(private service: SaldoService) {
    this.selectedMonth = this.getDefaultMonth();
    this.filterByMonth();
    this.totalUitgaven = 0;
    this.totalInkomsten = 0;
    this.totalSaldo = 0;
    Chart.register(...registerables);
  }

  ngOnInit() {
    const inkomSub = this.service.getInkomsten(this.huishoudboekje).subscribe(saldo => {
      this.inkomsten = saldo;
      this.filterByMonth();
      this.generateChartData();
      this.getTotals();
      this.getTotalSaldo();
    });

    const uitgaSub = this.service.getUitgaven(this.huishoudboekje).subscribe(saldo => {
      this.uitgaven = saldo;
      this.filterByMonth();
      this.generateChartData();
      this.getTotals();
      this.getTotalSaldo();
      this.generateBarChartData();
    });

    this.subscriptions.add(inkomSub);
    this.subscriptions.add(uitgaSub);
  }

  generateChartData() {
    let cumulativeInkomsten = 0;
    let cumulativeUitgaven = 0;
    const cumulativeInkomstenData: number[] = [];
    const cumulativeUitgavenData: number[] = [];

    for (let i = 0; i < this.filterInkomsten.length; i++) {
      cumulativeInkomsten += parseFloat(String(this.filterInkomsten[i].bedrag));
      cumulativeInkomstenData.push(cumulativeInkomsten);
    }

    for (let i = 0; i < this.filterUitgaven.length; i++) {
      cumulativeUitgaven += parseFloat(String(this.filterUitgaven[i].bedrag)) * -1;
      cumulativeUitgavenData.push(cumulativeUitgaven);
    }

    this.ChartData = {
      labels: this.generateIndexLabels(Math.max(this.filterInkomsten.length, this.filterUitgaven.length)),
      datasets: [
        {
          data: cumulativeInkomstenData,
          label: 'Cumulatieve Inkomsten',
          fill: false,
          tension: 0.5,
          borderColor: 'rgba(46, 204, 113)',
          backgroundColor: 'rgba(46, 204, 113)'
        },
        {
          data: cumulativeUitgavenData,
          label: 'Cumulatieve Uitgaven',
          fill: false,
          tension: 0.5,
          borderColor: 'rgba(255, 0, 0)',
          backgroundColor: 'rgba(255, 0, 0)'
        }
      ]
    };
  }

  generateBarChartData() {
    const uitgavenPerCategorie: { [key: string]: number } = {};
    const backgroundColors: string[] = [];

    for (const uitgave of this.filterUitgaven) {
      const categorieNaam = uitgave.categorie ? uitgave.categorie.naam : 'Onbekend';
      if (!uitgavenPerCategorie[categorieNaam]) {
        uitgavenPerCategorie[categorieNaam] = 0;
        backgroundColors.push(this.getRandomColor());
      }
      uitgavenPerCategorie[categorieNaam] += parseFloat(String(uitgave.bedrag)) * -1;
    }

    const categorieLabels = Object.keys(uitgavenPerCategorie);
    const categorieData = Object.values(uitgavenPerCategorie);

    this.barChartData = {
      labels: categorieLabels,
      datasets: [
        {
          label: 'Uitgaven per Categorie',
          data: categorieData,
          backgroundColor: backgroundColors,
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 0
        }
      ]
    };
  }

  generateIndexLabels(count: number): string[] {
    const labels: string[] = [];
    for (let i = 1; i <= count; i++) {
      labels.push(`Item ${i}`);
    }
    return labels;
  }

  getTotals() {
    this.totalInkomsten = this.sumBedrag(this.filterInkomsten);
    this.totalUitgaven = this.sumBedrag(this.filterUitgaven);
  }

  sumBedrag(saldos: Saldo[]): number {
    return saldos.reduce((total, saldo) => total + parseFloat(String(saldo.bedrag)), 0);
  }

  getTotalSaldo() {
    this.totalSaldo = this.totalInkomsten - this.totalUitgaven;
  }

  toggleEdit(saldo: Saldo) {
    saldo.editMode = !saldo.editMode;
  }

  onSave(saldo: Saldo) {
    this.submitted = true;
    if (saldo.bedrag != null) {
      saldo.editMode = false;
      this.service.updateSaldo(saldo);
      this.submitted = false;
    }
  }

  onDelete(saldo: Saldo) {
    this.service.deleteSaldo(saldo);
  }

  filterByMonth() {
    if (this.selectedMonth) {
      const [year, month] = this.selectedMonth.split('-').map(Number);
      this.filterInkomsten = this.inkomsten.filter(saldo => {
        const datum = new Date(saldo.datum);
        return datum.getFullYear() === year && datum.getMonth() + 1 === month;
      });

      this.filterUitgaven = this.uitgaven.filter(saldo => {
        const datum = new Date(saldo.datum);
        return datum.getFullYear() === year && datum.getMonth() + 1 === month;
      });

      this.generateChartData();
      this.generateBarChartData();
    }
  }

  getDefaultMonth(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    return `${year}-${month < 10 ? '0' + month : month}`;
  }

  dragStart(event: DragEvent, item: any) {
    event.dataTransfer?.setData('text/plain', JSON.stringify(item));
  }

  onDrag(event: DragEvent) {
    this.stopScrolling = true;
    if (event.clientY < 100) {
      this.stopScrolling = false;
      this.scroll(-1);
    } else if (event.clientY > (window.innerHeight - 100)) {
      this.stopScrolling = false;
      this.scroll(1);
    }
  }

  onDragEnd(event: DragEvent) {
    this.stopScrolling = true;
  }

  scroll(step: number) {
    const scrollY = window.scrollY;
    window.scrollTo(0, scrollY + step);
    if (!this.stopScrolling) {
      setTimeout(() => this.scroll(step), 20);
    }
  }

  getRandomColor(): string {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
