export class Route {
  id: number;
  districtId: number;
  provinceId: number;
  areaId: number;
  storeCount: number;
  name: string;
  routeCode: string;
  startLatitude: string;
  startLongitude: string;
  endLatitude: string;
  endLongitude: string;
  comment: string;

  constructor(route) {
    this.id = route.id;
    this.districtId = route.districtId;
    this.provinceId = route.provinceId;
    this.areaId = route.areaId;
    this.storeCount = route.storeCount;
    this.name = route.name;
    this.routeCode = route.routeCode;
    this.startLatitude = route.startLatitude;
    this.startLongitude = route.startLongitude;
    this.endLatitude = route.endLatitude;
    this.endLongitude = route.endLongitude;
    this.comment = route.comment;
  }
}
