import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, NgOptimizedImage],
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent {

}
