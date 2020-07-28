import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import * as firebase from 'firebase';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.page.html',
  styleUrls: ['./todos.page.scss'],
})
export class TodosPage implements OnInit {

  userId: string;
  todos: any[] = [];

  constructor(private nav: NavController, private toast: ToastController) {
    this.userId = firebase.auth().currentUser.uid;
    this.getTodos();
  }

  ngOnInit() {
  }

  getTodos() {
    firebase.firestore().collection('todos')
      .where('owner', '==', this.userId)
      .where('status', '==', 'incomplete')
      .onSnapshot((query) => {
        this.todos = query.docs;
      });
  }

  getDate(timestamp: firebase.firestore.Timestamp) {
    let date = timestamp.toDate();
    return date.toLocaleDateString();
  }

  goToAddTodo() {
    this.nav.navigateForward(['/add-todo']);
  }

  markCompleted(doc: firebase.firestore.QueryDocumentSnapshot) {
    firebase.firestore().collection('todos').doc(doc.id).set({
      status: 'completed'
    }, {
      merge: true
    }).then(() => {
      this.toast.create({
        message: 'Todo item marked as complete',
        duration: 2000
      }).then((toast) => {
        toast.present();
      });
    });
  }

  logout() {
    firebase.auth().signOut().then(() => {
      this.nav.navigateRoot('/login');
    }).catch((err) => {
      console.log(err);
      this.toast.create({
        message: err.message,
        duration: 3000
      }).then((toast) => {
        toast.present();
      });
    });
  }

}
