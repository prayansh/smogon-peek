/**
 * Created by Prayansh on 2016-12-21.
 */

function baseSmogonUrl() {
    return 'http://www.smogon.com/dex/xy/';
}

function abilityUrl(ability) {
    return baseSmogonUrl() + 'abilities/' + ability.replace('-', '_');
}

function movesUrl(move) {
    return baseSmogonUrl() + 'moves/' + move.replace('-', '_');
}

function itemUrl(item) {
    return baseSmogonUrl() + 'items/' + item.replace('-', '_');
}

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
 * Makes a XMLHttpRequest to PokeApi REST API using ability.code
 * @param ability
 */
function xhrRequest(ability) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", abilityAPIUrl(ability.code), true);
    xhr.onreadystatechange = function (oEvent) {
        if (xhr.readyState === 4) {
            // If rest call is good
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                if (response.detail == "Not found.") {
                    $('#' + ability.name.charAt(0) + ability.index).each(function () {
                        var $elem = $(this);
                        $elem.data('bs.popover').options.content = popoverTextContentDiv('Ability Not Found');
                    });
                }
                else {
                    var gen = (response.generation.name).replace('generation-', 'gen-');

                    var pokemon = [];
                    response.pokemon.forEach(function (p) {
                        pokemon.push(p.pokemon.name);
                    });
                    //todo add pokemon to description???

                    var entry = response.effect_entries[0];
                    var desc = entry.effect;
                    var shortDesc = entry.short_effect;

                    var popoverContent = makePopover(desc, shortDesc, abilityUrl(ability.code), gen);

                    $('#' + ability.name.charAt(0) + ability.index).each(function () {
                        var $elem = $(this);
                        $elem.data('bs.popover').options.content = popoverContent;
                    });
                }
            } else {
                console.log('Error', xhr.statusText);
                $('#' + ability.name.charAt(0) + ability.index).each(function () {
                    var $elem = $(this);
                    $elem.data('bs.popover').options.content = popoverTextContentDiv('Ability Not Found');
                });
            }
        }
    };
    xhr.send();
}

// TODO find what the problem here is
// Deprecated
function ajaxRequest(restUrl, ability) {
    $.ajax({
        type: 'GET',
        url: restUrl,
        dataType: 'JSON',
        success: function (responseText) {
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

                var popoverContent = makePopover(desc, shortDesc, abilityUrl(ability.code), gen);

                $('#' + ability.name.charAt(0) + ability.index).each(function () {
                    var $elem = $(this);
                    $elem.data('bs.popover').options.content = popoverContent;
                });
            }
        },
        error: function () {
            $('#' + ability.name.charAt(0) + ability.index).each(function () {
                var $elem = $(this);
                $elem.data('bs.popover').options.content = popoverTextContentDiv('Ability Not Found');
            });
        }
    });
}

function bindPopupsToAbility(ability) {
    ajaxRequest(abilityAPIUrl(ability.code), ability);
    chrome.runtime.sendMessage('showPageAction');
}