export class District {
  id: number;
  provinceId: number;
  name: string;

  constructor(district) {
    this.id = district.id;
    this.provinceId = district.provinceId;
    this.name = district.name;
  }
}
