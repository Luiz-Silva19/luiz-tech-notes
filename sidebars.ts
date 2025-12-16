const sidebars = {
  tutorialSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: 'Início',
    },
    {
      type: 'category',
      label: 'AWS',
      link: {
        type: 'doc',
        id: 'aws/index',
      },
      items: [
        {
          type: 'category',
          label: 'Load Balancers',
          items: [
            'aws/load-balancers/alb',
            'aws/load-balancers/nlb',
            'aws/load-balancers/gwlb',
          ],
        },
        'aws/ec2',
        'aws/s3',
      ],
    },
    {
      type: 'category',
      label: 'Backend',
      link: {
        type: 'doc',
        id: 'backend/index',
      },
      items: ['backend/dotnet', 'backend/node'],
    },
    {
      type: 'category',
      label: 'Infra',
      link: {
        type: 'doc',
        id: 'infra/index',
      },
      items: ['infra/docker', 'infra/kubernetes'],
    },
  ],
} as const;

export default sidebars;
