let organigrama = [
  {
    expanded: true,
    type: 'person',
    data: {
      image: 'https://media.tenor.com/HDlcmUVa3w8AAAAd/messi-lionel-messi.gif',
      name: 'Lucas Cordero',
      title: 'CEO',
    },
    children: [
      {
        expanded: true,
        type: 'person',
        data: {
          image:
            'https://media.tenor.com/HDlcmUVa3w8AAAAd/messi-lionel-messi.gif',
          name: 'Jonás busto',
          title: 'CMO',
        },
        children: [
          {
            label: 'Venta',
          },
          {
            label: 'Marketing',
          },
        ],
      },
      {
        expanded: true,
        type: 'person',
        data: {
          image:
            'https://media.tenor.com/HDlcmUVa3w8AAAAd/messi-lionel-messi.gif',
          name: 'Nacho Rebolleda',
          title: 'CMO',
        },
        children: [
          {
            label: 'Venta',
          },
          {
            label: 'Marketing',
          },
        ],
      },
      {
        expanded: true,
        type: 'person',
        data: {
          image:
            'https://media.tenor.com/HDlcmUVa3w8AAAAd/messi-lionel-messi.gif',
          name: 'Felix Figueroa',
          title: 'CMO',
        },
        children: [
          {
            label: 'Venta',
          },
          {
            label: 'Marketing',
          },
        ],
      },
      {
        expanded: true,
        type: 'person',
        data: {
          image:
            'https://media.tenor.com/HDlcmUVa3w8AAAAd/messi-lionel-messi.gif',
          name: 'Javier Paez',
          title: 'CTO',
        },
        children: [
          {
            label: 'Desarrollo',
          },
          {
            label: 'Diseño',
          },
        ],
      },
      {
        expanded: true,
        type: 'person',
        data: {
          image:
            'https://media.tenor.com/HDlcmUVa3w8AAAAd/messi-lionel-messi.gif',
          name: 'Leandro Bechara',
          title: 'CTO',
        },
        children: [
          {
            label: 'Desarrollo',
          },
          {
            label: 'Diseño',
          },
        ],
      },
    ],
  },
];

export default organigrama;
