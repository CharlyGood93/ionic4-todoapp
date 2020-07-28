import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.page.html',
  styleUrls: ['./add-todo.page.scss'],
})
export class AddTodoPage implements OnInit {

  todoTitle: string;
  todoDesc: string;
  todoLastDate: Date;
  todoOwner: string;

  constructor(private toast: ToastController, private nav: NavController) {
    this.todoOwner = firebase.auth().currentUser.uid;
  }

  ngOnInit() {
  }

  addTodo() {
    firebase.firestore().collection('todos').add({
      title: this.todoTitle,
      description: this.todoDesc,
      lastDate: new Date(this.todoLastDate),
      owner: this.todoOwner,
      status: 'incomplete',
      created: firebase.firestore.FieldValue.serverTimestamp()
    }).then((docRef) => {
      this.toast.create({
        message: 'ToDo has been added!',
        duration: 2000
      }).then((toast) => {
        toast.present();
        this.nav.pop();
      });
    }).catch((err) => {
      this.toast.create({
        message: err.message,
        duration: 2000
      }).then((toast) => {
        toast.present();
      });
    });
  }

}
