import { Recipe } from './recipes/recipe.class';
import { User, UserAttribute } from './user.class';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { API } from './api.class';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private http: HttpClient;
	private service: ApiService<User, UserAttribute>;

  constructor(http: HttpClient) {
    this.http = http;
    this.service = new ApiService<User, UserAttribute>(http, '/users');
  }

  get(id: number): Observable<User> {
   return new Observable<User>(observer => {
      const user = new User();
      let count = 0;
      this.service.get(id).subscribe(data => {
        user.apply(data);
        if(++count === 2) {
          observer.next(user);
          observer.complete();
        }
      });
      new API<Recipe[]>(this.http).get('/users/{id}/recipes', id).subscribe(data => {
        if(data) {
          user.recipes.splice(0, user.recipes.length, ...data);
        }
        if(++count === 2) {
          observer.next(user);
          observer.complete();
        }
      });
    });
  }
  create(user: User): Observable<User> {
    return new Observable<User>(observer => {
      let count = 0;
      const  target = user.recipes.length + 1;
      this.service.create(user).subscribe(data => {
        user.recipes.forEach(recipe => {
          new API<Recipe>(this.http)
          .auth(this.service.user, this.service.password)
          .body(recipe)
          .post('/users/{id}/recipes', data.id, recipe)
          .subscribe(_ => {
            if(++count === target){
              observer.next(user);
              observer.complete();
            }
          });
        });
        user.apply(data);
        if(++count === target) {
          observer.next(user);
          observer.complete();
        }
     });
    });
  }
  delete(id: number): Observable<boolean>{
    return this.service.delete(id);
  }
}
