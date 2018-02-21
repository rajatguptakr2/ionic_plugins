import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { SMS } from '@ionic-native/sms';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    private spinnerDialog: SpinnerDialog,
    private sqlite: SQLite,
    private sms: SMS
  ) {
    // this.fetchData()
  }
  
  ngOnInit() {
    this.databaseInit();
  }

  database;
  username;


  databaseInit() {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        this.database = db;
        db.executeSql('CREATE TABLE IF NOT EXISTS usernameList(id INTEGER PRIMARY KEY AUTOINCREMENT,name)', {})
          .then(() => console.log('Executed SQL'))
          .catch(e => console.log(e));
      })
      .catch(e => console.log(e));
  }

  addData() {
    this.database.executeSql('INSERT INTO usernameList(name) VALUES(\'' + this.username + '\')', [])
      .then(() => console.log('Executed SQL'))
      .catch(e => console.log(e));
      this.fetchData();
  };
  
  mobilenumber;

  SendMsg(){

    this.sms.send(this.mobilenumber, 'Hello world!');
    alert('Done');
  }


  items
  fetchData() {

    //data retrieve section

    this.database.executeSql('select * from usernameList', {}).then((data) => {

     // console.log(JSON.stringify(data));

      //console.log(data.rows.length);
      //console.log(data.rows.item(5).name);
      this.items = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          //console.log(data.rows.item(i).name);�
          this.items.push({ name: data.rows.item(i).name });
        }
      }

    })

  }
}
