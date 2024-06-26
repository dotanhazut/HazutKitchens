export class Products {
  public selected: boolean = false;
  public id: number = 0;
  public name: string = '';
  public title: string = '';
  public price: number = 0;
  constructor(id:number,name:string, title: string,price :number) {
    this.id = id;
    this.name = name;
    this.title = title;
    this.price = price;
    this.selected = false;
  }

  getName(): string {
    return this.name;
  }
}
