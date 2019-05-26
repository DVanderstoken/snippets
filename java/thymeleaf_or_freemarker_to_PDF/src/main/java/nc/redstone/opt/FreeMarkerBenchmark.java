package nc.redstone.opt;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.StringWriter;
import java.nio.file.FileSystems;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.openjdk.jmh.annotations.Benchmark;
import org.openjdk.jmh.annotations.Setup;
import org.xhtmlrenderer.pdf.ITextRenderer;

import com.itextpdf.text.DocumentException;

import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import freemarker.template.Version;

/**
 * This is a JUnit test which will generate a PDF using Flying Saucer and
 * Freemarker templates.
 * <p>
 * Simply run this test to generate the PDF.
 */
public class FreeMarkerBenchmark extends BaseBenchmark {

	private static final String UTF_8 = "UTF-8";
	public int max = 99999;
	private BarCodeService barcodeService;
	private BarGraphService barGraphService;
	private Configuration config;
	private XHTMLConverter xHTMLConverter;
	private Mock mock;

	@Setup
	public void setup() {
		this.barcodeService = new BarCodeService();
		this.barGraphService = new BarGraphService();

		config = new Configuration(new Version("2.3.28"));
		config.setClassForTemplateLoading(FreeMarkerBenchmark.class, "/templates/freemarker/");
		config.setDefaultEncoding(UTF_8);

		xHTMLConverter = new XHTMLConverter();
		
		mock = new Mock();
	}

	@Benchmark
	public void benchmark() throws TemplateException, IOException, DocumentException {

		Template tpl = config.getTemplate("template.ftl");

		Map<String, Object> params = new HashMap<String, Object>();

		params.put("barcode", barcodeService.createBarCode(UUID.randomUUID().toString()));
		params.put("graph", barGraphService.createBarGraph());
		params.put("datas", mock.getSimpleListOfData());

		StringWriter sw = new StringWriter();

		tpl.process(params, sw);

		String xHtml = xHTMLConverter.convertToXhtml(sw.toString());

		ITextRenderer renderer = new ITextRenderer();
		String baseUrl = FileSystems.getDefault().getPath("src", "main", "resources").toUri().toURL().toString();
		renderer.setDocumentFromString(xHtml, baseUrl);
		renderer.layout();

		OutputStream outputStream = new FileOutputStream("freemarkerPDFResult.pdf");
		renderer.createPDF(outputStream);
		outputStream.close();
	}

}
