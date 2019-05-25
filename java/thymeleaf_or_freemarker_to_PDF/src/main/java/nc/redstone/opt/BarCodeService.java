package nc.redstone.opt;


import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Base64;

import javax.imageio.ImageIO;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.Writer;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;

public class BarCodeService {

	public String createBarCode(String data) {
		Writer barcodeWriter = new MultiFormatWriter();
		String result = null;
		try {
			BitMatrix barcodeBitMatrix = barcodeWriter.encode(data, BarcodeFormat.CODE_128, 238, 30);
			result = base64ImageEncode(MatrixToImageWriter.toBufferedImage(barcodeBitMatrix), "png");
		} catch (WriterException e) {
			// (...)
		}
		return result;
	}

	private String base64ImageEncode(BufferedImage image, String type) {

		String resultString = "data:image/png;base64,";

		try (ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
			ImageIO.write(image, type, baos);
			byte[] imageBytes = baos.toByteArray();
			resultString += Base64.getEncoder().encodeToString(imageBytes);
		} catch (IOException e) {
			// should return empty string or break the work in progress ?
		}

		return resultString;
	}

}
