package keypair

import (
	"log"

	"fyne.io/fyne"
	"fyne.io/fyne/layout"
	"fyne.io/fyne/widget"
)

type textEdit struct {
	cursorRow, cursorCol *widget.Label
	entry                *widget.Entry
	window               fyne.Window
}

//Show loads keypair generator
func Show(app fyne.App) {
	window := app.NewWindow("Coindex Keypairs")

	submitButton := widget.NewButton("Submit", func() {
		log.Println("hello")
	})

	options := &widget.Select{
		PlaceHolder: "select asset type",
		Options:     []string{"ripple-XRP"},
	}

	options.OnChanged = func(selected string) {
		if selected == "ripple-XRP" {
			submitButton.Enable()
		}
	}
	if options.Selected != "ripple-XRP" {
		submitButton.Disable()
	}

	form := &widget.Form{
		Items: []*widget.FormItem{
			{Text: "Assets", Widget: options},
		},
	}

	formWidget := widget.NewVBox(
		form,
		submitButton,
	)

	content := fyne.NewContainerWithLayout(
		layout.NewCenterLayout(),
		formWidget,
	)

	window.SetContent(content)
	window.Resize(fyne.NewSize(480, 320))
	window.Show()
}
