import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';

@NgModule({
  declarations: [NavBarComponent, PageHeaderComponent],
  imports: [
    CommonModule
  ],
  exports: [NavBarComponent, PageHeaderComponent]
})
export class SharedModule { }
