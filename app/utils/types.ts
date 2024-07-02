type ReservationData =  {
    id: number;
    user_name: string;
    phone: string;
    branch_name: string;
    service_name: string;
    duration: number;
    time: string;
    date: string;
  }

  type ServiceInfo =  {
    name: string;
    time: string;
  }
  
  type BranchInfo =  {
    name: string;
    services: ServiceInfo[];
    address: string;
    hours: string;
  }

  