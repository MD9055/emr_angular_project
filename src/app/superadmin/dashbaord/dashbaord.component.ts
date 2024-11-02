import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-dashbaord',
  templateUrl: './dashbaord.component.html',
  styleUrls: ['./dashbaord.component.scss']
})
export class DashbaordComponent implements OnInit {
  token: string | null;
  currentUserInfo: any;
  dailyQuote: string | null = null; // To hold the daily quote
  patientCounts: any;



  constructor(
    private authService: AuthService,
    private commonService: CommonService
  ) {
    this.token = this.authService.getToken();
  }

  ngOnInit(): void {
    this.fetchCurrentUserDetails(this.token);
    this.dailyQuote = this.getDailyQuote(); // Get daily quote on initialization
    this.patientsCountsInfo()
  }

  fetchCurrentUserDetails(token: any) {
    if (token) {
      let decodedToken = this.commonService.decodeToken(token);
      if (decodedToken) {
        this.commonService.get(`common/getById?_id=${decodedToken.userId}`).subscribe((response: any) => {
          if (response.statusCode === 200) {
            this.currentUserInfo = response?.data;
            console.log(this.currentUserInfo);
          }
        });
      }
    }
  }


   getDailyQuote(): any {
  return this.commonService.getDailyQuote()
  }

  greetMsg() {
    return this.commonService.getGreeting();
  }

  patientsCountsInfo() {
    this.commonService.post(`superadmin/newAndTotalPatients`, {}).subscribe(
        (responseInfo: any) => {
            if (responseInfo.statusCode === 200) {
                this.patientCounts = responseInfo.data;
            } else {
                console.error('Error:', responseInfo.message || 'An error occurred while retrieving patient counts.');
            }
        },
        (error) => {
            console.error('Request failed with error:', error.message || 'An unexpected error occurred.');
        }
    );
}

}
