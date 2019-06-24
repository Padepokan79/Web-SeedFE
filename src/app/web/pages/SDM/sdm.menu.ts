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
        path: 'SDM010',
        data: {
          menu: {
            title: 'Import SDM',
            icon: 'fa fa-file',
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
