import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'clientes-app';
  curso: string = 'curso Spring y angular';
  profesor: string ='Andres Guzman';
}
