export class Vmx {
  constructor(private vm: any) {
  }

  static of(vm$: any): Vmx {
    return new Vmx(vm$);
  }
}
