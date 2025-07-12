import { dataEncarApiVehiclesRetrieve } from '@/api';
import PublicLayout from '@/layouts/Public';
import VehicleDetailView from '@/views/detail';
import { VehicleWebDetail } from '@/views/detail/types';
import { PageConfig, PageWithConfig } from '@carapis/nextjs/utils';
import { GetServerSideProps } from 'next';

interface PageData {
  vehicle: VehicleWebDetail | null;
  error?: string;
  pageConfig?: PageConfig;
}

const Page: PageWithConfig<PageData> = (props) => {
  const { vehicle } = props;

  return (
    <PublicLayout>
      <VehicleDetailView vehicle={vehicle} />
    </PublicLayout>
  );
};

export const getServerSideProps: GetServerSideProps<PageData> = async (context) => {
  const { vehicle_id } = context.params || {};

  if (!vehicle_id || typeof vehicle_id !== 'string') {
    return { notFound: true };
  }

  try {
    const response = await dataEncarApiVehiclesRetrieve(vehicle_id);
    if (!response || !response.data) {
      return { notFound: true };
    }

    const vehicle = response.data;

    return {
      props: {
        vehicle,
        pageConfig: {
          title: vehicle.meta_title,
          description: vehicle.meta_description,
          appBar: {},
          themeMode: 'dark' as const,
        },
      },
    };
  } catch (error) {
    console.error('Error fetching vehicle detail in SSR:', error);
    return { notFound: true };
  }
};

export default Page;
