import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {
  id:number;
  text:string;
  date:any;
  isNew:boolean = true;
  constructor(private todoService:TodoService) { }

  ngOnInit(){
    this.todoService.selectedTodo.subscribe(todo=>{
      if(todo.id!==null){
        this.isNew = false;
        this.id = todo.id;
        this.text = todo.text;
        this.date = todo.date;

      }
    })
  }
  clearState(){
    this.isNew = true;
    this.id = null;
    this.text = '';
    this.date = '';
    this.todoService.clearState();
  }
  idNum = 4;

  onSubmit(){
    if(this.isNew){

      const newTodo = {
        id:this.idNum++,
        text: this.text,
        date:new Date()
      }
      console.log(this.idNum);
      this.todoService.addTodo(newTodo);
    }else{
      const updateTodo = {
        id:this.id,
        text:this.text,
        date:new Date()
      }
      this.todoService.updateTodo(updateTodo)
    }
    this.clearState();
  }

}
