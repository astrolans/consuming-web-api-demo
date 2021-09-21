import { HttpClient } from '@angular/common/http';
import { InterpolationConfig } from '@angular/compiler';
import { Component } from '@angular/core';

interface IPerson {
  name: string;
}

interface ITodoItem {
  id: number;
  description: string;
  assignedTo: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  people: IPerson[] = [];
  todoes: ITodoItem[] = [];

  constructor(private http: HttpClient) { }

  async loadPeople() {
    this.people = await this.http
      .get<IPerson[]>('http://localhost:8080/api/people')
      .toPromise();
  }

  async loadTodos() {
    this.todoes = await this.http
      .get<ITodoItem[]>('http://localhost:8080/api/todos')
      .toPromise();
  }

  async addDemoData() {
    await this.http
      .post('http://localhost:8080/api/todos', {
        "description": "Shopping",
        "assignedTo": "Eve"
      })
      .toPromise();
    this.loadTodos();
  }

  async deleteItem(id: number) {
    await this.http
      .delete(`http://localhost:8080/api/todos/${id}`)
      .toPromise();
    this.loadTodos();
  }
}
