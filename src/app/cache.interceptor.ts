import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { of, tap } from 'rxjs';
import { CacheService } from './cache.service';
import { inject } from '@angular/core';

export const cacheInterceptor: HttpInterceptorFn = (req, next) => {
  const cacheService = inject(CacheService);

  if (req.method !== 'GET') {
    return next(req);
  }

  const cachedResponse = cacheService.get(req.urlWithParams);
  console.log('cachedResponse :>> ', cachedResponse);
  if (cachedResponse) {
    return of(new HttpResponse(cachedResponse)).pipe(tap(console.log));
  }

  return next(req).pipe(
    tap((event) => {
      if (event instanceof HttpResponse) {
        console.log('event :>> ', event);
        cacheService.set(req.urlWithParams, event);
      }
    })
  );
};
