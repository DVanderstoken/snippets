package nc.redstone.opt;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class Mock {

	public List<String> getSimpleListOfData() {
		List<String> result = new ArrayList<String>();
		for (int i = 0; i < 100; i++) {
			result.add(String.format("%03d", i) + " - " + UUID.randomUUID().toString());
		}
		return result;
	}

}
