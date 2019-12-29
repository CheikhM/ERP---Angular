
export const menuElements = [
  {text: 'Dashboard', icon: 'dashboard', route: 'default', parent: false},
  {text: 'Projects', icon: 'projects', route: 'default', parent: false},
  {
    text: 'Sales', icon: 'sales', route: 'default', parent: true, subelements: [
      {text: 'Bids', icon: 'bids', route: 'default'},
      {text: 'Deals', icon: 'deals', route: 'default'},
    ]
  },
  {
    text: 'Purchase orders', icon: 'orders', route: 'default', parent: true, subelements: [
      {text: 'List all', icon: 'list-all', route: 'default'},
      {text: 'Suppliers', icon: 'suppliers', route: 'default'},
    ]
  },
  {
    text: 'Payment vouchers', icon: 'vouchers', route: 'default', parent: true, subelements: [
      {text: 'List all', icon: 'list-all', route: 'default'},
      {text: 'Beneficiars', icon: 'beneficiars', route: 'default'},
    ]
  },
  {text: 'Warehouse', icon: 'warehouse', route: 'default', parent: false},
  {text: 'Users', icon: 'users', route: 'default', parent: false},
  {text: 'Backup', icon: 'backup', route: 'default', parent: false},
];
