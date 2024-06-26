export class Products {
  public id: number = 0;
  public name: string = '';
  public title: string = '';
  constructor(id:number,name:string, title: string) {
    this.id = id;
    this.name = name;
    this.title = title;
  }

  getName(): string {
    return this.name;
  }
}
