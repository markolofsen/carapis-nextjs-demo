import { AuthLayout } from '@carapis/nextjs/layouts';
import { PageWithConfig } from '@carapis/nextjs/utils';
import React from 'react';

const Page: PageWithConfig = () => {
  return <AuthLayout />;
};

Page.pageConfig = {
  title: 'Authentication',
};

export default Page;
