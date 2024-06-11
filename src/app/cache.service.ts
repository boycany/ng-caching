import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  // cache = new Map<string, any>();
  cache: any = {};

  set(key: string, value: any) {
    this.cache[key] = value;
    localStorage.setItem('cache', JSON.stringify(this.cache));
  }

  get(key: string) {
    console.log('key :>> ', key);
    if (this.cache[key]) {
      console.log('from this.cache');
      console.log('this.cache[key] :>> ', this.cache[key]);
      return this.cache[key];
    }

    const cache = localStorage.getItem('cache');

    if (cache) {
      console.log('from localStorage');
      this.cache = JSON.parse(cache);
      return this.cache[key];
    }
  }

  // set(key: string, data: any) {
  //   this.cache[key] = data;
  //   localStorage.setItem(key, JSON.stringify(data));
  // }

  // get(key: string) {
  //   return this.cache[key] || JSON.parse(localStorage.getItem(key) ?? '');
  // }

  // get(url: string, params: any = {}, body: any = {}): Observable<any> | null {
  //   const key = this.generateCacheKey(url, params, body);
  //   return this.cache.has(key) ? of(this.cache.get(key)) : null;
  // }

  // set(url: string, params: any = {}, body: any = {}, value: any): void {
  //   const key = this.generateCacheKey(url, params, body);
  //   this.cache.set(key, value);
  // }

  // private generateCacheKey(url: string, params: any, body: any): string {
  //   return `${url}|${JSON.stringify(params)}|${JSON.stringify(body)}`;
  // }
}
