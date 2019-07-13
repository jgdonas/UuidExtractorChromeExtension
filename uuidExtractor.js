chrome.runtime.onMessage.addListener(function (mssg, sender, sendResponse) {
    if (mssg.txtt === "execute") {
        var firstComment = getFirstComment();
        var uuid = extractUUIDFromComment(firstComment);
        copyTextToClipboard(uuid);
    }
});


function getFirstComment() {
    var iterator = window.document.createNodeIterator(window.document.head, NodeFilter.SHOW_COMMENT);
    return iterator.nextNode().nodeValue
}

function extractUUIDFromComment(comment) {
    //uuid comment example:
    //< !--Methode uuid: "5132578e-7283-11e5-9f5a-5262b8329183" -- >
    var regex = /"(?<uuid>.*)"/i;
    var matches = comment.match(regex);
    return matches.groups.uuid;
}

//Thanks to: https://stackoverflow.com/questions/3436102/copy-to-clipboard-in-chrome-extension/18455088#18455088
function copyTextToClipboard(text) {
    //Create a textbox field where we can insert text to. 
    var copyFrom = document.createElement("textarea");

    //Set the text content to be the text you wished to copy.
    copyFrom.textContent = text;

    //Append the textbox field into the body as a child. 
    //"execCommand()" only works when there exists selected text, and the text is inside 
    //document.body (meaning the text is part of a valid rendered HTML element).
    document.body.appendChild(copyFrom);

    //Select all the text!
    copyFrom.select();

    //Execute command
    document.execCommand('copy');

    //(Optional) De-select the text using blur(). 
    copyFrom.blur();

    //Remove the textbox field from the document.body, so no other JavaScript nor 
    //other elements can get access to this.
    document.body.removeChild(copyFrom);
}


