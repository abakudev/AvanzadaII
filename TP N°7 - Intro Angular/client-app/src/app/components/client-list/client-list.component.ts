import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { Client } from 'src/app/models/client';
import { ClientAddEditComponent } from '../client-add-edit/client-add-edit.component';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

  @ViewChild(ClientAddEditComponent) modal : ClientAddEditComponent;

  @Input()
  clientList : Array<Client> = new Array<Client>();

  @Output()
  deletedClientEvent = new EventEmitter<Client>();

  constructor() { }

  ngOnInit(): void {
  }

  open(){
    this.modal.open();
  }

  deleteClient(client : Client){    
    this.deletedClientEvent.emit(client);
  }  

}
