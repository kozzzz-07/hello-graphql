import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Resolve,
  Router,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ChatResolver implements Resolve<unknown> {
  constructor(private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Promise<boolean> | void {
    const navigation = this.router.getCurrentNavigation();
    const hasNameProperty = navigation?.extras?.state?.hasOwnProperty('name');

    if (!hasNameProperty) {
      this.router.navigateByUrl('/');
    }
  }
}
