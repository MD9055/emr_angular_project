import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../shared-module/layout/layout.component';
import { NotelistComponent } from './notelist/notelist.component';



const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path:'notelist', component:NotelistComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoteRoutingModule { }
