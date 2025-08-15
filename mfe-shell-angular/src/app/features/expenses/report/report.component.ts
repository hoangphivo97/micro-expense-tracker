import { Component, inject, ViewChild } from '@angular/core';
import { HeaderComponent } from "../../../shared/components/header/header.component";
import { FilterComponent } from "../../../shared/components/filter/filter.component";
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  NgApexchartsModule
} from "ng-apexcharts";

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [HeaderComponent, FilterComponent, MatIcon, NgApexchartsModule],
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss',
})
export class ReportComponent {
  @ViewChild("chart") chart: ChartComponent | undefined;
  public chartOptions: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "My-series",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }
      ],
      chart: {
        height: 350,
        type: "bar"
      },
      title: {
        text: "My First Angular Chart"
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"]
      }
    };
  }

}

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};
