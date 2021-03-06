import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegistrationModel } from '../../_models/registration.model';
import { LOGIN_ROUTE } from './../../../login/_consts/login-routes.const';
import { DB } from './../../../shared/_consts/indexeddb.const';
import { REGISTRATION_FORM } from './../../../shared/_consts/registration-form.enum';

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
      const store = db.createObjectStore(DB.OBJECT_STORE, { keyPath: REGISTRATION_FORM.email });
      store.createIndex(REGISTRATION_FORM.firstName, REGISTRATION_FORM.firstName);
      store.createIndex(REGISTRATION_FORM.lastName, REGISTRATION_FORM.lastName);
      store.createIndex(REGISTRATION_FORM.password, REGISTRATION_FORM.password);
      store.createIndex(REGISTRATION_FORM.isLogged, REGISTRATION_FORM.isLogged);
    };

    request.onsuccess = () => {
      const db = request.result;
      const tx = db.transaction(DB.OBJECT_STORE, 'readwrite');
      const store = tx.objectStore(DB.OBJECT_STORE);
      const email = store.get(user.email);

      email.onsuccess = () => {
        if (email.result !== undefined) {
          this.toastr.warning(`Email "${user.email}" already taken. Please choose another email`);
        } else {
          store.put(user);
          this.toastr.success(`User "${user.email}" was created. Now you can login`, `CREATED NEW USER!`);
          this.router.navigateByUrl(`/${LOGIN_ROUTE}`);
        }
      };
      db.close();
    };
  }
}
