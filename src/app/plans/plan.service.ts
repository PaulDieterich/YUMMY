import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  // Ruft Zeitpläne aus der API ab und persistiert diese auf 3 Ebenen:
  // - Ebenen 1: Online (keine Persistenz)
  // - Ebenen 2: Cache (Persistiert in SessionStorage)
  // - Ebenen 3: Favoriten (Persistiert in LocalStorage)

  constructor() { }
}
