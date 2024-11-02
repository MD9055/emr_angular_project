import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  staffForm: any;
  submitted = false;
  status: string = 'Add'; 
  decodedToken: any;

  constructor(
    private formBuilder: FormBuilder, 
    private commonService: CommonService, 
    private authService: AuthService,
    private router:Router
  ) {
    this.staffForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]*$')]]
    });
  }
  ngOnInit(): void {
    this.getTokenMethod().then((token) => {
      this.decodedToken = this.commonService.decodeToken(token);
      if (this.decodedToken) {
        this.fetchCurrentUser(this.decodedToken.userId);
      }
    });
  }
  onSubmit(): void {
    this.submitted = true;
    if (this.staffForm.invalid) {
        return;
    }
    console.log('Form Submitted', this.staffForm.value);
    this.updateUser(); 
    this.fetchCurrentUser(this.decodedToken.userId)
}

  onCancel(): void {
    this.staffForm.reset();
    this.submitted = false;
    this.navigateByRole()
  }
  fetchCurrentUser(_id: any) {
    this.commonService.get(`common/getById?_id=${_id}`).subscribe((response: any) => {
      if (response.statusCode === 200) {
        this.staffForm.patchValue({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          phone: response.data.phone
        });
      } else {
        console.error('Error fetching user data');
      }
    });
  }

  updateUser() {
    if (this.staffForm.invalid) {
        console.error('Form is invalid, cannot update user.');
        return; // Prevent the update if the form is invalid
    }

    const updatedData = {
        firstName: this.staffForm.get('firstName')?.value,
        lastName: this.staffForm.get('lastName')?.value,
        phone: this.staffForm.get('phone')?.value,
    };

    this.commonService.put(`common/updateByID`, { _id: this.decodedToken.userId, updateData: updatedData }).subscribe(
        (response: any) => {
            if (response.statusCode === 200) {
                console.log('User updated successfully:', response.data);
                // Optionally reset the form or navigate
                this.staffForm.reset();
                this.submitted = false;
            } else {
                console.error('Error:', response.message || 'An error occurred during the update.');
            }
        },
        (error) => {
            console.error('Request failed with error:', error.message || 'An unexpected error occurred.');
        }
    );
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

  navigateByRole(): void {
    if (this.decodedToken) {
      switch (this.decodedToken.role) {
        case 0:
          this.router.navigateByUrl('superadmin/dashboard');
          break;
        case 1:
          this.router.navigateByUrl('admin/dashboard');
          break;
        case 2:
          this.router.navigateByUrl('physician/dashboard');
          break;
        case 5:
          this.router.navigateByUrl('patient/dashboard');
          break;
        case 7:
          this.router.navigateByUrl('staff/dashboard');
          break;
        default:
          this.router.navigateByUrl('/'); // Fallback route
          break;
      }
    }
  }
}
