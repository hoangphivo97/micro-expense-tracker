import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
// FIX: Dùng loadRemote từ thư viện runtime chuẩn
import { loadRemote, registerRemotes } from '@module-federation/enhanced/runtime';
import * as React from 'react';
import { createRoot, Root } from 'react-dom/client';
import { ReactComponentType } from '../../../interface/shared.interface';

@Component({
  selector: 'app-react-wrapper',
  standalone: true,
  templateUrl: './react-wrapper.component.html',
  styleUrls: ['./react-wrapper.component.css'],
})
export class ReactWrapperComponent implements AfterViewInit, OnDestroy {
  @ViewChild('reactContainer', { static: true }) containerRef!: ElementRef;
  root!: Root;

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
        this.root.render(React.createElement(ReactComp, ));
      } else {
        console.error('Remote module trả về null hoặc không có default export.');
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