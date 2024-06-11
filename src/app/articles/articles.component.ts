import { Component, inject } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.css',
})
export class ArticlesComponent {
  articles: any[] = [];

  private dataService = inject(DataService);

  constructor() {
    this.loadArticles();
  }

  loadArticles() {
    this.dataService
      .getData('https://jsonplaceholder.typicode.com/posts')
      .subscribe((data) => {
        this.articles = data;
      });
  }
}
