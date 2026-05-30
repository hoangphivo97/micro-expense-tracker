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
import * as React from 'react';
import { createRoot, Root } from 'react-dom/client';
import { ReactComponentType } from '@micro-expense-tracker/shared/types';
import { DOCUMENT } from '@angular/common';
import { ThemeService } from '@micro-expense-tracker/shared/data-access';

@Component({
  selector: 'app-react-wrapper',
  standalone: true,
  templateUrl: './react-wrapper.component.html',
  styleUrls: ['./react-wrapper.component.css'],
})
export class ReactWrapperComponent implements AfterViewInit, OnDestroy {
  themeService = inject(ThemeService);
  @ViewChild('reactContainer', { static: true }) containerRef!: ElementRef;
  root!: Root;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
  ) {}

  async ngAfterViewInit() {
    try {
      // @ts-ignore - Bypass tạm thời lỗi TS (Sẽ hướng dẫn bỏ ở dưới)
      const m = await import('mfe-remote-react/DarkModeToggle');

      if (m && m.default) {
        const ReactComp = m.default as React.ElementType;
        
        // Khởi tạo React Root
        this.root = createRoot(this.containerRef.nativeElement);
        
        // Render Component React với Props
        this.root.render(
          React.createElement(ReactComp, {
            onThemeChange: (isDark: boolean) => {
              this.themeService.setDarkMode(isDark);
            },
          }),
        );
      } else {
        console.error('Remote module trả về null hoặc không có default export.');
      }
    } catch (error) {
      console.error('Lỗi khi tải React Remote Component:', error);
    }
  }

  ngOnDestroy() {
    if (this.root) {
      this.root.unmount();
    }
  }
}
