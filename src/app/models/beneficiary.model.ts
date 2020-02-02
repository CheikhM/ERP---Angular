export class Beneficiary {
  id: number;
  name: string;
  shortName: string;
  phone: string;
  bank: string;
  account: string;
  createdAt: string;

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.phone = data.phone;
    this.shortName = data.short_name;
    this.createdAt = data.created_at;
    this.bank = data.bank;
    this.account = data.account;
  }

  static arrayCast(data: any): Beneficiary [] {
    const beneficiaries: Beneficiary [] = [];
    data.data.forEach(beneficiaryItem => {
      const beneficiary = new Beneficiary(beneficiaryItem);
      beneficiaries.push(beneficiary);
    });
    return beneficiaries;
  }

  static getEmptyBeneficiary(): Beneficiary {
    return {
      id: null,
      name: null,
      createdAt: null,
      shortName: null,
      phone: null,
      account: null,
      bank: null
    };
  }


}
