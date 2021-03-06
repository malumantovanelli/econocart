// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/dist/long-stack-trace-zone';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/jasmine-patch';
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';

import { Http } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { getTestBed, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { App, Config, Form, IonicModule, Keyboard, DomController} from 'ionic-angular';
import { MenuController, NavController, Platform, NavParams } from 'ionic-angular';
import { AlertController, ActionSheetController, GestureController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { Toast } from "@ionic-native/toast";
import { LoadingController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';

import { ConfigMock, PlatformMock, NavParamsMock, NavMock, AlertMock, ActionSheetControllerMock } from './mocks';
import { CrudUnidadeMedida } from './providers/CrudUnidadeMedida.service'
import { CrudProduto } from './providers/CrudProduto.service'
import { CrudConsulta } from './providers/CrudConsulta.service';
import { CrudNecessidade } from './providers/CrudNecessidade.service';
import { CrudPlanejamento } from './providers/CrudPlanejamento.service';
import { CrudSupermercado } from './providers/CrudSupermercado.service';
import { OrmDatabase } from './persistence/OrmDatabase.service'
import { Relatorios } from './providers/Relatorios.service';
import { SocialSharingService } from './providers/SocialSharing.service';


// Unfortunately there's no typing for the `__karma__` variable. Just declare it as any.
declare var __karma__: any;
declare var require: any;

// Prevent Karma from running prematurely.
__karma__.loaded = function (): void {
    // noop
};

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting(),
);
// Then we find all the tests.
const context: any = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);
// Finally, start Karma to run the tests.
__karma__.start();

export class TestUtils {

    public static beforeEachCompiler(components: Array<any>): Promise<{fixture: any, instance: any}> {
        return TestUtils.configureIonicTestingModule(components)
        .compileComponents().then(() => {
            let fixture: any = TestBed.createComponent(components[0]);
            return {
                fixture: fixture,
                instance: fixture.debugElement.componentInstance,
            };
        });
    }

    public static configureIonicTestingModule(components: Array<any>): typeof TestBed {
        return TestBed.configureTestingModule({
            declarations: [
                ...components,
            ],
            providers: [
                App,
                Form,
                Keyboard,
                DomController,
                MenuController,
                Toast,
                ToastController,
                GestureController,
                Http,
                SocialSharing,
                {provide: Platform, useClass: PlatformMock},
                {provide: Config, useClass: ConfigMock},
                {provide: NavParams, useClass: NavParamsMock},
                {provide: NavController, useClass: NavMock},
                {provide: AlertController, useClass: AlertMock},
                {provide: ActionSheetController, useClass: ActionSheetControllerMock},
                {provide: LoadingController, useClass: ActionSheetControllerMock},
                OrmDatabase,
                CrudUnidadeMedida,
                CrudProduto,
                CrudConsulta,
                CrudNecessidade,
                CrudPlanejamento,
                CrudSupermercado,
                Relatorios,
                SocialSharingService,
            ],
            imports: [
                FormsModule,
                IonicModule,
                ReactiveFormsModule,
            ],
        });
    }

    // http://stackoverflow.com/questions/2705583/how-to-simulate-a-click-with-javascript
    public static eventFire(el: any, etype: string): void {
        if (el.fireEvent) {
            el.fireEvent('on' + etype);
        } else {
            let evObj: any = document.createEvent('Events');
            evObj.initEvent(etype, true, false);
            el.dispatchEvent(evObj);
        }
    }
}
