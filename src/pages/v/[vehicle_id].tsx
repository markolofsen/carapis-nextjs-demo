import { dataEncarApiVehiclesRetrieve } from '@/api';
import PublicLayout from '@/layouts/Public';
import VehicleDetailView from '@/views/detail';
import { VehicleDetail } from '@/views/detail/types';
import { PageConfig, PageWithConfig } from '@carapis/nextjs/utils';
import { GetServerSideProps } from 'next';

interface PageData {
  vehicle: VehicleDetail | null;
  error?: string;
  pageConfig?: PageConfig;
}

const Page: PageWithConfig<PageData> = (props) => {
  const { vehicle, error } = props;

  return (
    <PublicLayout>
      <VehicleDetailView vehicle={vehicle} />
    </PublicLayout>
  );
};

export const getServerSideProps: GetServerSideProps<PageData> = async (context) => {
  const { vehicle_id, brand, model } = context.params || {};

  if (!vehicle_id || typeof vehicle_id !== 'string') {
    return { notFound: true };
  }

  // Fetch specific vehicle
  const response = await dataEncarApiVehiclesRetrieve({
    listing_id: vehicle_id,
  }).catch((error: any) => {
    console.error('Error fetching vehicle detail in SSR:', error);
    throw error;
  });

  if (!response || !response.data) {
    return { notFound: true };
  }

  const vehicle = response.data;

  return {
    props: {
      vehicle: vehicle,
      pageConfig: {
        title: vehicle.meta_title,
        description: vehicle.meta_description,
        appBar: {},
        themeMode: 'dark' as const,
      },
    },
  };
};

export default Page;
