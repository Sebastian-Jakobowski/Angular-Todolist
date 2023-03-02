import { Component } from "@angular/core";
import { TodolistService } from "../../services/todolist.service";

@Component({
    selector: 'app-todolist-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {
    text: string = '';

    constructor(private todolistService: TodolistService) {}

    changeText(event: Event): void {
        if(event.target) {
            const target = event.target as HTMLInputElement;
            this.text = target.value;
        }
    }

    addTodo(): void {
        this.todolistService.addTodo(this.text);
        this.text = '';
    }
}