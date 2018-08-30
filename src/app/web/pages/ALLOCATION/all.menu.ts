export const ALL_MENU = [
    {
    path: 'all',
    data: {
      menu: {
        title: 'ALLOCATION',
        icon: 'fa fa-user',
        selected: false,
        expanded: false,
        order: 400,
      }
    },
    children: [
      {
        path: 'ALL001',
        data: {
          menu: {
            title: 'List Skill',
            icon: 'fa fa-bars',
          }
        }
      },
      {
        path: 'ALL002',
        data: {
          menu: {
            title: 'List Category',
            icon: 'fa fa-category',
          }
        }
      },
      // {
      //   path: 'ALL004',
      //   data: {
      //     menu: {
      //       title: 'Input Nilai Skill SDM',
      //     }
      //   }
      // },
      {
        path: 'ALL003',
        data: {
          menu: {
            title: 'List SDM Skill Allocation',
            icon: 'fa fa-cubes',
          }
        }
      },
      {
        path: 'ALL006',
        data: {
          menu: {
            title: 'Multi-filtering SDM',
          }
        }
      }
    ]
    }
];
