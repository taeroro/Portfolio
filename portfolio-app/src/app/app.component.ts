import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  logoPath = '../assets/portfolio_1.png';
  imgPath1 = '../assets/portfolio-meetzam.jpg';
  imgPath2 = '../assets/portfolio-Triplan.jpg';

  ngOnInit() {
    window.addEventListener('scroll', this.scroll, true);
    this.showDivs(this.slideIndex); // init the slideroom
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scroll, true);
  }

  // handle scroll event
  scroll = (): void => {
    var logo = document.querySelector(".logoImg");
    // when scrolled pass 1 container
    if (window.scrollY >= window.innerHeight - 100) {
      if (logo.className == "logoImg") logo.className += " changeFilter";
    }
    // when scrolled back to 1 container
    else if (window.scrollY < window.innerHeight - 100) {
      if (logo.className == "logoImg changeFilter") logo.className = "logoImg";
    }
  };

  // menu animation
  menuFunction() {
    document.querySelector(".menuClosed").classList.toggle("menuPanel");
    document.querySelector(".menuButton").classList.toggle("change");
  }

  // for the slideroom
  slideIndex: number = 1;

  changeSlides(n: number) {
    this.showDivs(this.slideIndex += n);
  }

  showDivs(n: number) {
    // switch img
    var x = document.getElementsByClassName("showroomSlides") as HTMLCollectionOf<HTMLElement>;
    if (n > x.length) this.slideIndex = 1;
    if (n < 1) this.slideIndex = x.length;
    for (var i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    x[this.slideIndex - 1].style.display = "block";
    // switch name
    var currentIndex: number = this.slideIndex - 1;
    var ptag = document.getElementById("projectName");
    console.log(currentIndex);
    switch(currentIndex) {
      case 0:
        ptag.innerHTML = "meetzam";
        break;
      case 1:
        ptag.innerHTML = "Tr!plan";
        break;
    }
  }
}
