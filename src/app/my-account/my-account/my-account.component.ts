import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DB } from 'src/app/shared/_consts/indexeddb.const';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {
  userName: string;
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.userName = localStorage.getItem('user');
  }

  logout() {
    this.router.navigateByUrl('/login');

    if (!window.indexedDB) {
      console.log(`Your browser doesn't support a stable version of IndexedDB.`);
    }

    const request = indexedDB.open(DB.NAME);

    request.onsuccess = () => {
      const db = request.result;
      const tx = db.transaction(DB.OBJECT_STORE, 'readwrite');
      const store = tx.objectStore(DB.OBJECT_STORE);
      const logoutRequest = store.get(this.userName);

      logoutRequest.onsuccess = () => {
        logoutRequest.result.isLogged = false;
        store.put(logoutRequest.result);
      };
    };
    localStorage.removeItem('user');
  }

}
