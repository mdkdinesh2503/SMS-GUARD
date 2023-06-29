import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';

export interface IDeactivateComponent {
  canExit:()=> boolean;
}

export class DeactivateGuard implements CanDeactivate<unknown> {
  canDeactivate(
    component: IDeactivateComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): boolean {
    return component.canExit?component.canExit():false;
  }

}
