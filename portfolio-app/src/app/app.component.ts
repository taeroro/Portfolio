import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  logoPath = '../assets/img/portfolio_1.png';
  imgPath1 = '../assets/img/portfolio-meetzam.jpg';
  imgPath2 = '../assets/img/portfolio-Triplan.jpg';
  backgroundImgPath = "../assets/img/chris-holgersson-249309.jpg";
  defaultImage = '../assets/img/91.svg';

  public scrollAndSearch$: Observable<any>;
  private updateImage$;

  ngOnInit() {
    window.addEventListener('scroll', this.scroll, true);
    this.showDivs(this.slideIndex); // init the slideroom
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scroll, true);
  }

  constructor() {
    this.updateImage$ = new Subject();
    this.scrollAndSearch$ = Observable.merge(
      Observable.fromEvent(window, 'scroll'),
      this.updateImage$
    );
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
    this.updateImage$.next();
    // switch name
    var currentIndex: number = this.slideIndex - 1;
    var ptag = document.getElementById("projectName");
    switch(currentIndex) {
      case 0:
        ptag.innerHTML = "meetzam";
        document.getElementById("meetzamDetails").style.visibility = "visible";
        document.getElementById("triplanDetails").style.visibility = "hidden";
        break;
      case 1:
        ptag.innerHTML = "Tr!plan";
        document.getElementById("triplanDetails").style.visibility = "visible";
        document.getElementById("meetzamDetails").style.visibility = "hidden";
        break;
    }
  }

  detailOpened: boolean = false;

  openProjectDetail() {
    var indicator = document.getElementsByClassName("showroomIndicator") as HTMLCollectionOf<HTMLElement>;
    var s2 = document.getElementsByClassName("showroomSlides") as HTMLCollectionOf<HTMLElement>;
    // detect if the detail is opened or closed
    if (this.detailOpened == false) {
      indicator[0].style.visibility = "hidden";
      s2[this.slideIndex - 1].style.height = "65vh";
      this.detailOpened = true;
    }
    else {
      indicator[0].style.visibility = "visible";
      s2[this.slideIndex - 1].style.height = "100vh";
      this.detailOpened = false;
    }
    s2[this.slideIndex - 1].classList.toggle("makeitblur");
  }

  loadingComplete() {
    var s2 = document.getElementsByClassName("showroomSlides") as HTMLCollectionOf<HTMLElement>;
    s2[this.slideIndex - 1].classList.toggle("slidesLoaded");
  }

  backgroundLoadingComplete() {
    var s1 = document.getElementById("section1");
    s1.style.backgroundSize = "cover";
    s1.style.backgroundPosition = "20% 20%";
    var s1ptag = document.getElementsByClassName("section1Text") as HTMLCollectionOf<HTMLElement>;
    for (var i = 0; i < s1ptag.length; i++) {
      s1ptag[i].style.visibility = "visible";
    }
  }
}
