import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  providers: [DatePipe],
})
export class FooterComponent implements OnInit {
  readonly author = 'Vo Hoang Phi';
  readonly currentYear = new Date().getFullYear();

  ngOnInit(): void {
  }

}
