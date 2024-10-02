import { summaryDonations } from '../lib/helpers';

describe('unit test of helpers function', function () {
  test('`summaryDonations` should calculate donations correctly', () => {
    expect(summaryDonations([1, 2, 3, 4])).toEqual(10);
  });

  test('summary donation should calculate failed', () => {
    expect(summaryDonations([1, 2, 3, 4])).not.toEqual(11);
  });
});
