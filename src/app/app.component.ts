import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { DetailComponent } from './detail/detail.component';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [ CommonModule, HomeComponent, DetailComponent, RouterModule],
  standalone: true,
})
export class AppComponent {
  title = 'UdemyClonSimpleApp';
}
