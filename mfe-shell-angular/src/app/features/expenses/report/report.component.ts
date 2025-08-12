import { Component } from '@angular/core';
import { HeaderComponent } from "../../../shared/components/header/header.component";
import { FilterComponent } from "../../../shared/components/filter/filter.component";

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [HeaderComponent, FilterComponent],
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss'
})
export class ReportComponent {

}
