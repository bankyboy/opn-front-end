import { summaryDonations } from '../lib/helpers';

describe('unit test for summaryDonations', () => {
  test('happy case', () => {
    const donations = [100, 200, 50, 150];
    const result = summaryDonations(donations);
    expect(result).toBe(500);
  });

  test('empty array', () => {
    const donations = [];
    const result = summaryDonations(donations);
    expect(result).toBe(0);
  });

  test('one member', () => {
    const donations = [250];
    const result = summaryDonations(donations);
    expect(result).toBe(250);
  });

  test('in case of negative', () => {
    const donations = [100, -50, 200, -150];
    const result = summaryDonations(donations);
    expect(result).toBe(100);
  });
});
