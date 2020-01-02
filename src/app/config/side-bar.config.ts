
export const menuElements = [
  {text: 'Dashboard', icon: 'icon-dashboard', route: '', parent: false},
  {text: 'Projects', icon: 'icon-project', route: '/projects/all', parent: false},
  {
    text: 'Sales', icon: 'icon-sales', route: 'default', parent: true, subelements: [
      {text: 'Bids', icon: 'bids-icon', route: 'default'},
      {text: 'Deals', icon: 'icon-deal', route: 'default'},
    ]
  },
  {
    text: 'Purchase orders', icon: 'purchase-icon', route: 'default', parent: true, subelements: [
      {text: 'List all', icon00: 'list-all', route: 'default'},
      {text: 'Suppliers', icon: 'icon-suppliers', route: 'default'},
    ]
  },
  {
    text: 'Payment vouchers', icon: 'icon-payment', route: 'default', parent: true, subelements: [
      {text: 'List all', icon: 'list-all', route: 'default'},
      {text: 'Beneficiars', icon: 'icon-benefits', route: 'default'},
    ]
  },
  {text: 'Warehouse', icon: 'warehouse-icon', route: 'default', parent: false},
  {text: 'Users', icon: 'users', route: 'default', parent: false},
  {text: 'Backup', icon: 'backup', route: 'default', parent: false},
];
