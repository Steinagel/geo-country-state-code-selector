import test from 'ava';
import GetPlaceCode from './index.js';

test('main', t => {
	t.throws(
		() => {
			GetPlaceCode.getRegionCode(123);
		},
		{
			instanceOf: TypeError,
			message: 'Expected a string'
		});
	t.throws(
		() => {
			GetPlaceCode.getCountryCode(1234);
		},
		{
			instanceOf: TypeError,
			message: 'Expected a string'
		});
	t.throws(
		() => {
			GetPlaceCode.getRegionCodeByCountry(1234);
		},
		{
			instanceOf: TypeError,
			message: 'Expected a string'
		});
	t.is(GetPlaceCode.getRegionCode('São Paulo'), 'SP');
	t.is(GetPlaceCode.getRegionCode('State of São Paulo', 'State of'), 'SP');
	t.is(GetPlaceCode.getCountryCode('BRAzIL'), 'BR');
	t.is(GetPlaceCode.getRegionCodeByCountry('INdïa', 'New Delhi', '', 'new '), 'DL');
});
