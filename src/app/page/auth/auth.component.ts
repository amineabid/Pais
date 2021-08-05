import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatProgressBar } from '@angular/material/progress-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppLoaderService } from 'src/app/share/component/app-loader/app-loader.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatProgressBar) progressBar: MatProgressBar;
  @ViewChild(MatButton) submitButton: MatButton;

  signinForm: FormGroup;
  errorMsg = '';
  return: string;

  private _unsubscribeAll: Subject<any>;

  constructor(
    private sophiaLoader: AppLoaderService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.signinForm = new FormGroup({
      username: new FormControl('admin@admin.com', Validators.required),
      password: new FormControl('12345678', Validators.required),
      rememberMe: new FormControl(true)
    });

    this.route.queryParams
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(params => this.return = params['return'] || '/');
  }

  ngAfterViewInit() {
    // setTimeout(() => {
      this.autoSignIn();
    // })
  }

  ngOnDestroy() {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  signin() {
    const signinData = this.signinForm.value

    this.submitButton.disabled = true;
    this.progressBar.mode = 'indeterminate';
    console.log('sign');
    
    
  }

  autoSignIn() {    
    // if(this.return === '/') {
    //   return
    // }
    this.sophiaLoader.open(`Automatically Signing you in! \n Return url: ${this.return.substring(0, 20)}...`, {width: '320px'});
    setTimeout(() => {
      // this.signin();
      console.log('autoSignIn');
      this.sophiaLoader.close()
    }, 2000);
  }
}
