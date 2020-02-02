import {Component, OnInit} from '@angular/core';
import {SharedService} from '../../services/shared.service';
import {ToastrService} from 'ngx-toastr';
import {AutoUnsubscribe} from '../../decorators/autounsubscribe.decorator';
import {Beneficiary} from '../../models/beneficiary.model';
import {OrderService} from '../../services/order.service';


declare var $: any;

@AutoUnsubscribe()
@Component({
  selector: 'app-beneficiaries',
  templateUrl: './beneficiaries.component.html',
  styleUrls: ['./beneficiaries.component.css']
})
export class BeneficiariesComponent implements OnInit {


  filteredBeneficiaries: any;

  metaDefinition = [
    {text: 'Name', attribute: 'name', type: 'PLString'},
    {text: 'Short Name', attribute: 'shortName', type: 'PLString'},
    {text: 'Phone', attribute: 'phone', type: 'PLString'},
    {text: 'Bank', attribute: 'bank'}
  ];

  beneficiaries: Beneficiary [];
  manageAction = 'Add Beneficiary';
  beneficiaryTobeManaged: Beneficiary;
  private toBeDeletedId: any;
  showOnly: boolean;

  constructor(private sharedService: SharedService,
              private orderService: OrderService,
              private toastrService: ToastrService) {
  }

  ngOnInit() {
    // check for new update
    this.sharedService.getNewUpdate().subscribe(update => {
      if (update) {
        this.getAllBeneficiaries();
      }
    });

    // search beneficiary
    this.sharedService.getSearchText().subscribe(item => {
      this.searchBeneficiary(item.toLocaleLowerCase());
    });
    this.getAllBeneficiaries();
  }

  getAllBeneficiaries() {
    this.orderService.getAllBeneficiaries().subscribe(
      resp => {
        this.beneficiaries = resp;
        this.filteredBeneficiaries = resp;
      },
      error => {},
      () => {
        // console.log(this.beneficiarys);
      }
    );
  }

  // search project by name
  private searchBeneficiary(text: string) {
    if (this.beneficiaries) {
      this.filteredBeneficiaries = this.beneficiaries.filter(
        beneficiary =>
          beneficiary.name.toLowerCase().includes(text) ||
          beneficiary.phone.toLowerCase().includes(text) ||
          beneficiary.shortName.toLowerCase().includes(text) ||
          beneficiary.bank.toLowerCase().includes(text)
      );
    }
  }

  editBeneficiary(beneficiaryID: number) {
    this.manageAction = 'Edit Beneficiary';
    this.beneficiaryTobeManaged = this.beneficiaries.find(item => item.id === beneficiaryID);

    $('#newBeneficiary').modal({
      backdrop: 'static',
      keyboard: false
    });
  }

  deleteBeneficiary(beneficiaryID: number) {
    this.toBeDeletedId = beneficiaryID;

    $('#deleteBeneficiaryModal').modal('show');
  }

  confirmBeneficiaryDelete(action: boolean) {
    if (action && this.toBeDeletedId) {
      this.orderService.deleteBeneficiary(this.toBeDeletedId).subscribe(result => {
        if (result && result['status'] === '200_OK') {
          this.toastrService.success('', 'Successfully deleted');
          this.beneficiaries = this.beneficiaries.filter(beneficiary => beneficiary.id !== this.toBeDeletedId);
          this.filteredBeneficiaries = this.beneficiaries;
        } else {
          this.toastrService.error('', 'An Error was occurred');
        }
      }, error => {
        this.toastrService.error('', 'An Error was occurred');
      }, () => {
      });

      $('#deleteBeneficiaryModal').modal('hide');
    }
  }

  showBeneficiary(id: number) {
    this.beneficiaryTobeManaged = this.beneficiaries.find(item => item.id === id);
    this.manageAction = 'Beneficiary:';
    this.showOnly = true;

    $('#newBeneficiary').modal('show');
  }

  exitPopup() {
    this.showOnly = false;
    this.manageAction = 'Add Beneficiary';
    this.beneficiaryTobeManaged = Beneficiary.getEmptyBeneficiary();
  }
}
