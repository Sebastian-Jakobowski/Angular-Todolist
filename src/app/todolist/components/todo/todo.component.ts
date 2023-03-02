import { Component, Input, Output, EventEmitter, OnInit, ElementRef, ViewChild, OnChanges, SimpleChanges } from "@angular/core";
import { TodolistService } from "../../services/todolist.service";
import { TodolistInterface } from "../../types/todolist.interface";
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
    selector: 'app-todos-todo',
    templateUrl: './todo.component.html'
})
export class TodoComponent implements OnInit, OnChanges{
    @Input('todo')
    todoProps!: TodolistInterface;
    @Input('isEditing')
    isEditingProps!: boolean;
    @Output('setEditingId')
    setEditingIdEvent: EventEmitter<string | null> = new EventEmitter;

    editingText: string = '';
    @ViewChild('textInput')
    textInput!: ElementRef;

    constructor(private todolistService: TodolistService) {}

    ngOnInit(): void {
        this.editingText = this.todoProps.text;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes["isEditingProps"].currentValue) {
            setTimeout(() => {
                this.textInput.nativeElement.focus();
            }, 0)
        }
    }

    setTodoInEditMode(): void {
        console.log('settodoineditmode');
        this.setEditingIdEvent.emit(this.todoProps.id);
    }

    removeTodo(): void {
        this.todolistService.removeTodo(this.todoProps.id);
    }

    toggleTodo(): void {
        this.todolistService.toggleTodo(this.todoProps.id);
    }

    changeTodo(): void {
        this.todolistService.changeTodo(this.todoProps.id, this.editingText);
        this.setEditingIdEvent.emit(null);
    }

    changeText(event: Event): void {
        const value = (event.target as HTMLInputElement).value;
        this.editingText = value;
    }
}