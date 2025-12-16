import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { loadRemoteModule } from '@angular-architects/module-federation';
import * as ReactDOM from 'react-dom/client'; // Cần cài đặt react-dom/client trong Host Angular
import * as React from 'react';

type RemoteReactComponent = React.FC<any>;

@Component({
  selector: 'app-dark-mode-wrapper',
  template: '<div #reactContainer></div>', 
  styles: [''],
  standalone: true
})
export class DarkModeWrapperComponent implements OnInit, OnDestroy {
  @ViewChild('reactContainer', { static: true }) container!: ElementRef;
  private root!: ReactDOM.Root;
  
  // Tải component từ Remote React
  ngOnInit(): void {
    loadRemoteModule({
      remoteName: 'reactRemote',
      exposedModule: './DarkModeToggle',
      // Vì remotes: {} trong Webpack, ta phải cung cấp URL ở đây:
      remoteEntry: 'http://localhost:5000/remoteEntry.js', 
    })
    .then(m => {
      const DarkModeToggle = m.default || m.DarkModeToggle; // Lấy export
      
      // Render component React vào DOM Angular
      const rootElement = this.container.nativeElement;
      this.root = ReactDOM.createRoot(rootElement);
      this.root.render(
        React.createElement(DarkModeToggle, {
          onStateChange: (state: boolean) => this.handleReactState(state)
        })
      );
    })
    .catch(err => console.error('Lỗi tải module React:', err));
  }

  handleReactState(isDark: boolean){
    console.log('State from React', isDark)
  }

  // Dọn dẹp
  ngOnDestroy(): void {
    if (this.root) {
      this.root.unmount();
    }
  }
}