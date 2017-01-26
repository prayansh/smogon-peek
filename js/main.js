/**
 * Created by Prayansh on 2016-12-21.
 */

function smogonHelper() {
    loadAbilities();
    // loadItems();
}

function loadAbilities() {
    // console.log('Finding Abilities');

    // Extract all DOM elements with ability lists
    var targetAbility = $x("//ul[@class='AbilityList']/li");

    var abilityDict = {};
    targetAbility.forEach(function (element, index) {
        var name = element.innerText.trim();

        //give element an id for future (Essential)
        element.id = name.charAt(0) + index;

        if (abilityDict[name] == undefined)
            abilityDict[name] = [];

        var abilityObj = {
            name: name,
            index: index
        };
        abilityDict[name].push(abilityObj);
        // Setup loading animation for each popover
        $('#' + name.charAt(0) + index).each(function () {
            var $elem = $(this);
            $elem.popover(popoverOptionsAbility($elem, abilityObj));
        });
    });


    // bind DOM with correct popovers
    for (var abilityName in abilityDict) {
        bindPopupsToAbility(abilityName, abilityDict[abilityName]);
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
    });
});

// configuration of the observer:
var config = {attributes: true, childList: true, characterData: true};

observer.observe(tBody[0], config);
observer.observe(tHead[0], config);

// Run smogonHelper once when reaches www.smogon.com/*
smogonHelper();