import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Component({
  selector: 'nb-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.sass' ],
})
export class AppComponent {
  title = 'notebook';

  constructor(private http: HttpClient) {
    this.http.get(`${environment.backendHost}/api`).subscribe(console.log);
  }
}
