import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search-movie',
  templateUrl: './search-movie.component.html',
  styleUrls: ['./search-movie.component.css']
})
export class SearchMovieComponent {
  constructor(private userService:UserService,public loginService:LoginService,private router:Router){}
  public movieName="";
  movies : {
    position: number,
    movieName: string,
    theaterName: string,
    ticketStatus: string,
    }[] = [];
  ngOnInit() : void {}
  search(){
    this.movies = [];
    if(this.movieName == ''|| this.movieName == undefined)
    Swal.fire('',"Enter Movie Name",'info');
    else{
      console.log("Movie "+this.movieName+" is Searched");
    this.userService.serachMovie(this.movieName).subscribe(
      (data:any) =>{
        let count = data.length;
        let i=1
        while(i <= count){
          this.movies.push({
            position: i, movieName: data[i-1].movieName, theaterName: data[i-1].theatreName, ticketStatus: data[i-1].ticketsStatus
          });
          i++;
        }
        console.log("from search-movies Componenet"+this.movies);
      },
      (error)=>{
        Swal.fire('',"Movie Not Found",'info');
        console.log("from search-movies Componenet :"+error);
      }
    );
    }
    console.log("Searching Movie");
  }
  onClickBuyTicket(movieToBook:any){
    console.log("Buying Ticket");
    let flag = false;
    this.movies.forEach(function (movie){
      if(movieToBook == movie.movieName && movie.ticketStatus == "SOLD OUT"){
        flag = true;
        Swal.fire('Cannot Book','This Movie is Sold Out','info');
      }
    })
    if(!flag){
      localStorage.setItem('movieToBook',movieToBook);
      this.router.navigate(['/moviebooking/add'])
      // window.location.href('/moviebooking/add');
    }
  }
}
