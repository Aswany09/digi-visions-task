import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    RouterModule,

  ],
  exports:[
    ToolbarComponent
  ]
})
export class LayoutModule { }
