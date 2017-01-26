/**
 * Created by Prayansh on 2016-12-21.
 */

function smogonHelper() {
    loadAbilities();
    loadItems();
}

function loadAbilities() {
    // Extract all DOM elements with ability lists
    var targetAbility = $x("//ul[@class='AbilityList']/li");

    var abilityDict = {};
    targetAbility.forEach(function (element, index) {
        var name = element.innerText.trim();

        //give element an id for future (Essential)
        element.id = 'A' + name.charAt(0) + index;

        if (abilityDict[name] == undefined)
            abilityDict[name] = [];

        var abilityObj = {
            name: name,
            index: index
        };
        abilityDict[name].push(abilityObj);
        // Setup loading animation for each popover
        $('#A' + name.charAt(0) + index).each(function () {
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
    var targetItem = $x("//ul[@class='ItemList']/li");

    var itemDict = {};
    targetItem.forEach(function (element, index) {
        var name = element.innerText.trim();

        //give element an id for future (Essential)
        element.id = 'I' + name.charAt(0) + index;

        if (itemDict[name] == undefined)
            itemDict[name] = [];

        var itemObj = {
            name: name,
            index: index
        };
        itemDict[name].push(itemObj);
        // Setup loading animation for each popover
        $('#I' + name.charAt(0) + index).each(function () {
            var $elem = $(this);
            $elem.popover(popoverOptionsAbility($elem, itemObj));
        });
    });

    // bind DOM with correct popovers
    for (var itemName in itemDict) {
        bindPopupsToItems(itemName, itemDict[itemName]);
    }
}

// Creating observers to detect changes in following DOM elements
var tBody = $x("//main[@data-reactid='.0.1']");
var tHead = $x("//h1[@data-reactid='.0.1.1.1']");

var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (_mutation) {
        smogonHelper();
    });
});

// configuration of the observer:
var config = {attributes: true, childList: true, characterData: true};

observer.observe(tBody[0], config);
observer.observe(tHead[0], config);

// Run smogonHelper once when reaches www.smogon.com/*
smogonHelper();