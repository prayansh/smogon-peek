/**
 * Created by Prayansh on 2016-12-21.
 */

function abilityAPIUrl(searchQuery) {
    return 'http://pokeapi.co/api/v2/ability/' + searchQuery;
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

function bindPopupsToAbility(ability) {
    var successHandler = function (responseText) {
        if (responseText.detail == "Not found.") {
            $('#' + ability.name.charAt(0) + ability.index).each(function () {
                var $elem = $(this);
                $elem.data('bs.popover').options.content = popoverTextContentDiv('Ability Not Found');
            });
        }
        else {
            var gen = (responseText.generation.name).replace('generation-', 'gen-');

            var pokemon = [];
            responseText.pokemon.forEach(function (p) {
                pokemon.push(p.pokemon.name);
            });
            //todo add pokemon to description???

            var entry = responseText.effect_entries[0];
            var desc = entry.effect;
            var shortDesc = entry.short_effect;

            var popoverContent = makePopover(desc, shortDesc, gen);

            $('#' + ability.name.charAt(0) + ability.index).each(function () {
                var $elem = $(this);
                $elem.data('bs.popover').options.content = popoverContent;
            });
        }
    };
    var errorHandler = function () {
        $('#' + ability.name.charAt(0) + ability.index).each(function () {
            var $elem = $(this);
            $elem.data('bs.popover').options.content = popoverTextContentDiv('Ability Not Found');
        });
    };
    ajaxRequest(abilityAPIUrl(ability.code), successHandler, errorHandler);
    chrome.runtime.sendMessage('showPageAction');
}