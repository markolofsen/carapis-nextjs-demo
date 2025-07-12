import { dataEncarApiVehiclesList, myClient } from '@/api';
import PublicLayout from '@/layouts/Public';
import CatalogList from '@/views/catalog/CatalogList';
import { VehicleListItem, type CatalogFilter, type DataEncarApiVehiclesListData } from '@/views/catalog/types';
import { PageConfig, PageWithConfig } from '@carapis/nextjs/utils';
import { GetServerSideProps } from 'next';

interface PageData {
  vehicles: VehicleListItem[];
  totalCount: number;
  initialPage: number;
  pageConfig?: PageConfig;
}

const Page: PageWithConfig<PageData> = (props) => {
  const { vehicles, totalCount, initialPage } = props;
  return (
    <PublicLayout noContainer>
      <CatalogList initialVehicles={vehicles} initialTotalCount={totalCount} initialPage={initialPage} />
    </PublicLayout>
  );
};

export const getServerSideProps: GetServerSideProps<PageData> = async (context) => {
  const { brand, model } = context.params || {};
  const page = parseInt(context.query.page as string) || 1;
  const page_size = parseInt(context.query.page_size as string) || 20;

  // Extract all possible filter parameters from query
  const { search, color, fuel_type, transmission, year_min, year_max, price_min, price_max, mileage_max, investment_grade, risk_level, is_verified, ordering } = context.query;

  const payload: CatalogFilter = {
    page,
    page_size,
    ordering: (ordering as string) || '-created_at',
    brand_slug: brand as string,
    model_group_slug: model as string,
    // Search and text filters
    search: search as string,
    // Vehicle specifications
    color: color as any,
    fuel_type: fuel_type as any,
    transmission: transmission as any,
    // Year range
    year_min: year_min ? parseInt(year_min as string) : undefined,
    year_max: year_max ? parseInt(year_max as string) : undefined,
    // Price range (in 만원)
    price_min: price_min ? parseInt(price_min as string) : undefined,
    price_max: price_max ? parseInt(price_max as string) : undefined,
    // Mileage filter
    mileage_max: mileage_max ? parseInt(mileage_max as string) : undefined,
    // Quality and risk filters
    investment_grade: investment_grade as any,
    risk_level: risk_level as any,
    // Verification filter
    is_verified: is_verified === 'true' ? true : is_verified === 'false' ? false : undefined,
  };

  // Fetch vehicles with filters
  const response = await dataEncarApiVehiclesList(payload).catch((error) => {
    console.error('Error fetching vehicles in SSR:', error);
    throw error;
  });

  if (!response || !response.data) {
    return {
      props: {
        vehicles: [],
        totalCount: 0,
        initialPage: 1,
        pageConfig: {
          title: 'Vehicle Catalog',
          description: 'Browse our vehicle collection',
          appBar: {},
          themeMode: 'dark' as const,
        },
      },
    };
  }

  // Create dynamic title based on filters
  let dynamicTitle = 'Vehicle Catalog';
  let dynamicDescription = 'Browse our vehicle collection';

  if (brand && model) {
    dynamicTitle = `${brand} ${model} Catalog`;
    dynamicDescription = `Browse ${brand} ${model} vehicles`;
  } else if (brand) {
    dynamicTitle = `${brand} Catalog`;
    dynamicDescription = `Browse ${brand} vehicles`;
  }

  // Add basic filter info if search is applied
  if (search) {
    dynamicDescription += ` - Search: "${search}"`;
  }

  return {
    props: {
      vehicles: response.data.results || [],
      totalCount: response.data.count || 0,
      initialPage: page,
      pageConfig: {
        title: dynamicTitle,
        description: dynamicDescription,
        appBar: {},
        themeMode: 'dark' as const,
      },
    },
  };
};

export default Page;
