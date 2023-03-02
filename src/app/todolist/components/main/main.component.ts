import { CdkDragDrop } from "@angular/cdk/drag-drop";
import { Component, OnInit } from "@angular/core";
import { Observable, combineLatestWith } from "rxjs"
import { map } from "rxjs/operators"
import { TodolistService } from "../../services/todolist.service";
import { FilterEnum } from "../../types/filter.enum";
import { TodolistInterface } from "../../types/todolist.interface";

@Component({
    selector: 'app-todolist-main',
    templateUrl: './main.component.html'
})
export class MainComponent implements OnInit{
    visibleTodos$: Observable<TodolistInterface[]>;
    noTodoClass$: Observable<boolean>;
    isAllTodosSelected$: Observable<boolean>;
    editingId: string | null = null;
    isAllTodosSelected: boolean = false;

    ngOnInit(): void {
        this.load();
    }

    constructor(private todolistService: TodolistService) {
        this.isAllTodosSelected$ = this.todolistService.todos$.pipe(
            map((todos) => todos.every((todo) => todo.isCompleted)));
        this.noTodoClass$ = this.todolistService.todos$.pipe(
            map((todos) => todos.length === 0)
        );
        this.visibleTodos$ = this.todolistService.todos$.pipe(
            combineLatestWith(this.todolistService.filter$)
            ).pipe(
                map(([todos, filter]: [TodolistInterface[],FilterEnum]) => {
                    if(filter === FilterEnum.active) {
                        return todos.filter(todo => !todo.isCompleted);
                    } else if (filter === FilterEnum.completed) {
                        return todos.filter(todo => todo.isCompleted)
                    }
                    return todos;
                })
                );
    }

    toggleAllTodos(): void {
        this.todolistService.toggleAll(this.isAllTodosSelected);
    }

    setEditingId(editingId: string | null): void {
        this.editingId = editingId;
    }

    drop(event: CdkDragDrop<TodolistInterface[]>) {
        this.todolistService.changeIndexPosition(event);        
      }

     load(): void {
        this.todolistService.loadFromLocalStorage();
      }
}