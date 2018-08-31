export const PJA_MENU = [
    {
    path: 'pja',
    data: {
      menu: {
        title: 'Project Assignment',
        icon: 'fa fa-tasks',
        selected: false,
        expanded: false,
        order: 400,
      }
    },
    children: [
      {
        path: 'PJA001',
        data: {
          menu: {
            title: 'Input Project SDM',
            icon: 'fa fa-pencil',
          }
        }
      },
      // {
      //   path: 'PJA003',
      //   data: {
      //     menu: {
      //       title: 'List Detail Project SDM',
      //       icon: 'fa fa-user',
      //     }
      //   }
      // },
      {
        path: 'PJA003R',
        data: {
          menu: {
            title: 'List Detail Project SDM',
            icon: 'fa fa-users',
          }
        }
      },
      {
        path: 'PJA004',
        data: {
          menu: {
            title: 'List Detail Client',
            icon: 'fa fa-eye',
          }
        }
      },
      {
        path: 'PJA007',
        data: {
          menu: {
            title: 'Hiring SDM',
            icon: 'fa fa-send',
          }
        }
      },
      {
        path: 'PJA010',
        data: {
          menu: {
            title: 'SDM Assignment',
            icon: 'fa fa-address-book',
          }
        }
      }
    ]
    }
];
