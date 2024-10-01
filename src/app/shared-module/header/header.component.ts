import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  decodedToken: any;

  constructor(private authService:AuthService, private commonService:CommonService){

  }

  ngOnInit() {
    this.getTokenMethod().then((token)=>{
     this.decodedToken =  this.commonService.decodeToken(token)
     
    })
  }

  getTokenMethod() {
    return new Promise((resolve, reject) => {
      const token = this.authService.getToken();
      if (token) {
        resolve(token);
      } else {
        reject('No token found'); 
      }
    });
  }

  getRoleName(role:any){
    return this.commonService.getRoleName(role)
  }

  capitalizeFirstLetter(name: string){
  return   this.commonService.capitalizeFirstLetter(name)
  }
  

}
