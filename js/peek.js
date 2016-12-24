/**
 * Created by Prayansh on 2016-12-21.
 */
var targetAbility,
    abilities = [];

targetAbility = $x("//ul[@class='AbilityList']/li");
targetAbility.forEach(function (element, index) {
    var abilityName = element.innerText;
    var abilityCode = abilityName.toLowerCase().replace(' ', '-');
    var ability = {
        name: abilityName,
        code: abilityCode
    }
    var elementLink = element.childNodes[0].attr('href');
    // TODO check if actually required
    // var profDiv = '<a id="' + prof.lastName.charAt(0) + prof.targetNum + '" href="' + targetLink + '" target="_blank" data-toggle="popover">' +
    //     target[prof.targetNum].innerText + '</a>';
    //
    // target[prof.targetNum].outerHTML = profDiv;

    $('#' + abilityName.charAt(0) + index).each(function () {
        var $elem = $(this);
        $elem.popover(popoverOptionsAbility($elem, ability));
    });

    abilities.push(ability);
})

for (var i = 0; i < abilities.length; i++) {
    var searchUrl = ubcSearchUrl(abilities[i].code);
    bindPopupsToAbility(searchUrl, abilities[i]);
}

function ubcSearchUrl(searchQuery) {
    return 'http://pokeapi.co/api/v2/ability/' + searchQuery;
}