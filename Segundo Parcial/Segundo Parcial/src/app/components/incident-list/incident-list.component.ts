import { Component, OnInit } from '@angular/core';
import { Incident } from 'src/app/models/incident';
import { Priority } from 'src/app/models/priority';
import { IncidentService } from 'src/app/services/incident.service';
import { PriorityService } from 'src/app/services/priority.service';

@Component({
  selector: 'app-incident-list',
  templateUrl: './incident-list.component.html',
  styleUrls: ['./incident-list.component.css']
})

export class IncidentListComponent implements OnInit {

  incidentList:Array<Incident>;
  priorityList: Array<Priority>;

  constructor(private incidentService : IncidentService, private priorityService: PriorityService) { }

  ngOnInit(): void {
    this.incidentService.getAll()
      .then(response => {
        this.incidentList = response;
      })
      .catch(error => {
        console.log(error);
      })

      this.priorityService.getAll()
      .then(response => {
        this.priorityList = response;
      })
      .catch(error => {
        console.log(error);
      })
  }

  getPriorityDescriptionById(id:number): string{
    let value : string = "No existe"; 

    this.priorityList.forEach(priority =>{
      if(priority.priorityId === id){
        value = priority.description;
      }
    });
    return value;
  }

}
