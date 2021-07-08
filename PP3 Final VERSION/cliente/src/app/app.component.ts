import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MessageService]
})
export class AppComponent implements OnInit {
  title = 'cliente';

  constructor(private primengConfig: PrimeNGConfig, private messageService: MessageService) {}

  ngOnInit() {
      this.primengConfig.ripple = true;
  }
}
