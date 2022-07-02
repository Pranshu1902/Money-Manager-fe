export type transactionType = {
  amount: Number;
  description: string;
  spent: boolean;
  time: string;
};

export type user = {
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  email: string;
};
