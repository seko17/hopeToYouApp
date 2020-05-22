import { Component, OnInit, ViewChild } from "@angular/core";
import { NavigationExtras } from "@angular/router";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { AuthServiceService } from "src/app/Services/auth-service.service";
import {
  NavController,
  LoadingController,
  AlertController,
  IonSlides,
} from "@ionic/angular";

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"],
})
// tslint:disable-next-line: component-class-suffix
export class RegisterPage implements OnInit {
  @ViewChild("slides", { static: true }) slides: IonSlides;
  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthServiceService,
    private navCtrl: NavController,
    public loadingController: LoadingController,
    private alertCtrl: AlertController
  ) {}
  registerForm: FormGroup;
  public loading: any;
  validation_messages = {
    email: [
      { type: "required", message: "Email is required." },
      {
        type: "minlength",
        message: "Email must be at least 4 characters long.",
      },
      {
        type: "maxlength",
        message: "Email cannot be more than 25 characters long.",
      },
    ],
    password: [
      { type: "required", message: "Password is required." },
      {
        type: "minlength",
        message: "Password must be at least 5 characters long.",
      },
      {
        type: "maxlength",
        message: "Password cannot be more than 25 characters long.",
      },
    ],
  };

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"),
        ])
      ),
      pwd: new FormControl("", Validators.required),
    });
  }
  // manageProfile()
  async createUser(v) {
    this.auth.creatUser(v.value.email, v.value.pwd).then(
      () => {
        this.loading.dismiss().then(() => {
          this.manageProfile();
        });
      },
      (error) => {
        this.loading.dismiss().then(async () => {
          const alert = await this.alertCtrl.create({
            message: error.message,
            buttons: [{ text: "Ok", role: "cancel" }],
          });
          await alert.present();
        });
      }
    );
    this.loading = await this.loadingController.create();
    await this.loading.present();
  }
  login() {
    this.navCtrl.navigateBack("login");
  }
  manageProfile() {
    // required
    const navExtra: NavigationExtras = {
      state: {
        isEditing: false,
      },
    };
    this.navCtrl.navigateRoot("manage-profile", navExtra);
  }
}
