import { HttpClient, HttpParams } from '@angular/common/http';
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

  getData(url: string, params: any = {}): Observable<any> {
    const cacheResponse = this.cacheService.get(url, params);

    if (cacheResponse) {
      return cacheResponse;
    } else {
      const httpParams = new HttpParams({ fromObject: params });

      return this.http
        .get(url, { params: httpParams })
        .pipe(
          tap((response) => this.cacheService.set(url, params, {}, response))
        );
    }
  }

  postData(url: string, body: any): Observable<any> {
    const cacheResponse = this.cacheService.get(url, {}, body);

    if (cacheResponse) {
      return cacheResponse;
    } else {
      return this.http
        .post(url, body)
        .pipe(
          tap((response) => this.cacheService.set(url, {}, body, response))
        );
    }
  }
}
