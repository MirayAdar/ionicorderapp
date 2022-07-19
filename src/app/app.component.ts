import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GidService } from './services/gid.service';
import { HttpService } from './services/http.service';
import { LocalStorageService } from './services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {
  }
}
