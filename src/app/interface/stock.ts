export interface IstockIssue {
    voucherNo: string;
    voucherDate: Date;
    fromBranch: string;
    toBranch: string;
    fromWarehouse: string;
    toWarehouse: string;
    description: string;
    terms: string;
  }

  export interface IBranch {
    id: number;
    company: string;
    nature: string;
  }

  export interface BranchState {
    branches: IBranch[];
    loading: boolean;
    error: string | null;
  }

  export interface IWarehouse {
    id: number;
    name: string;
    isDefault:boolean;
  }

  export interface WarehouseState {
    fromWarehouses: IWarehouse[];
    toWarehouses: IWarehouse[];
    loading: boolean;
    error: string | null;
  }

  export interface IVoucherData {
    id: number
    transactionNo: string
    date: Date
    amount: string
    cancelled: boolean
    entryNo: string
    entryDate: Date
    accountName: string
    phone: string
    status: string
    serialNo: number
    vatNo: string
  }
  
  