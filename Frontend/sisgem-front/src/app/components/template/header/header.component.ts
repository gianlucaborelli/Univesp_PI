import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay, filter } from 'rxjs/operators';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';;
import { AuthService } from 'src/app/service/auth/auth.service';

@UntilDestroy()
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  constructor(public authService: AuthService, private observer: BreakpointObserver, private router: Router, private route: ActivatedRoute, ) { }

  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1), untilDestroyed(this))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });

    this.router.events
      .pipe(
        untilDestroyed(this),
        filter((e) => e instanceof NavigationEnd)
      )
      .subscribe(() => {
        if (this.sidenav.mode === 'over') {
          this.sidenav.close();
        }
      });
  }

  orcamento(){
    this.router.navigate(['orcamentos'], {relativeTo:this.route});
  }

  cliente(){
    this.router.navigate(['clientes'], {relativeTo:this.route});
  }

  produto(){
    this.router.navigate(['produtos'], {relativeTo:this.route});
  }
}
