import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RegistrationModel } from '../../_models/registration.model';
import { DB } from 'src/app/shared/_consts/indexeddb.const';
import { REGISTRATION_FORM } from 'src/app/shared/_consts/registration-form.enum';
import { Router } from '@angular/router';
import { LOGIN_ROUTE } from 'src/app/login/_consts/login-routes.const';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(
    private toastr: ToastrService,
    private router: Router
  ) { }

  createUser(user: RegistrationModel) {
    if (!window.indexedDB) {
      console.log('Your browser doesn\'t support a stable version of IndexedDB.');
    }

    const request = indexedDB.open(DB.NAME);

    request.onupgradeneeded = () => {
      const db = request.result;
      const store = db.createObjectStore(DB.OBJECT_STORE, { keyPath: REGISTRATION_FORM.login });
      store.createIndex(REGISTRATION_FORM.firstName, REGISTRATION_FORM.firstName);
      store.createIndex(REGISTRATION_FORM.lastName, REGISTRATION_FORM.lastName);
      store.createIndex(REGISTRATION_FORM.email, REGISTRATION_FORM.email);
      store.createIndex(REGISTRATION_FORM.password, REGISTRATION_FORM.password);
      store.createIndex(REGISTRATION_FORM.isLogged, REGISTRATION_FORM.isLogged)
    };

    request.onsuccess = () => {
      const db = request.result;
      const tx = db.transaction(DB.OBJECT_STORE, 'readwrite');
      const store = tx.objectStore(DB.OBJECT_STORE);
      const loginName = store.get(user.login);

      loginName.onsuccess = () => {
        if (loginName.result !== undefined) {
          this.toastr.warning(`User with login "${user.login}" already exist. Please choose another login`);
        } else {
          store.put(user);
          this.toastr.success(`User "${user.login}" was created. Now you can login`, `CREATED NEW USER!`);
          this.router.navigateByUrl(`/${LOGIN_ROUTE}`);
        }
      };
      db.close();
    };
  }
}
