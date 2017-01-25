/**
 * Created by Prayansh on 2016-12-21.
 */

function smogonHelper() {
    loadAbilities();
    loadItems();
}

function loadAbilities() {
    // console.log('Finding Abilities');
    var targetAbility,
        abilities = [];
    // Extract all DOM elements with ability lists
    targetAbility = $x("//ul[@class='AbilityList']/li");
    // Create ability object for each ability in page and create dummy popovers
    targetAbility.forEach(function (element, index) {
        var abilityName = element.innerText.trim();
        var abilityCode = abilityName.toLowerCase().replace(' ', '-');
        var ability = {
            name: abilityName,
            code: abilityCode,
            index: index
        };

        //give element an id for future (Essential)
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

function loadItems() {
    // console.log('Finding Items');
    var targetItem,
        items = [];
    // Extract all DOM elements with ability lists
    targetItem = $x("//ul[@class='ItemList']/li");
    // Create ability object for each ability in page and create dummy popovers
    targetItem.forEach(function (element, index) {
        var itemName = element.innerText.trim();
        var itemCode = itemName.toLowerCase().replace(' ', '-');
        var item = {
            name: itemName,
            code: itemCode,
            index: index
        };

        //give element an id for future (Essential)
        element.id = itemName.charAt(0) + index;

        // Setup loading animation for each popover
        $('#' + itemName.charAt(0) + index).each(function () {
            var $elem = $(this);
            $elem.popover(popoverOptionsAbility($elem, item));
        });

        items.push(item);
    });
    // bind DOM with correct popovers
    for (var i = 0; i < items.length; i++) {
        bindPopupsToItems(items[i]);
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