import { ColorName } from "@/utils/theme";

export interface Account {
  name: string;
  enable: boolean;
}

export interface profile {
  logo: {
    src: string;
    enable: boolean;
  };
  nameOfBrand: {
    name: string;
    enable: boolean;
  };
  cover: {
    name: string;
    enable: boolean;
    title?: string;
    subtitle?: string;
  };
  color: ColorName;
  slogon: {
    name: string;
    enable: boolean;
  };
  category: {
    enable: boolean;
  };
  email: Account;
  accounts: Account[];
  lastUpdated?: string;
}
