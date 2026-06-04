import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-breadcrumb',
  standalone: true,
  imports: [],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss',
})
export class BreadcrumbComponent implements OnInit {
  router = inject(Router);
  firstBreadcrumb = '';

  ngOnInit(): void {
    this.getBreadcrumb();
  }

  getBreadcrumb() {
    //Will need improve if have more sub path
    const path: string = this.router.url.split('/')[1];
    this.firstBreadcrumb = path;
  }
}
