import { v4 as uuidv4 } from 'uuid';

const INITIAL_STATE_TASK = {
	tasks: [
		{
			id: uuidv4(),
			name: "Stend up",
			lastDateToRealization: new Date().toISOString().split("T")[0],
			complated: false,
		}
	]
}

export default INITIAL_STATE_TASK