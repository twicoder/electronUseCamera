const electron = require('electron')

const { app } = electron

module.exports = mainWindow => {
    const name = app.getName()
    const tempalte = [
        {
            label: name,
            submenu: [
                {
                    label: 'About' + name,
                    role: 'about'
                },
                { type: 'separator' },
                {
                    label: 'Hide ' + name,
                    role: 'hide'
                },
                {
                    label: 'Quit',
                    click: _ => {
                        app.quit()
                    }
                }
            ]
        }
    ]

    return tempalte

}