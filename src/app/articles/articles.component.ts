import { Component, inject } from '@angular/core';
import { DataService } from '../data.service';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.css',
})
export class ArticlesComponent {
  articles: any[] = [];
  offset = 0;
  limit = 10;

  // private dataService = inject(DataService);
  private http = inject(HttpClient);

  constructor() {
    this.loadArticles();
  }

  loadArticles() {
    const httpParams = new HttpParams({
      fromObject: {
        offset: this.offset,
        limit: this.limit,
      },
    });

    this.http
      .get('https://jsonplaceholder.typicode.com/posts', { params: httpParams })
      .subscribe((data: any) => {
        this.articles = data;
      });
    // this.dataService
    //   .getData('https://jsonplaceholder.typicode.com/posts', {
    //     offset: this.offset,
    //     limit: this.limit,
    //   })
    //   .subscribe((data) => {
    //     this.articles = data;
    //   });
  }
}
