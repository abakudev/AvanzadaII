import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Client } from 'src/app/models/client'
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-client-add-edit',
  templateUrl: './client-add-edit.component.html',
  styleUrls: ['./client-add-edit.component.css']
})
export class ClientAddEditComponent implements OnInit {

  @ViewChild("content") modal : TemplateRef<string>;
  
  @Input()
  clientList : Array<Client> = new Array<Client>();
  clientId : number;
  firstname : string;
  lastname : string;
  dni : number;
  email : string;
  adress : string;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  open(){
    this.modalService.open(this.modal);
  }

  close(){
    this.modalService.dismissAll();
  }

  addClient(){

    let client = new Client();

    client.clientId = this.clientId;
    client.firstname = this.firstname;
    client.lastname = this.lastname;
    client.dni = this.dni;
    client.email = this.email;
    client.adress = this.adress;

    this.clientList.push(client);
  }

}
