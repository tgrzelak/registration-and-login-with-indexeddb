import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DB } from './../../../shared/_consts/indexeddb.const';
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
      if (db.objectStoreNames.length === 0) {
        this.toastr.warning(`Please create account`, `No user exist`);
        indexedDB.deleteDatabase(DB.NAME);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        const tx = db.transaction(DB.OBJECT_STORE, 'readwrite');
        const store = tx.objectStore(DB.OBJECT_STORE);
        const emailRequest = store.get(user.email);

        emailRequest.onsuccess = () => {
          if (emailRequest.result === undefined) {
            this.toastr.error(`Please check your email`, `User not exist`);
            return;
          }
          if (user.password === emailRequest.result.password) {
            this.router.navigateByUrl('my-account');
            localStorage.setItem('user', user.email);
            emailRequest.result.isLogged = true;
            store.put(emailRequest.result);
          } else {
            this.toastr.warning(`Please check your password`, `Password is incorrect`);
          }
        };
      }

    };
  }
}
