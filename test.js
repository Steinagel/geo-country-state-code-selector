import test from 'ava';
import GetPlaceCode from './index.js';

test('@private Trim Char', t => {
	t.throws(
		() => {
			GetPlaceCode.__trimChar(123);
		},
		{
			instanceOf: TypeError,
			message: 'Expected string and char'
		});
	t.is(GetPlaceCode.__trimChar('___string_'), 'string');
	t.is(GetPlaceCode.__trimChar('&&string&&&&', '&'), 'string');
});

test('@private Process String and Remove Prefix', t => {
	t.throws(
		() => {
			GetPlaceCode.__removePrefix(1, 12);
		},
		{
			instanceOf: TypeError,
			message: 'Expected strings'
		});
	// Strings are processed before remove prefix
	t.is(GetPlaceCode.__removePrefix(')#($#($* Prëfĩx REsT of téxT', 'pRefiX'), 'rest_of_text');
	t.is(GetPlaceCode.__removePrefix(')#($#($* REsT of téxT'), 'rest_of_text');
	t.is(GetPlaceCode.__removePrefix('State of São Paulo', 'state-of'), 'sao_paulo');
});

test('@private Slugify String', t => {
	t.throws(
		() => {
			GetPlaceCode.__slugify(123);
		},
		{
			instanceOf: TypeError,
			message: 'Expected string'
		});
	t.is(GetPlaceCode.__slugify('tHIS IS A Strange String & a ṕröblemÀTIK URL'), 'this_is_a_strange_string_and_a_problematik_url');
	t.is(GetPlaceCode.__slugify('State of São Paulo'), 'state_of_sao_paulo');
});

test('@private Check all params are String, !undefined and !null', t => {
	t.is(GetPlaceCode.__checkAllAreString(1), false);
	t.is(GetPlaceCode.__checkAllAreString(12, 'string'), false);
	t.is(GetPlaceCode.__checkAllAreString('123', '1234'), true);
});

test('@public get Region Code', t => {
	t.throws(
		() => {
			GetPlaceCode.getRegionCode();
		},
		{
			instanceOf: TypeError,
			message: 'Expected string'
		});
	t.is(GetPlaceCode.getRegionCode('São Paulo'), 'SP');
	t.is(GetPlaceCode.getRegionCode('sao paulo'), 'SP');
});

test('@public Remove Prefix and get Region Code', t => {
	t.throws(
		() => {
			GetPlaceCode.getPrefixedRegionCode(123);
		},
		{
			instanceOf: TypeError,
			message: 'Expected strings'
		});
	t.is(GetPlaceCode.getPrefixedRegionCode('State of São Paulo', 'state-of'), 'SP');
	t.is(GetPlaceCode.getPrefixedRegionCode('REGION OF SAO PAULO', 'region of  '), 'SP');
});

test('@public get Country Code', t => {
	t.throws(
		() => {
			GetPlaceCode.getCountryCode(123);
		},
		{
			instanceOf: TypeError,
			message: 'Expected string'
		});
	t.is(GetPlaceCode.getCountryCode('Brazil'), 'BR');
	// Usual case
	t.is(GetPlaceCode.getCountryCode(', BRAZIL'), 'BR');
});

test('@public Remove Prefix and get Country Code', t => {
	t.throws(
		() => {
			GetPlaceCode.getPrefixedCountryCode(12345, null);
		},
		{
			instanceOf: TypeError,
			message: 'Expected strings'
		});
	t.is(GetPlaceCode.getPrefixedCountryCode('FEDERATION OF BRAZIL', 'Federation of'), 'BR');
});

test('@public Select Country to Search Code Region', t => {
	t.throws(
		() => {
			GetPlaceCode.getRegionCodeByCountry(123, true);
		},
		{
			instanceOf: TypeError,
			message: 'Expected strings'
		});
	t.is(GetPlaceCode.getRegionCodeByCountry(', Brazil', ', São PAULO'), 'SP');
});

test('@public Remove Prefixes from Country and Select Country to Search Code Region', t => {
	t.throws(
		() => {
			GetPlaceCode.getPrefixedRegionCodeByCountry(123);
		},
		{
			instanceOf: TypeError,
			message: 'Expected strings'
		});
	t.is(GetPlaceCode.getPrefixedRegionCodeByCountry(
		'Republic of Brazil',
		'State of São Paulo',
		'republic of ',
		'state of'),
	'SP');
});
