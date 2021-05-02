import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos:Todo[];
  selectedTodo:Todo;
  loaded:boolean = false;

  constructor(private todoService:TodoService) { }

  ngOnInit() {
    this.todoService.stateClear.subscribe(clear=>{
      if(clear){
        this.selectedTodo = {id:null,text:'',date:''};
      }
    })
    this.todoService.getTodos().subscribe(todos =>{
      this.todos = todos
      this.loaded = true;
    })

    
  }
  onSelect(todo:Todo){
    this.todoService.setFormTodo(todo);
    this.selectedTodo = todo;
  }
  onDelete(todo:Todo){
    console.log(todo.id);
    this.todoService.deleteTodo(todo);
    
  }

}
