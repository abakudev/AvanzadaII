import { Component } from '@angular/core';
import { Client } from './models/client'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Clients Application';
  clientList = new Array<Client>();
  client = new Client();

  deleteClient(client : Client){
    this.client = client;
  }


}
