var nid = 'main';
var ctd = false;
var extID = 'ppibnbapebejhnmplokgfhijhfdchhhx';
var appID = 'gkcknpgdmiigoagkcoglklgaagnpojex';
var frame = 'none';

// Opciones
chrome.storage.sync.get(function(items) 
{
    if (items.showFrame !== undefined) 
    {
        frame = items.showFrame;
    }
});

// Main
var app = function() 
{
    chrome.app.window.create('index.html',
        {
            id: 'mainWindow',
            innerBounds: { width: 960, height: 600 },
            frame: { type: frame },
            resizable: true
        }, function(e) { }
    );
}

// Cuando se ejecuta la app
chrome.app.runtime.onLaunched.addListener(function() 
{
    app();
});

// Cuando se reinicia la app
chrome.app.runtime.onRestarted.addListener(function() 
{
    app();
});

// Cache Web
chrome.runtime.onMessageExternal.addListener(function(request, sender) 
{
    if (sender.id == extID) 
    {
        chrome.runtime.sendMessage(appID, request);
    }
});