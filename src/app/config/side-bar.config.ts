
export const menuElements = [
  {text: 'Dashboard', icon: 'icon-dashboard', route: '', parent: false},
  {text: 'Projects', icon: 'icon-project', route: '/projects/all', parent: false},
  {
    text: 'Sales', icon: 'icon-sales', route: 'default', parent: true, subelements: [
      {text: 'Bids', icon: 'bids-icon', route: '/sales/bids/all'},
      {text: 'Deals', icon: 'icon-deal', route: '/sales/deals/all'},
    ]
  },
  {
    text: 'Purchase orders', icon: 'purchase-icon', route: 'jjjjjj', parent: true, subelements: [
      {text: 'List all', icon: 'list-all-icon', route: 'default'},
      {text: 'Suppliers', icon: 'icon-suppliers', route: 'default'},
    ]
  },
  {
    text: 'Payment vouchers', icon: 'icon-payment', route: 'default', parent: true, subelements: [
      {text: 'List all', icon: 'list-all-icon', route: 'default'},
      {text: 'Beneficiars', icon: 'icon-benefits', route: 'default'},
    ]
  },
  {text: 'Warehouse', icon: 'warehouse-icon', route: 'default', parent: false},
  {text: 'Users', icon: 'users', route: 'default', parent: false},
  {text: 'Backup', icon: 'backup-icon', route: 'default', parent: false},
];
