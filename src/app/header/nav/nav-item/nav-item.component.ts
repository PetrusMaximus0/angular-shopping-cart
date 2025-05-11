import {Component, input} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-nav-item',
  imports: [
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './nav-item.component.html',
  styleUrl: './nav-item.component.scss'
})

export class NavItemComponent {
  destination = input.required<string>();
  title = input.required<string>();
  iconName = input.required<string>();
  isFilled = input.required<boolean>();
}
