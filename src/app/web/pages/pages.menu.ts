import { SDM_MENU } from './SDM/sdm.menu';
import { ALL_MENU } from './ALLOCATION/all.menu';
import { PJA_MENU } from './PJA/pja.menu';

export const PAGES_MENU = [
	{
		path: 'pages',
		children: [
			{
				path: 'dashboard',
				data: {
					menu: {
						title: 'Menu',
						icon: 'fa fa-home',
						selected: false,
						expanded: false,
						order: 500,
					}
				}
			},
			...SDM_MENU,
			...ALL_MENU,
			...PJA_MENU
			// {
			// 	path: 'example',
			// 	data: {
			// 		menu: {
			// 			title: 'Example',
			// 			icon: 'fa fa-eye',
			// 			selected: false,
			// 			expanded: false,
			// 			order: 400,
			// 		}
			// 	}
			// },
			// {
			// 	path: 'SDM001',
			// 	data: {
			// 		menu: {
			// 			title: 'Input SDM',
			// 			icon: 'fa fa-user',
			// 			selected: false,
			// 			expanded: false,
			// 			order: 400,
			// 		}
			// 	}
			// },
			// {
			// 	path: 'SDM003',
			// 	data: {
			// 		menu: {
			// 			title: 'List SDM',
			// 			icon: 'fa fa-eye',
			// 			selected: false,
			// 			expanded: false,
			// 			order: 400,
			// 		}
			// 	}
			// },
			// // {
			// // 	path: 'list-detail-client',
			// // 	data: {
			// // 		menu: {
			// // 			title: 'List Detail Client',
			// // 			icon: 'fa fa-user',
			// // 			selected: false,
			// // 			expanded: false,
			// // 			order: 400,
			// // 		}
			// // 	}
			// // },
			// {
			// 	path: 'SDM004',
			// 	data: {
			// 		menu: {
			// 			title: 'Historis',
			// 			icon: 'fa fa-user',
			// 			selected: false,
			// 			expanded: false,
			// 			order: 400,
			// 		}
			// 	}
			// },
			// {
			// 	path: 'SDM008',
			// 	data: {
			// 		menu: {
			// 			title: 'List Psycological SDM',
			// 			icon: 'fa fa-user',
			// 			selected: false,
			// 			expanded: false,
			// 			order: 400,
			// 		}
			// 	}
			// },
			// {
			// 	path: 'ALL001',
			// 	data: {
			// 		menu: {
			// 			title: 'List Skill',
			// 			icon: 'fa fa-user',
			// 			selected: false,
			// 			expanded: false,
			// 			order: 400,
			// 		}
			// 	}
			// },
			// {
			// 	path: 'ALL002',
			// 	data: {
			// 		menu: {
			// 			title: 'List Category',
			// 			icon: 'fa fa-user',
			// 			selected: false,
			// 			expanded: false,
			// 			order: 400,
			// 		}
			// 	}
			// },
			// {
			// 	path: 'ALL004',
			// 	data: {
			// 		menu: {
			// 			title: 'Input Nilai Skill SDM',
			// 			icon: 'fa fa-user',
			// 			selected: false,
			// 			expanded: false,
			// 			order: 400,
			// 		}
			// 	}
			// },
			// {
			// 	path: 'ALL003',
			// 	data: {
			// 		menu: {
			// 			title: 'List SDM Skill Allocation',
			// 			icon: 'fa fa-user',
			// 			selected: false,
			// 			expanded: false,
			// 			order: 400,
			// 		}
			// 	}
			// },
			// {
			// 	path: 'ALL006',
			// 	data: {
			// 		menu: {
			// 			title: 'Multi-filtering SDM',
			// 			icon: 'fa fa-user',
			// 			selected: false,
			// 			expanded: false,
			// 			order: 400,
			// 		}
			// 	}
			// },
			// {
			// 	path: 'PJA001',
			// 	data: {
			// 		menu: {
			// 			title: 'Input Project SDM',
			// 			icon: 'fa fa-user',
			// 			selected: false,
			// 			expanded: false,
			// 			order: 400,
			// 		}
			// 	}
			// },
			// {
			// 	path: 'PJA003',
			// 	data: {
			// 		menu: {
			// 			title: 'List Detail Project SDM',
			// 			icon: 'fa fa-user',
			// 			selected: false,
			// 			expanded: false,
			// 			order: 400,
			// 		}
			// 	}
			// },
			// {
			// 	path: 'PJA005',
			// 	data: {
			// 		menu: {
			// 			title: 'Input Detail Client',
			// 			icon: 'fa fa-user',
			// 			selected: false,
			// 			expanded: false,
			// 			order: 400,
			// 		}
			// 	}
			// },
			// {
			// 	path: 'PJA04',
			// 	data: {
			// 		menu: {
			// 			title: 'List Detail Client',
			// 			icon: 'fa fa-user',
			// 			selected: false,
			// 			expanded: false,
			// 			order: 400,
			// 		}
			// 	}
			// },
			// {
			// 	path: 'PJA007',
			// 	data: {
			// 		menu: {
			// 			title: 'Hiring SDM',
			// 			icon: 'fa fa-user',
			// 			selected: false,
			// 			expanded: false,
			// 			order: 400,
			// 		}
			// 	}
			// },
			// {
			// 	path: 'PJA0010',
			// 	data: {
			// 		menu: {
			// 			title: 'SDM Assignment',
			// 			icon: 'fa fa-user',
			// 			selected: false,
			// 			expanded: false,
			// 			order: 400,
			// 		}
			// 	}
			// }
		]
	}
];
