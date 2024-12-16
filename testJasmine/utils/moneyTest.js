import { displayPrice } from "../../scripts/utils/money.js";

describe('test suite: displayPrice', () => {
  it('coverts cents to dollar', () => {
    expect(displayPrice(2095)).toEqual('20.95');
  });
  it('0 as 0.00', () => {
    expect(displayPrice(0)).toEqual('0.00');
  });
  it('round decimal up', () => {
    expect(displayPrice(2000.5)).toEqual('20.01');
  });
  it('round decimal down', () => {
    expect(displayPrice(2000.499)).toEqual('20.00');
  });
})