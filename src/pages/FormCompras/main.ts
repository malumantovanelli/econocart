import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { PageForm } from '../generico_form/main';
import { Planejamento } from '../../entities/Planejamento';

@Component({
    selector: 'page-form',
    templateUrl: '../generico_form/main.html'
})
export class PageFormCompras extends PageForm<Planejamento> {
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public toastCtrl: ToastController,
    ){
        super(navCtrl, navParams, toastCtrl);
        this.postSuper();
    }
    public textOption(field: string, item: any): string{
        let r = '';
        if(field=="supermercados"){ r = item['nome'] }
        return r;
    }
    public titulo: string = "lista de compras";
    public fields: object[] = [
        {
            type: 'textbox',
            label: 'Nome',
            entity: 'nome',
            verifywith: 'length'
        },
        {
            type: 'selectmultiple',
            label: 'Supermercados',
            entity: 'supermercados',
            verifywith: 'length'
        },
    ];
}
