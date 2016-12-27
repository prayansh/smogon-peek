/**
 * Created by Prayansh on 2016-12-21.
 */

function smogonHelper() {
    // console.log('Creating popups');
    var targetAbility,
        abilities = [];

    targetAbility = $x("//ul[@class='AbilityList']/li");
    targetAbility.forEach(function (element, index) {
        var abilityName = element.innerText;
        var abilityCode = abilityName.toLowerCase().replace(' ', '-');
        var ability = {
            name: abilityName,
            code: abilityCode,
            index: index,
            div: element
        };
        //give element an id for future
        element.id = abilityName.charAt(0) + index;

        // Setup loading animation for each popover
        $('#' + abilityName.charAt(0) + index).each(function () {
            var $elem = $(this);
            $elem.popover(popoverOptionsAbility($elem, ability));
        });

        abilities.push(ability);
    });

    for (var i = 0; i < abilities.length; i++) {
        bindPopupsToAbility(abilities[i]);
    }
}

var tBody = $x("//main[@data-reactid='.0.1']");
var tHead = $x("//h1[@data-reactid='.0.1.1.1']");

var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        smogonHelper();
        // console.log('something changed');
    });
});

// configuration of the observer:
var config = {attributes: true, childList: true, characterData: true};

// pass in the target node, as well as the observer options
observer.observe(tBody[0], config);
observer.observe(tHead[0], config);

smogonHelper();