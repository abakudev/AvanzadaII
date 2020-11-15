import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/common/custom-validators';
import { Incident } from 'src/app/models/incident';
import { Priority } from 'src/app/models/priority';
import { IncidentService } from 'src/app/services/incident.service';
import { PriorityService } from 'src/app/services/priority.service';

@Component({
  selector: 'app-incident-add',
  templateUrl: './incident-add.component.html',
  styleUrls: ['./incident-add.component.css']
})
export class IncidentAddComponent implements OnInit {

  message: string = '';
  public priorityList: Array<Priority>; 
  public incidentForm: FormGroup

  constructor(private priorityService: PriorityService, private incidentService: IncidentService) {  }

  ngOnInit(): void {

    this.priorityService.getAll()
      .then(response => {
        this.priorityList = response;
        console.log(this.priorityList)
      })
      .catch(error => {
        console.log(error);
      })

      this.incidentForm = new FormGroup({
        priority: new FormControl('', [Validators.required]),
        domain: new FormControl('', [Validators.required, CustomValidators.forbiddenWords(/.com/), CustomValidators.forbiddenWords(/.gov/)]),
        title: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        creator: new FormControl('', [Validators.required]),
        phoneNumber: new FormControl('', CustomValidators.numbersOnly())
    
      });
  }

  get priorityId() { return this.incidentForm.get('priorityId'); }
  get title() { return this.incidentForm.get('title'); }
  get creator() { return this.incidentForm.get('creator'); }
  get description() { return this.incidentForm.get('description'); }
  get domainName() { return this.incidentForm.get('domainName'); }
  get phoneNumber() { return this.incidentForm.get('phoneNumber'); }

  onSubmit(){

    let incident = new Incident();
    incident.priorityId = this.priorityId.value;
    incident.domainName = this.domainName.value;
    incident.title = this.title.value;
    incident.description = this.description.value;
    incident.creator = this.creator.value;
    incident.phoneNumber = this.phoneNumber.value;


    this.incidentService.add(incident)
      .then(response  => {
        this.message = "Incident successfully added";
      })
      .catch(error =>{
        this.message = "An error has occurred!";
      })
  }

}
