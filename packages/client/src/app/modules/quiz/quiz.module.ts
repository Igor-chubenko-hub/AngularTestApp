import { NgModule,  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirstPartComponent } from './first-part/first-part.component';
import {HomepageRoutingModule} from './quiz-routing.module';
import {CoreModule} from '../../core/core.module';
import {SecondPartComponent} from './second-part/second-part.component';


@NgModule({
  declarations: [
    FirstPartComponent,
    SecondPartComponent
  ],
  imports: [HomepageRoutingModule, CoreModule, CommonModule],
  bootstrap: [FirstPartComponent]
})
export class QuizModule {}
