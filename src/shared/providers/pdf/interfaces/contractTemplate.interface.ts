interface Address {
  street: string;
  neighborhood: string;
  city: string;
  state: string;
}

interface Student {
  address: Address;
  email: string;
  name: string;
  nationality: string;
  documentType: string;
  documentValue: string;
  isBrazilian: boolean;
}

interface Contract {
  amountOfClasses: number;
  amountOfMounths: number;
  courseLanguage: string;
  amountValue: number;
  mouthValueText: string;
  currentDate: string;
}

export interface IContractTemplate {
  contract: Contract;
  student: Student;
}
