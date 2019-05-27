package nc.redstone.opt.test;

import java.io.IOException;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.RepeatedTest;
import org.junit.jupiter.api.Test;

import com.itextpdf.text.DocumentException;

import freemarker.template.TemplateException;
import nc.redstone.opt.FreeMarkerBenchmark;
import nc.redstone.opt.ThymeleafBenchmark;

public class TemplateEnginesTests {

	/**
	@RepeatedTest(value = 10, name = "{displayName} : répétition {currentRepetition} / {totalRepetitions}")
	@DisplayName(value = "Test de rendu avec FreeMarker")
	*/
	@JUnit5Benchmark
	public void testFreemarkerTemplateEngine() throws TemplateException, IOException, DocumentException {
		FreeMarkerBenchmark fmb = new FreeMarkerBenchmark();
		fmb.setup();
		fmb.benchmark();
	}

	/**
	@RepeatedTest(value = 10, name = "{displayName} : répétition {currentRepetition} / {totalRepetitions}")
	@DisplayName(value = "Test de rendu avec Thymeleaf")
	*/
	@Test
	@JUnit5Benchmark
	public void testThymeleafTemplateEngine() throws IOException, DocumentException {
		ThymeleafBenchmark tlb = new ThymeleafBenchmark();
		tlb.setup();
		tlb.benchmark();
	}

}
