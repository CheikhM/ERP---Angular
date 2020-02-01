
export const menuElements = [
  {text: 'Dashboard', icon: 'icon-dashboard', route: '', parent: false, permission: '*'},
  {text: 'Projects', icon: 'icon-project', route: '/projects/all', parent: false, permission: 'PM'},
  {
    text: 'Sales', icon: 'icon-sales', route: null, parent: true, permission: 'SM', subelements: [
      {text: 'Bids', icon: 'bids-icon', route: '/sales/bids/all'},
      {text: 'Deals', icon: 'icon-deal', route: '/sales/deals/all'},
      {text: 'Visits', icon: 'icon-visits', route: '/sales/visits/all'},
    ]
  },
  {
    text: 'Purchase orders', icon: 'purchase-icon', route: null, parent: true, permission: 'AC', subelements: [
      {text: 'List all', icon: 'list-all-icon', route: '/orders/all'},
      {text: 'Suppliers', icon: 'icon-suppliers', route: '/orders/suppliers/all'},
    ]
  },
  {
    text: 'Payment vouchers', icon: 'icon-payment', route: null, parent: true, permission: 'AC', subelements: [
      {text: 'List all', icon: 'list-all-icon', route: 'default'},
      {text: 'Beneficiaries', icon: 'icon-benefits', route: 'default'},
    ]
  },
  {text: 'Warehouse', icon: 'warehouse-icon', route: '/warehouse/all', parent: false, permission: 'AC'},
  {text: 'Tasks', icon: 'tasks', route: '/tasks/all', parent: false, permission: 'CS'},
  {text: 'Users', icon: 'users', route: '/users/all', parent: false, permission: 'CS'},
  {text: 'Backup', icon: 'backup-icon', route: 'default', parent: false, permission: 'CS'},
];
