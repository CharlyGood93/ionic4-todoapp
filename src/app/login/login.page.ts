import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  password: string;

  constructor(private toast: ToastController, private nav: NavController) {
    firebase.auth()
      .onAuthStateChanged((user) => {
        if (user) {
          this.nav.navigateForward(['/todos']);
        } else {
          // No user is logged in
        }
      });
  }

  ngOnInit() {
  }

  login() {
    firebase.auth()
      .signInWithEmailAndPassword(this.email, this.password)
      .then((user) => {
        console.log(user);
        // Navigate the user to the application page
        this.nav.navigateForward(['/todos']);
      }).catch((err) => {
        this.toast.create({
          message: err.message,
          duration: 3000
        }).then((toast) => {
          toast.present();
        });
      });
  }

  goToSignup() {
    this.nav.navigateForward(['/signup']);
  }

}
