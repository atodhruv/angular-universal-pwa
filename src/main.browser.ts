import 'zone.js/dist/zone';
import 'reflect-metadata';
import 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserAppModule } from './app/browser-app.module';
import { ApplicationRef, enableProdMode } from '@angular/core';
import { AppModule } from './app/app.module';
import { enableDebugTools } from '@angular/platform-browser';
import { bootloader } from '@angularclass/hmr';

if (process.env.NODE_ENV === 'production') {
    enableProdMode();
}

const decorateModuleRef = (modRef: any) => {
    const appRef = modRef.injector.get(ApplicationRef);
    const cmpRef = appRef.components[0];

    const _ng = (window as any).ng;
    enableDebugTools(cmpRef);
    (window as any).ng.probe = _ng.probe;
    (window as any).ng.coreTokens = _ng.coreTokens;
    return modRef;
};

export function main(): Promise<any> {
    return platformBrowserDynamic()
        .bootstrapModule(BrowserAppModule)
        .then(decorateModuleRef).then(() => {
            if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
                navigator.serviceWorker.register('./worker-basic.min.js');
            }
        })
        .catch((err) => console.error(err));
}

// needed for hmr
// in prod this is replace for document ready
bootloader(main);
