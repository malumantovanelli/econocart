import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { PageForm } from '../generico_form/main';
import { Produto } from '../../entities/Produto';

@Component({
    selector: 'page-form',
    templateUrl: '../generico_form/main.html'
})
export class PageFormProduto extends PageForm<Produto> {
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public toastCtrl: ToastController,
    ){
        super(navCtrl, navParams, toastCtrl);
        for(let fieldIndex in this.fields){
            this.fields[fieldIndex]['data'] = this.editing[this.fields[fieldIndex]['entity']]
        }
        for(let field of this.fields){
            if(field['type'] == 'select'){
                for(let fieldIndex in this.fields){
                    let saved = this.fields[fieldIndex]['data']
                    let avail = this.selectablesFor(field['entity'])
                    if(saved && saved.id){
                        for(let placeable of avail){
                            if(placeable.id == saved.id){
                                this.fields[fieldIndex]['data'] = placeable
                            }
                        }
                    }
                }
            }
            if(field['type'] == 'selectmultiple'){
                for(let fieldIndex in this.fields){
                    let saveds = this.fields[fieldIndex]['data']
                    let avail = this.selectablesFor(field['entity'])
                    for(let savi in saveds){
                        if(saveds[savi] && saveds[savi].id){
                            for(let placeable of avail){
                                if(placeable.id == saveds[savi].id){
                                    this.fields[fieldIndex]['data'][savi] = placeable
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    public textOption(field: string, item: any): string{
        let r = '';
        if(field == 'unidadeMedida'){ r = item['nome'] }
        return r;
    };
    public titulo: string = "produto";
    public fields: object[] = [
        {
            type: 'textbox',
            label: 'Nome',
            entity: 'nome',
            verifywith: 'length'
        },
        {
            type: 'select',
            label: 'Unidade de medida',
            entity: 'unidadeMedida',
            verifywith: 'truthy'
        },
    ];
}
