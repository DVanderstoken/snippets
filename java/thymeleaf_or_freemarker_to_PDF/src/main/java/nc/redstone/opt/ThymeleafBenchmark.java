package nc.redstone.opt;

import static org.thymeleaf.templatemode.TemplateMode.HTML;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.FileSystems;
import java.util.UUID;

import org.openjdk.jmh.annotations.Benchmark;
import org.openjdk.jmh.annotations.Setup;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import org.thymeleaf.templateresolver.ClassLoaderTemplateResolver;
import org.xhtmlrenderer.pdf.ITextRenderer;

import com.itextpdf.text.DocumentException;

/**
 * This is a JUnit test which will generate a PDF using Flying Saucer and
 * Thymeleaf templates.
 * <p>
 * Simply run this test to generate the PDF.
 */

public class ThymeleafBenchmark extends BaseBenchmark {

	private static final String OUTPUT_FILE = "thymeleafPDFResult.pdf";
	private static final String UTF_8 = "UTF-8";
	private BarCodeService barcodeService;
	private BarGraphService barGraphService;
	private ClassLoaderTemplateResolver templateResolver;
	private TemplateEngine templateEngine;
	private Context context;
	private XHTMLConverter xHTMLConverter;
	private Mock mock;

	@Setup
	public void setup() {
		this.barcodeService = new BarCodeService();
		this.barGraphService = new BarGraphService();

		templateResolver = new ClassLoaderTemplateResolver();
		templateResolver.setPrefix("/templates/thymeleaf/");
		templateResolver.setSuffix(".html");
		templateResolver.setTemplateMode(HTML);
		templateResolver.setCharacterEncoding(UTF_8);

		templateEngine = new TemplateEngine();
		templateEngine.setTemplateResolver(templateResolver);

		context = new Context();

		xHTMLConverter = new XHTMLConverter();

		mock = new Mock();

	}

	@Benchmark
	public void benchmark() throws IOException, DocumentException {

		context.setVariable("barcode", barcodeService.createBarCode(UUID.randomUUID().toString()));
		context.setVariable("graph", barGraphService.createBarGraph());
		context.setVariable("datas", mock.getSimpleListOfData());

		String renderedHtmlContent = templateEngine.process("template", context);

		String xHtml = xHTMLConverter.convertToXhtml(renderedHtmlContent);

		ITextRenderer renderer = new ITextRenderer();
		String baseUrl = FileSystems.getDefault().getPath("src", "main", "resources").toUri().toURL().toString();
		renderer.setDocumentFromString(xHtml, baseUrl);
		renderer.layout();

		OutputStream outputStream = new FileOutputStream(OUTPUT_FILE);
		renderer.createPDF(outputStream);
		outputStream.close();
	}

}
