/**
 * Created by Prayansh on 2016-12-21.
 */

function baseSmogonUrl() {
    return 'http://www.smogon.com/dex/xy/';
}

function abilityUrl(ability) {
    return baseSmogonUrl() + 'ability/' + ability.replace('-', '_');
}

function movesUrl(move) {
    return baseSmogonUrl() + 'moves/' + move.replace('-', '_');
}

function itemUrl(item) {
    return baseSmogonUrl() + 'items/' + item.replace('-', '_');
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

function bindPopupsToAbility(searchUrl, ability) {
    //TODO get api response from pokeapi
    // example http://pokeapi.co/api/v2/ability/blaze
    // implement how to get the api response and parse the valuable information
    // Information like - generation, list of pokemon, description, short description
    // go to http://pokeapi.co/api/v2/ability/blaze to check out sample output
}