import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {
  id:string;
  text:string;
  date:any;
  //text:boolean = false;
  constructor(private todoService:TodoService) { }

  ngOnInit(){
    this.todoService.selectedTodo.subscribe(todo=>{
      if(todo.id!==null){
        this.id = todo.id;
        this.text = todo.text;
        this.date = todo.date;

      }
    })
  }

}
