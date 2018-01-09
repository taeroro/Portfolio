import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  logoPath = '../assets/portfolio_1.png';

  ngOnInit() {
    window.addEventListener('scroll', this.scroll, true);
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scroll, true);
  }

  // handle scroll event
  scroll = (): void => {
    var logo = document.querySelector(".logoImg");
    // when scrolled pass first container
    if (window.scrollY >= window.innerHeight - 100) {
      if (logo.className == "logoImg") logo.className += " changeFilter";
    }
    // when scrolled back to first container
    else if (window.scrollY < window.innerHeight - 100) {
      if (logo.className == "logoImg changeFilter") logo.className = "logoImg";
    }
  };
}
