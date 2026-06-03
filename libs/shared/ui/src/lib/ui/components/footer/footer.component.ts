import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'lib-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  providers: [DatePipe],
})
export class FooterComponent  {
  readonly author = 'Vo Hoang Phi';
  readonly currentYear = new Date().getFullYear();

}
