import { HttpEvent, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { of, tap } from 'rxjs';

const cache = new Map<string, any>();
export const cachingInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.method !== 'GET') return next(req);
  const cachedResponse = cache.get(req.url);
  return cachedResponse ? of(cachedResponse) : next(req).pipe(tap((res: any) => cache.set(req.url, res)));
};
