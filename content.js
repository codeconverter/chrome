var baseUrl = 'https://codeconverter.net/';
//baseUrl = 'http://localhost:2283/'

function Convert(outputContainer, code) {
    $(outputContainer).prepend('<div style="width:100%;border-bottom: solid 1px #939393"><a href="#!">View PowerShell</a></div>');
    $(outputContainer).find("a").on("click", function () {
        $.post(baseUrl + 'api/csharp/powershell', {
            content: code,
            sourceTitle: document.title,
            sourceUrl: document.location.href
        }).done(function (data) {
            window.open(baseUrl + 'conversion/raw/' + data.sourceId + '/' + data.language);
        });
    });
}

function ConvertMsdn() {
    var snippets = $(".codeSnippetContainer");
    $.each(snippets, function( i, snippet) {
        var activeTab = $(snippet).find(".codeSnippetContainerTabActive");
        var selectedLanguage = $(activeTab).find("a");

        if (selectedLanguage.text() !== "C#") {
            return;
        }

        var codeContainer = $(snippet).find(".codeSnippetContainerCode");
        var csharp = codeContainer.text();

        Convert(codeContainer, csharp);
    });
}

function ConvertGitHub() {
    if (!document.location.href.endsWith(".cs"))
    {
        return;
    }

    var blobContent = $(".blob-wrapper.data.type-c");
    var code = "";
    var lines = $(blobContent).find(".blob-code");

    $.each(lines, function (i, line) {
        code += $(line).text() + "\r\n";
    });

    Convert(blobContent, code);
}


function ConvertStackOverflow() {
    var snippets = $(".lang-cs");
    $.each(snippets, function( i, snippet) {
        var codeContainer = $(snippet).find("code");
        var csharp = codeContainer.text();

        Convert(codeContainer, csharp);
    });
}

if (document.location.href.indexOf("https://msdn.microsoft.com") !== -1) {
    ConvertMsdn();
} else if (document.location.href.indexOf("https://github.com") !== -1 || 
        document.location.href.indexOf("https://gist.github.com"))
{
    ConvertGitHub();
}
 else {
    ConvertStackOverflow();
}