import {NgModule} from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatButtonModule} from '@angular/material/button';

const materialModules = [
  MatTabsModule,
  MatSlideToggleModule,
  MatButtonModule
];

@NgModule({
  imports: materialModules,
  exports: materialModules,
})
export class MaterialModule {
}
