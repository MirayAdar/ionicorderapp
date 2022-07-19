import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AddressModel } from 'src/app/models/address.model';
import { CityModel } from 'src/app/models/city.model';
import { CustomerModel } from 'src/app/models/customer.model';
import { DistrictModel } from 'src/app/models/district.model';
import { NeighborhoodModel } from 'src/app/models/neigborhood.model';
import { GidService } from 'src/app/services/gid.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  signupForm = new FormGroup({
    name: new FormControl(''),
    surname: new FormControl(''),
    addressTitle: new FormControl('', [Validators.required]),
    city: new FormControl(0, [Validators.required]),
    district: new FormControl(0, [Validators.required]),
    neighborhood: new FormControl(0, [Validators.required]),
    street: new FormControl(''),
    street2: new FormControl(''),
    apartmentName: new FormControl('', [Validators.required]),
    doorNo: new FormControl('', [Validators.required]),
    floor: new FormControl('', [Validators.required]),
    inDoorNo: new FormControl('', [Validators.required]),
    addressDescription: new FormControl('', [Validators.required]),
  });

  focusedItem:boolean ;
  neighborhoodId: any;
  processType = ''; //register-Yeni Hesap Oluşturma sırasında (Ad ve Soyad görünür)
  //addaddress-Yeni adres kaydı  (Ad ve Soyad görünmez)
  //updateaddress-Adres güncelleme  (Ad ve Soyad görünmez)
  updatedAddressId = '';
  selectedCity = "";
  selectedDistrict = "";
  selectedNeighborhood = "";
  focused: boolean;
  updatedAddress: any;


  constructor(
    private route: ActivatedRoute,
    public gid: GidService,
    private router: Router,
    private httpService: HttpService
  ) {
    this.processType = route.snapshot.paramMap.get('processType');
    this.updatedAddressId = route.snapshot.paramMap.get('updatedAddressId');

    if (this.processType == 'register') {
      this.signupForm.get('name').setValidators([Validators.required]);
      this.signupForm.get('surname').setValidators([Validators.required]);
    } else if (this.processType == 'updateaddress') {
      let address = this.gid.customer.addresses.find(
        (a) => a.id == this.updatedAddressId
      );
      if (address) {
        this.signupForm.get('addressTitle').setValue(address.addressTitle);
        this.signupForm.get('city').setValue(address.city.cityId);
        this.getDistricts(address.city.cityId);
        this.signupForm.get('district').setValue(address.district.districtId);
        this.getNeigborhoods(address.district.districtId);
        this.signupForm.get('neighborhood').setValue(address.neighborhood.neighborhoodId);
        this.signupForm.get('street').setValue(address.street);
        this.signupForm.get('street2').setValue(address.street2);
        this.signupForm.get('apartmentName').setValue(address.apartmentName);
        this.signupForm.get('doorNo').setValue(address.doorNo);
        this.signupForm.get('floor').setValue(address.floor);
        this.signupForm.get('inDoorNo').setValue(address.inDoorNo);
        this.signupForm.get('addressDescription').setValue(address.addressDescription);
        this.updatedAddress = address;
      } else {
        this.gid.ShowMessage('Adres bulunamadı.');
        this.router.navigate(['/home/addressdetail']);
      }
    }
  }

  getDistricts(cityId: number) {
    this.httpService.Get(
      'Addresses/cities/' + cityId + '/districts',
      (response) => {
        if (response.success) {
          this.districts = response.data;
          console.log(this.districts);
        } else {
          this.gid.ShowToast(response.message, 2000);
        }
      }
    );
  }

  getNeigborhoods(districtId: number) {
    this.httpService.Get(
      'Addresses/districts/' + districtId + '/neighborhoods',
      (response) => {
        if (response.success) {
          this.neighborhoods = response.data;
        } else {
          this.gid.ShowToast(response.message, 2000);
        }
      }
    );
  }
  cities: CityModel[];
  districts: DistrictModel[];
  neighborhoods: NeighborhoodModel[];


     ngOnInit() {
    this.httpService.Get('Addresses/cities', (response) => {
      if (response.success) {
        this.cities = response.data;
      } else {
        this.gid.ShowToast(response.message, 2000);
      }
    });
  }

  CitySelected() {
    this.getDistricts(this.signupForm.get('city').value);

  }

  DistrictSelected() {
    console.log(this.signupForm.get('district').value);
    this.getNeigborhoods(this.signupForm.get('district').value);
  }

  handleAddress() {
    if (this.signupForm.valid) {
      let addresses: Array<AddressModel>;
      let customerId = this.gid.MakeNewGuid();
      if (this.processType == 'register') {
        addresses = new Array<AddressModel>();
      } else {
        addresses = this.gid.customer.addresses;
        customerId = this.gid.customer.customerId;
        addresses.forEach((a) => (a.isSelected = false));
      }

      if (this.processType == 'updateaddress') {
        let address = this.gid.customer.addresses.find(
          (a) => a.id == this.updatedAddressId
        );
        address.addressTitle = this.signupForm.get('addressTitle').value;
        address.city = this.cities.find(
          (city) => city.cityId == this.signupForm.get('city').value
        );
        address.district = this.districts.find(
          (dist) => dist.districtId == this.signupForm.get('district').value
        );
        address.neighborhood = this.neighborhoods.find(
          (neig) => (neig.neighborhoodId == this.signupForm.get('neighborhood').value)
        );
        address.addressDescription =
          this.signupForm.get('addressDescription').value;
        address.street = this.signupForm.get('street').value;
        address.street2 = this.signupForm.get('street2').value;
        address.apartmentName = this.signupForm.get('apartmentName').value;
        address.doorNo = this.signupForm.get('doorNo').value;
        address.floor = this.signupForm.get('floor').value;
        address.inDoorNo = this.signupForm.get('inDoorNo').value;
        address.isSelected = true;
      } else {
        addresses.push(
          new AddressModel(
            this.gid.MakeNewGuid(),
            customerId,
            this.signupForm.get('addressTitle').value,
            this.cities.find(
              (city) => city.cityId == this.signupForm.get('city').value
            ),
            this.districts.find(
              (dist) => dist.districtId == this.signupForm.get('district').value
            ),
            this.neighborhoods.find(
              (neig) =>
                neig.neighborhoodId == this.signupForm.get('neighborhood').value
            ),
            this.signupForm.get('addressDescription').value,
            this.signupForm.get('street').value,
            this.signupForm.get('street2').value,
            this.signupForm.get('apartmentName').value,
            this.signupForm.get('doorNo').value,
            this.signupForm.get('floor').value,
            this.signupForm.get('inDoorNo').value,
            '',
            this.gid.EmptyGuid(),
            '',
            '',
            '',
            0,
            false,
            '',
            '',
            true
          )
        );
      }
      if (this.processType == 'register') {
        this.gid.customer = new CustomerModel(
          customerId,
          //this.gid.EmptyGuid(),
          this.signupForm.get('name').value,
          this.signupForm.get('surname').value,
          this.gid.phone,
          addresses
        );
      }
      console.log(this.gid.customer);
      this.router.navigateByUrl(
        '/dealers/' +
          this.processType +
          '/' +
          this.signupForm.get('neighborhood').value +
          '/' +
          this.updatedAddressId
      );
    } else {

      this.gid.ShowMessage('Lütfen gerekli tüm alanları doldurun.');
    }
  }

  backToSettings(){
    this.router.navigateByUrl("/home/settings");
  }
}
