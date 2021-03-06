import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { PageInicio } from '../pages/inicio/main';
import { PageListaUnidadeMedida } from '../pages/ListaUnidadeMedida/main';
import { PageListaProduto } from '../pages/ListaProduto/main';
import { PageListaSupermercado } from '../pages/ListaSupermercado/main';
import { PageListaCompras } from '../pages/ListaCompras/main';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = PageInicio;

    pages: Array<{ title: string, component: any }>;

    constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
        this.initializeApp();

        // used for an example of ngFor and navigation
        this.pages = [
            /*
            { title: 'Lista de Itens', component: ListItemListPage },
            { title: 'Supermercados', component: MarketListPage },
            { title: 'Produtos', component: ProductListPage },
            { title: 'Unidades', component: UnitListPage }
            */
            { title: 'Listas de compras', component: PageListaCompras },
            { title: 'Supermercados', component: PageListaSupermercado },
            { title: 'Produtos', component: PageListaProduto },
            { title: 'Unidades de medida', component: PageListaUnidadeMedida },
        ];

    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.backgroundColorByHexString('#9d6e48');
            this.splashScreen.hide();

        });
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }
    btnOpenHome() {
        this.openPage({ component: PageInicio })
    }
}
