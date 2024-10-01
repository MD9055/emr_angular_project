import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.scss']
})
export class AddStaffComponent implements OnInit {
  staffForm: FormGroup;
  submitted = false;
  countryList: any[] = [];
  stateList: any[] = [];
  cityList: any[] = [];

  constructor(private formBuilder: FormBuilder, private commonService: CommonService) {
    this.staffForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      dob: ['', Validators.required],
      addressStreet1: ['', Validators.required],
      addressStreet2: ['', Validators.required],
      zipCode: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getCountry();
  }

  get f() {
    return this.staffForm.controls;
  }

  getCountry() {
    this.commonService.get('common/country').subscribe(
      (response: any) => {
        if (response.statusCode === 200) {
          this.countryList = response.data;
        } else {
          console.error(`Error: ${response.message}`);
          this.handleError(response.message);
        }
      },
      (error) => {
        console.error('HTTP Error:', error);
        this.handleError('An error occurred while fetching the country list.');
      }
    );
  }

  onCountryChange(event: Event) {
    const countryId = (event.target as HTMLSelectElement).value;
    this.loadStates(countryId);
    this.staffForm.get('state')?.setValue('');
    this.staffForm.get('city')?.setValue('');
  }

  loadStates(countryId: string) {
    this.commonService.get(`common/state?country_id=${countryId}`).subscribe(
      (response: any) => {
        if (response.statusCode === 200) {
          this.stateList = response.data;
        } else {
          console.error(`Error: ${response.message}`);
          this.handleError(response.message);
        }
      },
      (error) => {
        console.error('HTTP Error:', error);
        this.handleError('An error occurred while fetching the state list.');
      }
    );
  }

  onStateChange(event: Event) {
    const stateId = (event.target as HTMLSelectElement).value;
    this.loadCities(stateId);
    this.staffForm.get('city')?.setValue('');
  }

  loadCities(stateId: string) {
    this.commonService.get(`common/city?state_id=${stateId}`).subscribe(
      (response: any) => {
        if (response.statusCode === 200) {
          this.cityList = response.data;
        } else {
          console.error(`Error: ${response.message}`);
          this.handleError(response.message);
        }
      },
      (error) => {
        console.error('HTTP Error:', error);
        this.handleError('An error occurred while fetching the city list.');
      }
    );
  }

  handleError(message: string) {
    alert(message);
  }

  onSubmit() {
    this.submitted = true;

    if (this.staffForm.invalid) {
      return;
    }

    const formData = this.staffForm.value;

    this.commonService.post('admin/addUpdateStaff', formData).subscribe(
      (response: any) => {
        if (response.statusCode === 201) {
          alert(response.message);
          this.staffForm.reset();
          this.submitted = false;
        } else {
          this.handleError(response.message);
        }
      },
      (error) => {
        console.error('HTTP Error:', error);
        this.handleError('An error occurred while saving staff details.');
      }
    );
  }

  onCancel() {
    this.staffForm.reset();
    this.submitted = false;
  }
}
