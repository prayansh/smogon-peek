/**
 * Created by Prayansh on 2016-12-21.
 */

function smogonHelper() {
    // console.log('Creating popups');
    var targetAbility,
        abilities = [];
    // Extract all DOM elements with ability lists
    targetAbility = $x("//ul[@class='AbilityList']/li");
    // Create ability object for each ability in page and create dummy popovers
    targetAbility.forEach(function (element, index) {
        var abilityName = element.innerText;
        var abilityCode = abilityName.toLowerCase().replace(' ', '-');
        var ability = {
            name: abilityName,
            code: abilityCode,
            index: index
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
    // bind DOM with correct popovers
    for (var i = 0; i < abilities.length; i++) {
        bindPopupsToAbility(abilities[i]);
    }
}

// Creating observers to detect changes in following DOM elements
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

observer.observe(tBody[0], config);
observer.observe(tHead[0], config);

// Run smogonHelper once when reaches www.smogon.com/*
smogonHelper();