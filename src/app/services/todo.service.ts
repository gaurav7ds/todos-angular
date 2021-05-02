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

  private stateSource = new BehaviorSubject<boolean>(true);
  stateClear = this.stateSource.asObservable();

  constructor() { 
    this.todos = [];
  }
  getTodos():Observable<Todo[]>{
    if(localStorage.getItem('todos')===null){
      this.todos = [];
    }else{
      this.todos = JSON.parse(localStorage.getItem('todos'));
    }
    return of(this.todos.sort((a,b)=>b.date-a.date))
  }

  setFormTodo(todo:Todo){
    this.todoSource.next(todo)
  }
  addTodo(todo:Todo){
    this.todos.unshift(todo);
    localStorage.setItem('todos',JSON.stringify(this.todos));
  }
  updateTodo(todo:Todo){
    this.todos.forEach((curr,index)=>{
      if(todo.id===curr.id){
        this.todos.splice(index,1);
      }
    });
    this.todos.unshift(todo);
    localStorage.setItem('todos',JSON.stringify(this.todos));

  }
  deleteTodo(todo:Todo){
    this.todos.forEach((curr,index)=>{
      if(todo.id===curr.id){
        this.todos.splice(index,1);
      }
    });
    localStorage.setItem('todos',JSON.stringify(this.todos));

  }
  clearState(){
    this.stateSource.next(true);
  }
}
