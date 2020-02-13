import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DB } from '../../_consts/indexeddb.const';
import { LOGIN_ROUTE } from './../../../login/_consts/login-routes.const';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router
  ) { }
  canActivate(): Observable<boolean> {
    return this.checkIfUserIsLoggedIn().pipe(
      tap(loggedIn => {
        if (!loggedIn) {
          this.router.navigateByUrl(`/${LOGIN_ROUTE}`);
        }
      })
    );
  }

  private checkIfUserIsLoggedIn(): Observable<boolean> {
    if (!window.indexedDB) {
      console.log(`Your browser doesn't support a stable version of IndexedDB.`);
      return of(false);
    }

    const subject: Subject<boolean> = new Subject<boolean>();

    let isLogged;
    const request = indexedDB.open(DB.NAME);
    request.onsuccess = () => {
      const userName = localStorage.getItem('user');
      if (!userName) {
        subject.next(isLogged);
        subject.complete();
        return;
      }
      const db = request.result;
      const tx = db.transaction(DB.OBJECT_STORE, 'readwrite');
      const store = tx.objectStore(DB.OBJECT_STORE);
      const logoutRequest = store.get(userName);
      logoutRequest.onsuccess = () => {
        logoutRequest.result.isLogged ? isLogged = true : isLogged = false;
        subject.next(isLogged);
        subject.complete();
      };
    };
    return subject.asObservable();
  }
}
