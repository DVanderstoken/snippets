package nc.redstone.opt;


import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Base64;
import java.util.Random;

import javax.imageio.ImageIO;

import org.jfree.chart.ChartFactory;
import org.jfree.chart.JFreeChart;
import org.jfree.chart.plot.PlotOrientation;
import org.jfree.data.category.CategoryDataset;
import org.jfree.data.general.DatasetUtils;

public class BarGraphService {

	public String createBarGraph() throws IOException {
		String result = "data:image/png;base64,";
		Random random = new Random();
		final double[][] datas = new double[][] {
				{ random.nextInt(99999), random.nextInt(99999), random.nextInt(99999), random.nextInt(99999),
						random.nextInt(99999), random.nextInt(99999) },
				{ random.nextInt(99999), random.nextInt(99999), random.nextInt(99999), random.nextInt(99999),
						random.nextInt(99999), random.nextInt(99999) } };
		CategoryDataset dataset = DatasetUtils.createCategoryDataset("", "", datas);
		JFreeChart chart = ChartFactory.createBarChart("", null, null, dataset, PlotOrientation.VERTICAL, false, false,
				false);

		BufferedImage image = chart.createBufferedImage(287, 144);

		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		ImageIO.write(image, "png", baos);
		result = result + Base64.getEncoder().encodeToString(baos.toByteArray());
		return result;
	}

}
