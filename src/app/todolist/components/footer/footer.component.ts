import { Component } from "@angular/core";
import { map, Observable } from "rxjs";
import { TodolistService } from "../../services/todolist.service";
import { FilterEnum } from "../../types/filter.enum";

@Component({
    selector: 'app-todolist-footer',
    templateUrl: './footer.component.html'
})
export class FooterComponent {
    noTodosClass$: Observable<boolean>;
    activeCount$: Observable<number>;
    itemsLeftText$: Observable<string>;
    filter$: Observable<FilterEnum>;
    filterEnum = FilterEnum;

    constructor(private todolistService: TodolistService) {
        this.activeCount$ = this.todolistService.todos$.pipe(
            map((todos => todos.filter(todo => !todo.isCompleted).length))
        );
        this.itemsLeftText$ = this.activeCount$.pipe(
            map((activeCount) => `item${activeCount !== 1 ? 's' : ''} left`)
        );
        this.noTodosClass$ = this.todolistService.todos$.pipe(
            map((todos) => todos.length === 0)
        );
        this.filter$ = this.todolistService.filter$;
    }

    changeFilter(filterName: FilterEnum):void {
        this.todolistService.changeFilter(filterName);
    }

}