import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { IDao } from "../../models/IDao";
import { SQLiteObject } from "@ionic-native/sqlite";
import { Unit } from "../../models/class/Unit";

/*
  Generated class for the DaoUnit provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DaoUnit implements IDao {

  db: SQLiteObject;

  setDatabase(db: SQLiteObject) {
    if ((typeof (this.db) == 'undefined')) {
      console.log(db);
      this.db = db;
    }
  }

  constructor(public http: Http) {
  }

  create(element: Unit) {
    let sql = 'INSERT INTO Unit(sDescription,sInitials) VALUES(?,?)';
    return this.db.executeSql(sql, [element.sDescription, element.sInitials]);
  }

  createTable() {
    let sql = 'CREATE TABLE IF NOT EXISTS Unit(nId INTEGER PRIMARY KEY AUTOINCREMENT,sDescription TEXT, sInitials TEXT)';
    return this.db.executeSql(sql, []);
  }

  delete(element: Unit) {
    let sql = 'DELETE FROM Unit WHERE nId=?';
    return this.db.executeSql(sql, [element.nId]);
  }

  getAll() {
    let sql = 'SELECT * FROM Unit';
    return this.db.executeSql(sql, [])
      .then(response => {
        let units = [];
        for (let index = 0; index < response.rows.length; index++) {
          units.push(response.rows.item(index));
        }
        return Promise.resolve(units);
      })
      .catch(error => Promise.reject(error));
  }

  update(element: Unit) {
    let sql = 'UPDATE Unit SET sDescription=?, sInitials=? WHERE nId=?';
    return this.db.executeSql(sql, [element.sDescription, element.sInitials, element.nId]);
  }

}
