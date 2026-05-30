import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  Renderer2,
  Inject,
  inject,
} from '@angular/core';
import {
  loadRemote,
} from '@module-federation/enhanced/runtime';
import * as React from 'react';
import { createRoot, Root } from 'react-dom/client';
import { ReactComponentType } from '@micro-expense-tracker/shared/types';
import { DOCUMENT } from '@angular/common';
import { ThemeService } from '@micro-expense-tracker/shared/data-access';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-react-wrapper',
  standalone: true,
  templateUrl: './react-wrapper.component.html',
  styleUrls: ['./react-wrapper.component.css'],
})
export class ReactWrapperComponent implements AfterViewInit, OnDestroy {
  themeService = inject(ThemeService);
  ngZone = inject(NgZone);
  @ViewChild('reactContainer', { static: true }) containerRef!: ElementRef;
  root!: Root;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
  ) { }

  async ngAfterViewInit() {
    try {
      const m = await loadRemote<ReactComponentType>(
        'mfe_remote_react/DarkModeToggle',
      );

      if (m && m.default) {
        const ReactComp = m.default;
        this.root = createRoot(this.containerRef.nativeElement);
        this.root.render(
          React.createElement(ReactComp, {
            onThemeChange: (isDark: boolean) => {
              this.ngZone.run(() => {
                this.themeService.setDarkMode(isDark);
              });
            },
          }),
        );
      } else {
        console.error(
          'Remote module trả về null hoặc không có default export.',
        );
      }
    } catch (error) {
      console.error('Lỗi tải React Remote:', error);
    }
  }

  ngOnDestroy() {
    if (this.root) {
      this.root.unmount();
    }
  }
}