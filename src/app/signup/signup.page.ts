import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  email: string;
  password: string;

  constructor(private toast: ToastController, private nav: NavController) { }

  ngOnInit() {
  }

  signup() {
    firebase.auth()
    .createUserWithEmailAndPassword(this.email, this.password)
    .then((userData) => {
      console.log(userData);
      // Navigate the user to the app page
      this.nav.navigateForward(['/todos']);
    })
    .catch((err) => {
      this.toast.create({
        message: err.message,
        duration: 3000
      }).then((toast) => {
        toast.present();
      });
    });
  }

  goToLogin() {
    this.nav.pop();
  }

}
