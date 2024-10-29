import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoteRoutingModule } from './note-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotelistComponent } from './notelist/notelist.component';


@NgModule({
  declarations: [
    NotelistComponent
  ],
  imports: [
    CommonModule,
    NoteRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class NoteModule { }
