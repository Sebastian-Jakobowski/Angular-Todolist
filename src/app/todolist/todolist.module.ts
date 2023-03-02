import { CommonModule } from "@angular/common";
import { Component, NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DragDropModule } from '@angular/cdk/drag-drop'; 
import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent } from "./components/header/header.component";
import { MainComponent } from "./components/main/main.component";
import { TodoComponent } from "./components/todo/todo.component";
import { TodolistComponent } from "./components/todolist/todolist.component";
import { TodolistService } from "./services/todolist.service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button'; 
import {MatInputModule} from '@angular/material/input'; 
import {MatCheckboxModule} from '@angular/material/checkbox'; 
import { FormsModule } from '@angular/forms';
import {MatButtonToggleModule} from '@angular/material/button-toggle'; 
import {MatDividerModule} from '@angular/material/divider'; 
import {MatListModule} from '@angular/material/list'; 
import {MatIconModule} from '@angular/material/icon'; 

const routes: Routes = [
    {
        path: '',
        component: TodolistComponent
    },
]

@NgModule({
    declarations: [
        TodolistComponent, HeaderComponent, MainComponent, TodoComponent, FooterComponent
    ],
    imports: [CommonModule, RouterModule.forChild(routes), BrowserAnimationsModule,
        DragDropModule, MatButtonModule, MatInputModule, MatCheckboxModule, FormsModule, MatButtonToggleModule, MatDividerModule, MatListModule, MatIconModule ],
    providers: [TodolistService],
})
export class TodolistModule {}