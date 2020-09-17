export class Area {
  id: number;
  districtId: number;
  provinceId: number;
  name: string;
  areaCode: string;

  constructor(area) {
    this.id = area.id;
    this.districtId = area.districtId;
    this.provinceId = area.provinceId;
    this.name = area.name;
    this.areaCode = area.areaCode;
  }
}
