import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild, signal, effect } from '@angular/core';
import { loadRemoteModule } from '@angular-architects/module-federation';

@Component({
    selector: 'app-react-wrapper',
    standalone: true,
    template: `
    <div class="p-4">
      <h2>React remote inside Angular</h2>

      <label>
        User:
        <input [value]="user()"  (input)="onInput($event)" />
      </label>

      <div #mount style="margin-top:12px;"></div>
    </div>
  `,
})
export class ReactWrapperComponent implements AfterViewInit, OnDestroy {
    @ViewChild('mount', { static: true }) mount!: ElementRef<HTMLDivElement>;
    private root: any;           // React Root
    user = signal('Phi');        // demo prop Angular -> React

    async ngAfterViewInit() {
        // 1) tải module từ React remote
        const mod = await loadRemoteModule({
            type: 'module',
            remoteEntry: 'http://localhost:5000/remoteEntry.js',
            exposedModule: './DarkModeToggle',
        });

        const ReactComponent = mod.default;

        // 2) render bằng react-dom/client
        const React = await import('react');
        const { createRoot } = await import('react-dom/client');

        this.root = createRoot(this.mount.nativeElement);
        this.root.render(React.createElement(ReactComponent, { user: this.user() }));

        // 3) cập nhật lại khi signal thay đổi
        effect(() => {
            const u = this.user();
            this.root?.render?.(React.createElement(ReactComponent, { user: u }));
        });
    }

    onInput(e: Event) {
        this.user.set((e.target as HTMLInputElement).value);
    }

    ngOnDestroy() {
        try { this.root?.unmount?.(); } catch { }
    }
}
