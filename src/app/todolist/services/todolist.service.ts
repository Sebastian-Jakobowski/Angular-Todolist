import { Injectable, OnInit } from "@angular/core";
import { CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import { BehaviorSubject, map } from "rxjs";
import { FilterEnum } from "../types/filter.enum";
import { TodolistInterface } from "../types/todolist.interface";

@Injectable()
export class TodolistService {
    todos$ = new BehaviorSubject<TodolistInterface[]>([]);
    filter$ = new BehaviorSubject<FilterEnum>(FilterEnum.all);

    addTodo(text: string): void {
        const newTodo: TodolistInterface = {
            text,
            isCompleted: false,
            id: Math.random().toString(16),
        };
        const updatedTodos = [...this.todos$.getValue(), newTodo]
        this.saveAndUpdateTodos(updatedTodos);
    }

    addTodoFromStorage(todo: TodolistInterface): void {
        const updatedTodos = [...this.todos$.getValue(), todo]
        this.todos$.next(updatedTodos);
    }

    toggleAll(isCompleted: boolean): void {
        const updatedTodos = this.todos$.getValue().map(todo => {
            return {
                ...todo,
                isCompleted
            };
        });
        this.saveAndUpdateTodos(updatedTodos);
    }

    changeFilter(filterName: FilterEnum): void {
        this.filter$.next(filterName);
    }

    changeTodo(id: string, text: string, ): void {
        const updatedTodos = this.todos$.getValue().map(todo => {
            if(todo.id === id) {
                return {
                    ...todo,
                    text,
                };
            }
            return todo;
        });
        this.saveAndUpdateTodos(updatedTodos);
    }

    removeTodo(id: string): void {
        const updatedTodos = this.todos$.getValue().filter(todo => todo.id !== id);
        this.todos$.next(updatedTodos);
    }

    toggleTodo(id: string): void {
        const updatedTodos = this.todos$.getValue().map(todo => {
            if (todo.id == id) {
                return {
                    ...todo,
                    isCompleted: !todo.isCompleted,
                }
            }
            return todo
        });
        this.saveAndUpdateTodos(updatedTodos);
    }

    changeIndexPosition(event: CdkDragDrop<TodolistInterface[]>): void {
        const updatedTodos = moveItemInArray(this.todos$.getValue(), event.previousIndex, event.currentIndex);
    }

    loadFromLocalStorage() {
        console.log('Länge ist: ' + localStorage.length + ' Inhalt ist: ' + localStorage);
        for (let index = 0; index < localStorage.length; index++) {
            const item = localStorage.getItem(index.toString());
            if(item){
                this.addTodoFromStorage(JSON.parse(item));
            }
        }
    }

    private saveToLocalStorage() {
        localStorage.clear();
        this.todos$.getValue().forEach((todo, index) => {
            localStorage.setItem(index.toString(), JSON.stringify(todo)); 
        });
    }

    private saveAndUpdateTodos(updatedTodos: TodolistInterface[]) {
        this.todos$.next(updatedTodos);
        this.saveToLocalStorage();
    }
    }