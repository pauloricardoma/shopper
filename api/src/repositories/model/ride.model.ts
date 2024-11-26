export class Ride {
  constructor(
    public id: number,
    public customerId: number,
    public origin: string,
    public destination: string,
    public distance: number,
    public duration: string,
    public driverId: number,
    public value: number,
  ) {}
}
