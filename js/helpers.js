/**
 * Created by Prayansh on 2016-12-21.
 */

function itemAPIUrl(move_name) {
    return 'http://pokeapi.co/api/v2/item/' + move_name;
}

function abilityAPIUrl(searchQuery) {
    return 'http://pokeapi.co/api/v2/ability/' + searchQuery;
}

function getCodeForm(string) {
    return string.toLowerCase().replace(' ', '-');
}

//find by xpath
function $x(path) {
    var result = document.evaluate(path, document, null, XPathResult.ANY_TYPE, null);
    var xnodes = [];
    var xres;
    while (xres = result.iterateNext()) {
        xnodes.push(xres);
    }

    return xnodes;
}

/**
 * Makes AJAX Request to {@param restUrl}
 * @param restUrl
 * @param onSuccess - successHandler
 * @param onError - errorHandler
 */
function ajaxRequest(restUrl, onSuccess, onError) {
    $.ajax({
        type: 'GET',
        url: restUrl,
        dataType: 'JSON',
        success: onSuccess,
        error: onError
    });
}

/**
 *
 * @param abilityName - name of the ability
 * @param abilityElements - list of abilities with name and element
 * each element looks like
 *  abilityObj = {
 *           name: name,
 *           element: element,
 *           index: index
 *  };
 */
function bindPopupsToAbility(abilityName, abilityElements) {
    var successHandler = function (responseText) {
        if (responseText.detail == "Not found.") {
            abilityElements.forEach(function (item) {
                $('#A' + item.name.charAt(0) + item.index).each(function () {
                    var $elem = $(this);
                    $elem.data('bs.popover').options.content = popoverTextContentDiv('Ability Not Found');
                });
            });
        }
        else {
            var gen = (responseText.generation.name).replace('generation-', 'gen-');

            var entry = responseText.effect_entries[0];
            var desc = entry.effect;
            var shortDesc = entry.short_effect;
            var popoverContent = makePopover(desc, shortDesc, gen);

            abilityElements.forEach(function (item) {
                $('#A' + item.name.charAt(0) + item.index).each(function () {
                    var $elem = $(this);
                    $elem.data('bs.popover').options.content = popoverContent;
                });
            });
        }
    };
    var errorHandler = function () {
        abilityElements.forEach(function (item) {
            $('#A' + item.name.charAt(0) + item.index).each(function () {
                var $elem = $(this);
                $elem.data('bs.popover').options.content = popoverTextContentDiv('Ability Not Found (API Error)');
            });
        });
    };
    ajaxRequest(abilityAPIUrl(getCodeForm(abilityName)), successHandler, errorHandler);
    chrome.runtime.sendMessage('showPageAction');
}

function bindPopupsToItems(itemName, itemElements) {
    var itemSuccess = function (responseText) {
        if (responseText.detail === "Not found.") {
            itemElements.forEach(function (item) {
                $('#I' + item.name.charAt(0) + item.index).each(function () {
                    var $elem = $(this);
                    $elem.data('bs.popover').options.content = popoverTextContentDiv('Item Not Found');
                });
            });
        }
        else {
            var entry = responseText.effect_entries[0];
            var desc = (entry) ? entry.effect : "";
            var shortDesc = (entry) ? entry.short_effect : "";
            var category = responseText.category.name;
            var popoverContent = makePopover(desc, shortDesc, category);
            itemElements.forEach(function (item) {
                $('#I' + item.name.charAt(0) + item.index).each(function () {
                    var $elem = $(this);
                    $elem.data('bs.popover').options.content = popoverContent;
                });
            });
        }
    };
    var itemError = function () {
        itemElements.forEach(function (item) {
            $('#I' + item.name.charAt(0) + item.index).each(function () {
                var $elem = $(this);
                $elem.data('bs.popover').options.content = popoverTextContentDiv('Item Not Found (API Error)');
            });
        });
    };
    ajaxRequest(itemAPIUrl(getCodeForm(itemName)), itemSuccess, itemError);
    chrome.runtime.sendMessage('showPageAction');
}