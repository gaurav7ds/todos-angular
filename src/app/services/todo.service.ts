import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { BehaviorSubject } from 'rxjs';
import { Observable, of } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todos:Todo[]; 
  private todoSource = new BehaviorSubject<Todo>({id:null,text:null,date:null});
  selectedTodo = this.todoSource.asObservable();
  constructor() { 
    this.todos = [{
      id:'1',text:'Buy some eggs',date:new Date('12/16/2017 12:54:23')
    },{
      id:'2',text:'Assignment to complete',date:new Date('12/16/2017 2:06:14')
    },{
      id:'3',text:'Amazon delivery',date:new Date('12/16/2017 9:22:27')
    }]
  }
  getTodos():Observable<Todo[]>{
    return of(this.todos);
  }

  setFormTodo(todo:Todo){
    this.todoSource.next(todo)
  }
}
