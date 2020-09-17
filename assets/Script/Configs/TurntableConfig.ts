
export default class TurntableConfig {
	
	public static readonly filed_data = {
		key_1: ["1", "gold", 200, 30],
		key_2: ["2", "energy", 10, 20],
		key_3: ["3", "gold", 500, 20],
		key_4: ["4", "energy", 15, 10],
		key_5: ["5", "gold", 800, 15],
		key_6: ["6", "energy", 20, 5],
		key_7: ["7", "gold", 1000, 0],
		key_8: ["8", "energy", 30, 0],
		total_count: 8
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
			probab: record_array[3]
		};

		return record;
	}

	public static getRandFunc(num: number) {
		let ranSum = 0;
		for(let i = 1; i <= num; i++) {
			ranSum += this.filed_data["key_" + i][3];
		}
		console.log(ranSum);
		return ranSum / 100;
	}

}
