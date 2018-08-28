export const SDM_MENU = [
    {
    path: 'sdm',
    data: {
      menu: {
        title: 'SDM',
        icon: 'fa fa-users',
        selected: false,
        expanded: false,
        order: 400,
      }
    },
    children: [
      {
        path: 'SDM001',
        data: {
          menu: {
            title: 'Input SDM',
            icon: 'fa fa-user',
          }
        }
      },
      {
        path: 'SDM003',
        data: {
          menu: {
            title: 'List SDM',
            icon: 'fa fa-list',
          }
        }
      },
      {
        path: 'SDM004',
        data: {
          menu: {
            title: 'Historis SDM',
            icon: 'fa fa-history',
          }
        }
      },
      {
        path: 'SDM008',
        data: {
          menu: {
            title: 'List Psycology',
            icon: 'fa fa-stethoscope',
          }
        }
      }
    ]
    }
];