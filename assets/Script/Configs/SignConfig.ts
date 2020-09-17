/** SignConfig filed desic: (3 fileds)
	id: int
	type: string
	number: int
*/

export default class SignConfig {

	public static readonly filed_data = {
		key_1: [1, "gold", 500,],
		key_2: [2, "gold", 2000,],
		key_3: [3, "gold", 2500,],
		key_4: [4, "gold", 3000,],
		key_5: [5, "gold", 4000,],
		key_6: [6, "gold", 5000,],
		key_7: [7, "gold", 10000,],
		total_count: 7
	};

	public static get_record(id) {
		let key = "key_" + id;
		let record_array = this.filed_data[key];
		if (!record_array) {
			return null;
		}

		let record = {
			id: record_array[0],
			type: record_array[1],
			number: record_array[2],
		};

		return record;
	}

}
