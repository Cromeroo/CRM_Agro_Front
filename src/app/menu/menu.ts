import { PATH } from '../core/enum/path.enum';
import { MenuInfoInterface } from '../core/interface/menu_info.interface';

export const MenuRoutes: MenuInfoInterface[] = [
  {
    path: PATH.HOME,
    title: 'Home',
    icon: 'fa-solid fa-house',
    classCss: '',
    subMenu: [],
  },
  {
    path: PATH.PERFIL,
    title: 'Perfil',
    classCss: '',
    subMenu: [
      {
        path: PATH.IMAGEN,
        title: 'Imagen',
        icon: 'fa-solid fa-user',
        classCss: '',
        subMenu: [],
      },
    ],
  },
  {
    path: PATH.PEDIDOS,
    title: 'Pedidos',
    icon: '',
    classCss: '',
    subMenu: [],
  },
  {
    path: PATH.PRODUCTOS,
    title: 'Productos',
    icon: '',
    classCss: '',
    subMenu: [],
  },
  {
    path: PATH.SOPORTE,
    title: 'Noticias',
    icon: '',
    classCss: '',
    subMenu: [],
  },
];
