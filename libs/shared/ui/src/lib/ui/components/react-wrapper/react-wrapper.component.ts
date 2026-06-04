import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  inject,
} from '@angular/core';
import {
  loadRemote,
  registerRemotes,
} from '@module-federation/enhanced/runtime';
import * as React from 'react';
import { createRoot, Root } from 'react-dom/client';
import { ReactComponentType } from '@micro-expense-tracker/shared/types';

import { ThemeService } from '@micro-expense-tracker/shared/data-access';
import { NgZone } from '@angular/core';

@Component({
  selector: 'lib-react-wrapper',
  standalone: true,
  templateUrl: './react-wrapper.component.html',
  styleUrls: ['./react-wrapper.component.css'],
})
export class ReactWrapperComponent implements AfterViewInit, OnDestroy {
  protected readonly themeService = inject(ThemeService);
  private readonly ngZone = inject(NgZone);

  @ViewChild('reactContainer', { static: true }) containerRef!: ElementRef;
  private root!: Root;

  async ngAfterViewInit() {
    try {
      registerRemotes([
        {
          name: 'mfe_remote_react',
          entry: 'http://localhost:5000/remoteEntry.js',
        },
      ]);

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