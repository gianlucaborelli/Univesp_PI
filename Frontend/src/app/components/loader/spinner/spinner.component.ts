import { Component, ViewEncapsulation } from '@angular/core';
import { LoaderService } from 'src/app/components/loader/loader.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom

})
export class SpinnerComponent {
  constructor(public loader: LoaderService) { }
}
