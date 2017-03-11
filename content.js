var baseUrl = 'https://codeconverter.net/';

function Convert(outputContainer, code) {
    $(outputContainer).prepend('<div class="powershellblk"><a href="#!" class="powershellbtn powershellbtn-primary">View as PowerShell</a></div>');
    $(outputContainer).find("a").on("click", function () {
        $.post(baseUrl + 'api/csharp/powershell', {
            content: code
        }).done(function (data) {
            window.open(baseUrl + 'conversion/' + data.conversionId);
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

function ConvertPinvokeNet() {
    var snippets = $("h4:contains('C# Signature:')").next();
    $.each(snippets, function( i, snippet) {
        Convert(snippet, $(snippet).text());
    });
}

$(document).ready(function() {
    if (document.location.href.indexOf("https://msdn.microsoft.com") !== -1) {
        ConvertMsdn();
    } else if (document.location.href.indexOf("https://github.com") !== -1 || 
            document.location.href.indexOf("https://gist.github.com") !== -1)
    {
        ConvertGitHub();
    } else if (document.location.href.indexOf("http://pinvoke.net") !== -1) {
        ConvertPinvokeNet();
    }
    else {
        ConvertStackOverflow();
    }
});

