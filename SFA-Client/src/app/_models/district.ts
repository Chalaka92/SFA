import { Area } from './area';

export class District {
  id: number;
  provinceId: number;
  name: string;
  areas: Area[];

  constructor(district) {
    this.id = district.id;
    this.provinceId = district.provinceId;
    this.name = district.name;
    this.areas = district.areas;
  }
}
