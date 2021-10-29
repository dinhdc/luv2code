import { Component, OnInit } from '@angular/core';
import myAppConfig from "../../config/my-app-config";
import {OktaAuthStateService} from "@okta/okta-angular";
// @ts-ignore
import * as OktaSignIn from "@okta/okta-signin-widget";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  oktaSignin: any;

  constructor(private oktaAuthService: OktaAuthStateService) {
    this.oktaSignin = new OktaSignIn(
      logo: 'assets/images/logo.png',
    )
  }

  ngOnInit(): void {
  }

}
