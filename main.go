package main

import (
	"log"

	"fyne.io/fyne"
	"fyne.io/fyne/app"
	"fyne.io/fyne/layout"
	"fyne.io/fyne/widget"
)

func main() {
	myApp := app.New()
	myWindow := myApp.NewWindow("Coindex Keypair")
	combo := widget.NewSelect([]string{"Option 1", "Option 2"}, func(value string) {
		log.Println("Select set to", value)
	})
	content := widget.NewVBox(
		widget.NewLabel("The top row of VBox"),
		widget.NewHBox(
			widget.NewLabel("Label 1"),
			combo))

	grid := fyne.NewContainerWithLayout(layout.NewFixedGridLayout(fyne.NewSize(550, 300)), content)
	myWindow.SetContent(grid)

	//	myWindow.Resize(fyne.NewSize(180, 75))
	myWindow.ShowAndRun()
}
