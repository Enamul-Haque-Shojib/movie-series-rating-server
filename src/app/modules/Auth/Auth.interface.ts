

  
  export type TAuth = {
    name?: string;
    photoUrl?: string;
    email: string;
    password: string;
    role?: 'ADMIN' | 'USER';
  
  };