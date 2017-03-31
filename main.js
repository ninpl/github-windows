var webview = document.getElementById('main');
var bullet = document.getElementById('drag');
var extID = 'ppibnbapebejhnmplokgfhijhfdchhhx';
var appID = 'gkcknpgdmiigoagkcoglklgaagnpojex';
var insert_style = '.window-overlay::-webkit-scrollbar{height:33px;width:33px}.window-overlay::-webkit-scrollbar-thumb{min-height:50px;background:rgba(255,255,255,1);border-radius:17px;border:10px solid transparent;background-clip:padding-box}.window-overlay::-webkit-scrollbar-track-piece{background:rgba(0,0,0,.5);border:10px solid transparent;background-clip:padding-box}.window-overlay::-webkit-scrollbar-track-piece:vertical:start{border-radius:17px 17px 0 0}.window-overlay::-webkit-scrollbar-track-piece:vertical:end{border-radius:0 0 17px 17px}';

chrome.storage.sync.get(function(items) 
{
    if (items.showFrame !== undefined) 
    {
        frame = items.showFrame;
    }
    if (frame == 'chrome') 
    {
        bullet.style.display = 'none';
    } 
    else 
    {
        insert_style += '.header-btn.header-boards,.promo-nav{margin-left:38px!important}';
    }
});

webview.addEventListener('loadcommit', function(e) 
{
    if (e.isTopLevel) 
    {
        webview.insertCSS({ code: insert_style, runAt: 'document_start' });
    }
});

webview.addEventListener('newwindow', function(e) 
{
    e.stopImmediatePropagation();
    window.open(e.targetUrl);
});

window.addEventListener('keydown', function(e) 
{
    // Ctrl+R / F5
    if (e.ctrlKey && e.keyCode == 82 || e.keyCode == 115) 
    {
        webview.reload();
    }

    // F11
    if (e.keyCode == 122) 
    {
        if (chrome.app.window.current().isFullscreen()) 
        {
            chrome.app.window.current().restore();
        } 
        else 
        {
            chrome.app.window.current().fullscreen();
        }
    }

    if (e.ctrlKey && e.shiftKey && e.keyCode == 70) 
    {
        chrome.storage.sync.get(function(items) 
        {
            if (items.showFrame === undefined || items.showFrame === 'none') 
            {
                frame = 'chrome';
            } 
            else 
            {
                frame = 'none';
            }

            chrome.storage.sync.set({ showFrame: frame });
        });

        setTimeout(function()
        {
            chrome.runtime.reload();
        }, 500);
    }
});

window.addEventListener('focus', function(e) 
{
    webview.focus();
});

webview.addEventListener('permissionrequest', function(e) 
{
    if (e.permission === 'download') 
    {
        e.request.allow();
    }
});

chrome.runtime.onMessage.addListener(function(request, sender) 
{
    if (sender.id == appID) 
    {
        webview.src = request;
    }
});