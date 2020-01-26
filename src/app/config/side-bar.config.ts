
export const menuElements = [
  {text: 'Dashboard', icon: 'icon-dashboard', route: '', parent: false},
  {text: 'Projects', icon: 'icon-project', route: '/projects/all', parent: false},
  {
    text: 'Sales', icon: 'icon-sales', route: null, parent: true, subelements: [
      {text: 'Bids', icon: 'bids-icon', route: '/sales/bids/all'},
      {text: 'Deals', icon: 'icon-deal', route: '/sales/deals/all'},
      {text: 'Visits', icon: 'icon-visits', route: '/sales/visits/all'},
    ]
  },
  {
    text: 'Purchase orders', icon: 'purchase-icon', route: null, parent: true, subelements: [
      {text: 'List all', icon: 'list-all-icon', route: '/orders/all'},
      {text: 'Suppliers', icon: 'icon-suppliers', route: '/orders/suppliers/all'},
    ]
  },
  {
    text: 'Payment vouchers', icon: 'icon-payment', route: null, parent: true, subelements: [
      {text: 'List all', icon: 'list-all-icon', route: 'default'},
      {text: 'Beneficiaries', icon: 'icon-benefits', route: 'default'},
    ]
  },
  {text: 'Warehouse', icon: 'warehouse-icon', route: 'default', parent: false},
  {text: 'Tasks', icon: 'tasks', route: '/tasks/all', parent: false},
  {text: 'Users', icon: 'users', route: '/users/all', parent: false},
  {text: 'Backup', icon: 'backup-icon', route: 'default', parent: false},
];
