<#ftl output_format="HTML">
<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="utf-8" />
    <meta http-equiv="x-ua-compatible" content="ie=edge" />
    <meta name="viewport" content="width=210mm, intial-scale=1" />
    <link rel="stylesheet" type="text/css" media="all" href="static/styles/style.css" />
    <link rel="stylesheet" type="text/css" media="all" href="static/styles/graph.css" />
</head>

<body>

	<h1>Exemple FREEMARKER</h1>

	<div class="barcode-container">
		<table>
			<tr>
				<td class="right"><img class="barcode" src="${barcode}" alt="barcode"/></td>
			</tr>
		</table>
	</div>

	<div class="bar-chart-container">
		<table>
			<tr>
				<td class="right"><img class="bar-chart" src="${graph}" alt="graph"/></td>
			</tr>
		</table>
	</div>
	

	<#include "address.ftl">


	<#include "footer.ftl">

	<div class="next-page">

		<h2>Détail de la facture</h2>

	</div>

	<#include "footer.ftl">
</body>

</html>