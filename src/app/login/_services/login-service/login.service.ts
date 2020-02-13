import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DB } from 'src/app/shared/_consts/indexeddb.const';
import { LoginModel } from '../../_models/login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private toastr: ToastrService,
    private router: Router
  ) { }

  login(user: LoginModel) {
    if (!window.indexedDB) {
      console.log(`Your browser doesn't support a stable version of IndexedDB.`);
    }

    const request = indexedDB.open(DB.NAME);

    request.onsuccess = () => {
      const db = request.result;
      const tx = db.transaction(DB.OBJECT_STORE, 'readwrite');
      const store = tx.objectStore(DB.OBJECT_STORE);
      const loginRequest = store.get(user.login);

      loginRequest.onsuccess = () => {
        if (loginRequest.result === undefined) {
          this.toastr.error(`Please check your login`, `User not exist`);
          return;
        }
        if (user.password === loginRequest.result.password) {
          this.router.navigateByUrl('my-account');
          localStorage.setItem('user', user.login);
          loginRequest.result.isLogged = true;
          store.put(loginRequest.result);
        } else {
          this.toastr.warning(`Please check your password`, `Password is incorrect`);
        }
      };
    };
  }
}
