var imageWasSelected = false;

window.onload = function (e) {
	var loadimg = document.getElementById("loadimg");

	var saveimg = document.getElementById("saveimg");

	var opacityslider = document.getElementById("opacityslider");
	var bgimg = document.getElementById("bgimg");


	loadimg.onchange = loadImg;

	saveimg.onclick = saveImg;

	opacityslider.oninput = function (e) {
		bgimg.style.opacity = opacityslider.value;
	}

	generatePalette();
}

function loadImg() {
	var loadimg = document.getElementById("loadimg");
	var bgimg = document.getElementById("bgimg");

	var fReader = new FileReader();
	fReader.readAsDataURL(loadimg.files[0]);
	fReader.onloadend = function (event) {
		bgimg.src = event.target.result;
	}

	imageWasSelected = true;
}

function saveImg() {
	if (!imageWasSelected) {
		saveimg.innerHTML = "Veuillez sélectionner une image de fond.";
		saveimg.style.color = "lightcoral";

		return
	}

	var filename = document.getElementById("filename");

	if (filename.value.trim().length == 0) {
		saveimg.innerHTML = "Veuillez entrer un nom pour le fichier.";
		saveimg.style.color = "lightcoral";

		return
	}

	saveimg.innerHTML = "Disponible comme " + filename.value + " dans Téléchargements.";
	saveimg.style.color = "lightgreen";

	html2canvas(document.getElementById("preview")).then(function (canvas) {
		var newCanvas = document.createElement("canvas")
		newCanvas.width = 340;
		newCanvas.height = 340;

		context = newCanvas.getContext("2d");
		context = context.drawImage(canvas, 0, 0, 340, 340);

		newCanvas.toBlob(function (blob) {
			saveAs(blob, filename.value + ".png");
		})
	})
}

String.prototype.format = function () {
	var a = this;
	for (var k in arguments) {
		a = a.replace(new RegExp("\\{" + k + "\\}", 'g'), arguments[k]);
	}
	return a
}

function generatePalette() {
	var palettediv = document.getElementById("palette");

	var buttonhtml = `<button onclick="document.getElementById('preview').style.backgroundColor = '{0}'" style="background-color: {0};"></button>`;

	var colors = [
		"#1abc9c",
		"#2ecc71",
		"#3498db",
		"#9b59b6",
		"#34495e",
		"#f1c40f",
		"#e67e22",
		"#e74c3c",
		"#ecf0f1",
		"#95a5a6"
	]

	function createElementFromHTML(htmlString) {
		var div = document.createElement('div');
		div.innerHTML = htmlString.trim();

		// Change this to div.childNodes to support multiple top-level nodes
		return div.firstChild;
	}

	for (let color of colors) {
		palettediv.appendChild(createElementFromHTML(buttonhtml.format(color)));
	}
}