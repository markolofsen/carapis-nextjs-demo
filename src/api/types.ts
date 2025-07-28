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

export type VehicleWebDetail = Encar_publicTypes.VehicleWebDetail;
