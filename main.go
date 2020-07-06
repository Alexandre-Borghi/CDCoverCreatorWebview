package main

import (
	"github.com/zserge/webview"

	"github.com/kardianos/osext"
)

func check(e error) {
	if e != nil {
		panic(e)
	}
}

func main() {
	executablePath, _ := osext.ExecutableFolder()

	debug := true
	w := webview.New(debug)
	defer w.Destroy()
	w.SetTitle("Création de couverture pour CD")
	w.SetSize(1024, 768, webview.HintFixed)
	w.Navigate("file://" + executablePath + "/index.html")
	w.Run()
}
