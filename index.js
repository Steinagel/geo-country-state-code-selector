import data from './data.js';

/**
	 * @since      0.0.0
	 * Useful to get Country and Region Codes.
	 * All Parameters are processed to be slugified.
	 * If you know the Country or Region you are using should not contain a prefix
	 * use the methods getPrefixed... and the string will also be processed to remove it from the beggingin.
	 * Prefixes are also slugified.
	 */
class GetPlaceCode {
	/**
	 * @since      0.0.0
	 * @access     protected
	 * @param      {string}         string           Target string.
	 * @param      {string}         charToRemove     Character to remove from start and end of string. Default '_'.
	 * @return     {string}                          Returns processed string -> Eg. __trimChar("----New York--", "-") returns "New York"
	 */
	static __trimChar(/* String */ string, /* Char */ charToRemove = '_') {
		if (!charToRemove ||
			charToRemove.length === 0 ||
			charToRemove.length + 1 > 2 ||
			!this.__checkAllAreString(string, charToRemove)) {
			throw new TypeError('Expected string and char');
		}

		while (string.charAt(0) === charToRemove) {
			string = string.slice(1);
		}

		while (string.charAt(string.length - 1) === charToRemove) {
			string = string.slice(0, -1);
		}

		return string;
	}

	/**
	 * @since      0.0.0
	 * @access     protected
	 * @param      {string}         string        Target string.
	 * @param      {string}         sub           Initial substring (prefix) to be removed from target string.
	 * @return     {string}                       Returns processed string -> Eg. __removePrefix("New York", "New") returns "Ÿork"
	 */
	static __removePrefix(/* String */ string, /* String */ sub = '') {
		if (!this.__checkAllAreString(string, sub)) {
			throw new TypeError('Expected strings');
		}

		if (!sub) {
			return this.__slugify(string);
		}

		const reg = new RegExp(this.__slugify(sub), 'i');
		return this.__slugify(this.__slugify(string).replace(reg, ''));
	}

	/**
	 * @since      0.0.0
	 * @access     protected
	 * @param      {string}         string           Target string.
	 * @return     {string}                          Returns slugified string -> Eg. __slugify("ãAá   ExAmPle    - -- - _____") returns "aaa-example"
	 */
	static __slugify(/* String */ string) {
		if (!this.__checkAllAreString(string)) {
			throw new TypeError('Expected string');
		}

		const a =
			'àáâäæãåāăąçćčđďèéêëēėęěğǵḧĩîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:; -';
		const b =
			'aaaaaaaaaacccddeeeeeeeegghiiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz________';
		const p = new RegExp(a.split('').join('|'), 'g');

		return this.__trimChar(
			string
				.toString()
				.toLowerCase()
				.replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
				.replace(/&/g, '_and_') // Replace & with 'and'
				.replace(/[^\w-]+/g, '') // Remove all non-word characters
				.replace(/__+/g, '_')); // Replace multiple - with single -
	}

	/**
	 * @since      0.0.0
	 * @access     protected
	 * @param      {strings}         [args]           Multiple params are allowed.
	 * @return     {Boolean}                          Returns true if ALL parameters are string
	 */
	static __checkAllAreString(...args) {
		const invalidValues = new Set([undefined, null]);

		let i = 0;
		const {length} = args;
		for (i; i < length; i++) {
			if (invalidValues.has(args[i]) || typeof args[i] !== 'string') {
				return false;
			}
		}

		return true;
	}

	/**
	 * @since      0.0.0
	 * @access     public
	 * @param      {strings}         region           Region to be searched.
	 * @return     {string}                           Returns the region code.
	 */
	static getRegionCode(/* String */ region) {
		if (!region || !this.__checkAllAreString(region)) {
			throw new TypeError('Expected string');
		}

		const key = this.__slugify(region);
		return this.getData()._any[key] || region;
	}

	/**
	 * @since      0.0.2
	 * @access     public
	 * @param      {strings}         region           Region to be searched.
	 * @param      {strings}         prefix           Prefix to be removed from start of Region.
	 * @return     {string}                           Returns the region code.
	 */
	static getPrefixedRegionCode(/* String */ region, /* String */ prefix) {
		if (!prefix || !region || !this.__checkAllAreString(region, prefix)) {
			throw new TypeError('Expected strings');
		}

		let _region = region;
		if (prefix) {
			_region = this.__removePrefix(region, prefix);
		}

		const key = this.__slugify(_region);
		return this.getData()._any[key];
	}

	/**
	 * @since      0.0.1
	 * @access     public
	 * @param      {strings}         country           Country to be searched.
	 * @return     {string}                            Returns the country code.
	 */
	static getCountryCode(/* String */ country) {
		if (!country || !this.__checkAllAreString(country)) {
			throw new TypeError('Expected string');
		}

		const key = this.__slugify(country);
		return this.getData()[key]._short || country;
	}

	/**
	 * @since      0.0.1
	 * @access     public
	 * @param      {strings}         country           Country to be searched.
	 * @param      {strings}         prefix            Prefix to be removed from start of Country.
	 * @return     {string}                            Returns the country code.
	 */
	static getPrefixedCountryCode(/* String */ country, /* String */ prefix) {
		if (!prefix || !country || !this.__checkAllAreString(country, prefix)) {
			throw new TypeError('Expected strings');
		}

		let _country = country;
		if (prefix) {
			_country = this.__removePrefix(country, prefix);
		}

		const key = this.__slugify(_country);
		return this.getData()[key]._short;
	}

	/**
	 * @since      0.0.0
	 * @access     public
	 * @param      {strings}         country                 Country to be searched.
	 * @param      {strings}         region                  Region to be searched.
	 * @return     {string}                                  Returns the Region code.
	 */
	static getRegionCodeByCountry(/* String */ country, /* String */ region) {
		if (!country || !region || !this.__checkAllAreString(country, region)) {
			throw new TypeError('Expected strings');
		}

		const countryKey = this.__slugify(country);
		const regionKey = this.__slugify(region);
		return this.getData()[countryKey][regionKey];
	}

	/**
	 * @since      0.0.0
	 * @access     public
	 *
	 * @param      {strings}         country                 Country to be searched.
	 * @param      {strings}         region                  Region to be searched.
	 * @param      {strings}         countryPrefix           Prefix to be removed from start of Country.
	 * @param      {strings}         regionPrefix            Prefix to be removed from start of Region.
	 * @return     {string}                                  Returns the Region code.
	 */
	static getPrefixedRegionCodeByCountry(
		/* String */ country,
		/* String */ region,
		/* String */ countryPrefix,
		/* String */ regionPrefix) {
		if (!country ||
			!region ||
			!countryPrefix ||
			!regionPrefix ||
			!this.__checkAllAreString(country, region, countryPrefix, regionPrefix)) {
			throw new TypeError('Expected strings');
		}

		const _country =
			(countryPrefix && this.__removePrefix(country, countryPrefix)) || country;
		const _region =
			(regionPrefix && this.__removePrefix(region, regionPrefix)) || region;
		const countryKey = this.__slugify(_country);
		const regionKey = this.__slugify(_region);
		return this.getData()[countryKey][regionKey];
	}

	/**
	 * @since      0.0.0
	 * @access     public
	 * @return     {Object}                  Returns the full object data containing all countries and regions with slugified keys.
	 */
	static getData() {
		return data;
	}
}

export default GetPlaceCode;
