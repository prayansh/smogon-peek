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

function xhrRequest(ability) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", abilityAPIUrl(abilities[i].code), true);
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
                } else {
                    var gen = response.generation.name;
                    var pokemon = [];
                    response.pokemon.forEach(function (p) {
                        pokemon.push(p.pokemon.name);
                    });
                    var entry = response.effect_entries[0];
                    var desc = entry.effect;
                    var shortDesc = entry.short_effect;
                    var popoverContent = makePopover(desc, abilityUrl(ability.code));
                    $('#' + ability.name.charAt(0) + ability.index).each(function () {
                        var $elem = $(this);
                        $elem.data('bs.popover').options.content = popoverContent;
                    });
                    // todo add short desc with button for long one - eg Drought
                    // todo add gen and pokemon info to popover
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
            var response = JSON.parse(responseText);
            if (response.detail == "Not found.") {
                $('#' + ability.name.charAt(0) + ability.index).each(function () {
                    var $elem = $(this);
                    $elem.data('bs.popover').options.content = popoverTextContentDiv('Ability Not Found');
                });
            } else {
                var gen = response.generation.name;
                var pokemon = [];
                response.pokemon.forEach(function (p) {
                    pokemon.push(p.pokemon.name);
                });
                var entry = response.effect_entries[0];
                var desc = entry.effect;
                var shortDesc = entry.short_effect;
                var popoverContent = makePopover(desc, abilityUrl(ability.code)); // todo change name to desc
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

function bindPopupsToAbility(restUrl, ability) {
    xhrRequest(restUrl, ability);
    chrome.runtime.sendMessage('showPageAction');
}