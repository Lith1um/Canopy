// Angular
import { Injectable } from '@angular/core';

// rxjs
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class DialogSizeStateService {

  maximised$: Observable<boolean>;

  private maximisedSubject = new BehaviorSubject<boolean>(false);

  constructor() {
    this.maximised$ = this.maximisedSubject.asObservable();
  }

  setMaximised(maximised: boolean): void {
    this.maximisedSubject.next(maximised);
  }

}
