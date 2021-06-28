import React from 'react';
import * as RiIcons from 'react-icons/ri';

export const SidebarData = [
  {
    title: 'Location',
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Provinsi',
        path: '/location/provinsi',
      },
      {
        title: 'Kota',
        path: '/location/kota',
      },
      {
        title: 'Kecamatan',
        path: '/location/kecamatan',
      },
      {
        title: 'Kelurahan',
        path: '/location/kelurahan',
      },
      {
        title: 'Kode Pos',
        path: '/location/kodepos',
      },
    ]
  },
  {
    title: 'Region',
    path: '/location/region'
  },
  {
    title: 'Branch',
    path: '/location/branch'
  },
  {
    title: 'Outlet',
    path: '/location/outlet'
  },
];
