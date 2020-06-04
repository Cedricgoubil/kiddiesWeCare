import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserDto } from '../dto/UserDto';
import { ChildDto } from '../dto/ChildDto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: Observable<UserDto>;
  users: Observable<UserDto[]>;
  usersCollection: AngularFirestoreCollection<UserDto>;
  userDoc: AngularFirestoreDocument<UserDto>;

  childUser: Observable<ChildDto>;
  childUsers: Observable<ChildDto[]>;
  childCollection: AngularFirestoreCollection<ChildDto>;
  childDoc: AngularFirestoreDocument<ChildDto>;

  constructor(private afs: AngularFirestore) {
    this.usersCollection = this.afs.collection('users', ref => ref.orderBy('lastName', 'asc'));
    this.childCollection = this.afs.collection('childs', ref => ref.orderBy('name', 'asc'));
  }

  getUsers(): Observable<UserDto[]> {
    this.usersCollection = this.afs.collection('users', ref => ref.orderBy('lastName', 'asc'));
    this.users = this.usersCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as UserDto;
        data.id = action.payload.doc.id;
        return data;
      });
    }));
    return this.users;
  }

  getUser(id: string): Observable<UserDto> {
    this.userDoc = this.afs.doc<UserDto>(`users/${id}`);
    this.user = this.userDoc.snapshotChanges().pipe(map(action => {
      if (action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as UserDto;
        data.id = action.payload.id;
        return data;
      }
    }));
    return this.user;
  }

  getChilds(id: string): Observable<ChildDto[]> {
    this.childCollection = this.afs.collection('users').doc(`${id}`).collection('childs', ref => ref.orderBy('age', 'asc'));
    this.childUsers = this.childCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as ChildDto;
        data.id = action.payload.doc.id;
        return data;
      });
    }));
    return this.childUsers;
  }

  newUser(user: UserDto) {
    this.usersCollection.add(user);
  }

  newChild(childUser: ChildDto) {
    this.childCollection.add(childUser);
  }

  updateUser(user: UserDto) {
    this.userDoc = this.afs.doc(`users/${user.id}`);
    this.userDoc.update(user);
  }

  deleteUser(user: UserDto) {
    this.userDoc = this.afs.doc(`users/${user.id}`);
    this.userDoc.delete();
  }
}

  // .collection('childs', ref => ref.where('name', '==', true));



