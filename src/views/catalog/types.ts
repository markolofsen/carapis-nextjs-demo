// Proxy types for the vehicle catalog (KISS style)
import type { Encar_publicTypes } from '@carapis/api';

export type VehicleListItem = Encar_publicTypes.VehicleWebList;
export type PaginatedVehicleList = Encar_publicTypes.PaginatedVehicleWebListList;
export type DataEncarApiVehiclesListData = Encar_publicTypes.DataEncarApiVehiclesWebListData;
export type CatalogFilter = DataEncarApiVehiclesListData['query'];

export type BodyType = Encar_publicTypes.BodyTypeEnum;
export type FuelType = Encar_publicTypes.FuelTypeEnum;
export type Transmission = Encar_publicTypes.TransmissionEnum;
export type InvestmentGrade = Encar_publicTypes.InvestmentGradeEnum;
export type RiskLevel = Encar_publicTypes.RiskLevelEnum;
export type Status = Encar_publicTypes.StatusEnum;
export type Color = Encar_publicTypes.ColorEnum;

// Filter state type for the catalog filters component - matches web API
export type FilterState = {
  search: string;
  fuel_type: string;
  transmission: string;
  year_min: string;
  year_max: string;
  price_min: string;
  price_max: string;
  mileage_max: string;
  investment_grade: string;
  risk_level: string;
  is_verified: string;
  ordering: string;
  // Additional web API fields
  color: string;
  location: string;
  accident_count: string;
  owner_changes: string;
  vehicle_model_slug: string;
};

// Typed arrays for filter options - web API compatible
export const COLOR_OPTIONS: Array<{ value: Color; label: string }> = [
  { value: 'white', label: 'White' },
  { value: 'black', label: 'Black' },
  { value: 'gray', label: 'Gray' },
  { value: 'silver', label: 'Silver' },
  { value: 'red', label: 'Red' },
  { value: 'blue', label: 'Blue' },
  { value: 'yellow', label: 'Yellow' },
  { value: 'green', label: 'Green' },
  { value: 'brown', label: 'Brown' },
  { value: 'purple', label: 'Purple' },
  { value: 'orange', label: 'Orange' },
  { value: 'pink', label: 'Pink' },
  { value: 'gold', label: 'Gold' },
  { value: 'beige', label: 'Beige' },
  { value: 'maroon', label: 'Maroon' },
  { value: 'bronze', label: 'Bronze' },
];

export const FUEL_TYPE_OPTIONS: Array<{ value: FuelType; label: string }> = [
  { value: 'gasoline', label: 'Gasoline' },
  { value: 'diesel', label: 'Diesel' },
  { value: 'hybrid', label: 'Hybrid' },
  { value: 'plug_in_hybrid', label: 'Plug-in Hybrid' },
  { value: 'electric', label: 'Electric' },
  { value: 'hydrogen', label: 'Hydrogen' },
  { value: 'cng', label: 'CNG' },
  { value: 'lpg', label: 'LPG' },
  { value: 'gasoline_electric', label: 'Gasoline/Electric' },
  { value: 'diesel_electric', label: 'Diesel/Electric' },
  { value: 'lpg_electric', label: 'LPG/Electric' },
];

export const TRANSMISSION_OPTIONS: Array<{ value: Transmission; label: string }> = [
  { value: 'manual', label: 'Manual' },
  { value: 'automatic', label: 'Automatic' },
  { value: 'cvt', label: 'CVT' },
  { value: 'semi_automatic', label: 'Semi-Automatic' },
  { value: 'semi_auto', label: 'Semi-Auto' },
  { value: 'dct', label: 'DCT' },
];

export const INVESTMENT_GRADE_OPTIONS: Array<{ value: InvestmentGrade; label: string }> = [
  { value: 'A+', label: 'A+ (Excellent)' },
  { value: 'A', label: 'A (Very Good)' },
  { value: 'A-', label: 'A- (Good Plus)' },
  { value: 'B+', label: 'B+ (Good)' },
  { value: 'B', label: 'B (Above Average)' },
  { value: 'B-', label: 'B- (Average Plus)' },
  { value: 'C+', label: 'C+ (Average)' },
  { value: 'C', label: 'C (Below Average)' },
  { value: 'C-', label: 'C- (Poor Plus)' },
  { value: 'D+', label: 'D+ (Poor Plus)' },
  { value: 'D', label: 'D (Poor)' },
  { value: 'D-', label: 'D- (Very Poor)' },
  { value: 'F', label: 'F (Avoid)' },
];

export const RISK_LEVEL_OPTIONS: Array<{ value: RiskLevel; label: string }> = [
  { value: 'very_low', label: 'Very Low' },
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'very_high', label: 'Very High' },
];

// Status options removed - not supported by web API

// Type for ordering values based on CatalogFilter
export type OrderingValue = NonNullable<NonNullable<CatalogFilter>['ordering']>;

export const ORDERING_OPTIONS: Array<{ value: OrderingValue; label: string }> = [
  { value: '-created_at', label: 'Newest First' },
  { value: 'created_at', label: 'Oldest First' },
  { value: 'price', label: 'Price Low to High' },
  { value: '-price', label: 'Price High to Low' },
  { value: 'year', label: 'Year Old to New' },
  { value: '-year', label: 'Year New to Old' },
  { value: 'mileage', label: 'Mileage Low to High' },
  { value: '-mileage', label: 'Mileage High to Low' },
];

// Add more as needed for catalog features
