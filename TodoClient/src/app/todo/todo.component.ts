import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/services/auth.service';
import { TodoService } from './services/todo.service';

interface ResponseData {
  message: string;
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})

export class TODOComponent {

  TODOList: any[] = [];
  errorMessage = '';
  idx: number = 0;
  token!: string;

  selectedItemTodelete: any | null = null;
  selectedItemToupdate: any | null = null;
  DisplayDetails: boolean = false;
  TodoDetailelement: any = null;

  TODO = this.fb.group({
    Mission: ['', Validators.required],
    Date: ['', [Validators.required]],
    Description: [''],
  });


  constructor(private http: HttpClient, private fb: FormBuilder, private authservice: AuthService,private todoservice:TodoService) {
    this.token = localStorage.getItem('jwtToken')!;
    this.fetchData();
  }

  fetchData() {

    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

    this.http.get('http://localhost:3000/todo/tasks', { headers, observe: 'response' }).subscribe(
      response => {

        this.TODOList = response.body as any[];

        this.TODOList.sort((mission1, mission2) => {
          const dateA = new Date(mission1.Date.split('-').reverse().join('-'));
          const dateB = new Date(mission2.Date.split('-').reverse().join('-'));
          return dateA.getTime() - dateB.getTime();
        });

        let idx = 0;
        this.TODOList.forEach((item) => {
          item.id = idx;
          idx++;
        });
        this.idx = this.TODOList.length;
      },
      error => {
        this.authservice.logout();
      }
    );
  }

  // --------------------------------------------------------------------------------------------

  addMission(mission: any) {

    if (mission.Mission && mission.Date) {

      if (this.todoservice.isValidDate(mission.Date)) {

        this.errorMessage = '';

        const data = { id: this.idx, Mission: mission.Mission, Date: mission.Date, Description: mission.Description };

        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

        this.http.post<ResponseData>('http://localhost:3000/todo/add', data, { headers, observe: 'response' }).subscribe(response => {

          if (response.body?.message === "KO")
            this.errorMessage = 'This mission already exists.';
          else {
            this.fetchData();
          }
        });
      } else {
        this.errorMessage = 'Please choose a valid date';
      }
    }

    else {
      this.errorMessage = 'You need to fill the form, please.';
    }

    this.DisplayDetails = false;
    this.TodoDetailelement = null;
  }


  // --------------------------------------------------------------------------------------------

  updateMission(mission: any, id: Number) {
    this.errorMessage = '';

    if (this.todoservice.isValidDate(mission.Date)) {

      const data = { id: id, Mission: mission.Mission, Date: mission.Date, Description: mission.Description };

      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

      this.http.post<ResponseData>('http://localhost:3000/todo/update', data, { headers, observe: 'response' }).subscribe(response => {

        if (response.body?.message === "KO")
          this.errorMessage = 'This mission already exists.';
        else {
          this.fetchData();
          this.RestorOpacity();
        }
      });
      this.disableMission(false);
    }
    else {
      this.errorMessage = 'Choose a valid date';
    }
    
  }

  UpdateAction(item: any) {

    this.selectedItemToupdate = item
    const List = document.querySelector('.Liste');
    List?.classList.add('opacity');
    this.TODO.get('Mission')?.setValue(item.Mission);
    this.TODO.get('Date')?.setValue(this.todoservice.FormatDate(item.Date));
    this.TODO.get('Description')?.setValue(item.Description);

    this.disableMission(true);
  }


  disableMission(disabled: boolean) {
    const missionElement = document.getElementById('MISSION') as HTMLInputElement;
    if (missionElement) {
      missionElement.disabled = disabled;
    }
  }


  
  // --------------------------------------------------------------------------------------------


  DeleteAction(id: Number) {
    this.selectedItemTodelete = { id: id };
    const List = document.querySelector('.MYLISTODO');
    List?.classList.add('opacity');
  }

  DeleteMission(id: String) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    this.http.delete('http://localhost:3000/todo/del/' + id, { headers }).subscribe(
      () => {
        this.fetchData();
      },
      (error) => {
        console.error('Error deleting mission:', error);
      }
    );
    this.RestorOpacity();
  }

  // --------------------------------------------------------------------------------------------


  displayInfo(id: number) {

    this.DisplayDetails = true;
    this.TodoDetailelement = this.TODOList[id];

  }



  isvalidId(id: number) {
    return 0 <= id && id < this.idx;
  }

  // --------------------------------------------------------------------------------------------


  RestorOpacity() {

    this.errorMessage = '';
    this.selectedItemTodelete = null;
    this.selectedItemToupdate = null;
    const List = document.querySelector('.MYLISTODO');
    List?.classList.remove('opacity');
    this.TODO.get('Mission')?.setValue('');
    this.TODO.get('Date')?.setValue('');
    this.TODO.get('Description')?.setValue('');

    this.disableMission(false);

  }


  isDateBetween(date: string, min: number, max: number): boolean {
    return this.todoservice.isDateBetween(date,min,max);
  }

}
