import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, Renderer2, Inject } from '@angular/core';
import { loadRemote, registerRemotes } from '@module-federation/enhanced/runtime';
import * as React from 'react';
import { createRoot, Root } from 'react-dom/client';
import { ReactComponentType } from '../../../interface/shared.interface';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-react-wrapper',
  standalone: true,
  templateUrl: './react-wrapper.component.html',
  styleUrls: ['./react-wrapper.component.css'],
})
export class ReactWrapperComponent implements AfterViewInit, OnDestroy {
  @ViewChild('reactContainer', { static: true }) containerRef!: ElementRef;
  root!: Root;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) {
  }

  async ngAfterViewInit() {
    try {
      registerRemotes([
        {
          name: 'mfe_remote_react',
          entry: 'http://localhost:5000/remoteEntry.js',
        }
      ]);

      const m = await loadRemote<ReactComponentType>('mfe_remote_react/DarkModeToggle');

      if (m && m.default) {
        const ReactComp = m.default;
        this.root = createRoot(this.containerRef.nativeElement);
        this.root.render(React.createElement(ReactComp, {
          onThemeChange: (isDark: boolean) => {
            this.handleThemeChange(isDark);
          }
        }));
      } else {
        console.error('Remote module trả về null hoặc không có default export.');
      }

    } catch (error) {
      console.error('Lỗi tải React Remote:', error);
    }
  }

  handleThemeChange(isDark: boolean){
    if(isDark){
      this.renderer.addClass(this.document.body, 'dark-mode');
    } else{
      this.renderer.removeClass(this.document.body, 'dark-mode');
    }
  }

  ngOnDestroy() {
    if (this.root) {
      this.root.unmount();
    }
  }
}