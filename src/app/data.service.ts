import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CacheService } from './cache.service';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private http = inject(HttpClient);
  private cacheService = inject(CacheService);

  constructor() {
    console.log('this.http :>> ', this.http);
  }

  getData(url: string): Observable<any> {
    const cacheResponse = this.cacheService.get(url);

    if (cacheResponse) {
      return cacheResponse;
    } else {
      return this.http
        .get(url)
        .pipe(tap((response) => this.cacheService.set(url, response)));
    }
  }
}
