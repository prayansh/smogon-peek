/*
 * HELPER CLASS FOR ALL METHODS RELATED TO CREATING/DISPLAYING
 * THE RATINGS POPOVERS
 * */

function popoverOptionsAbility($elem, ability, placement) {
    if (!placement) {
        placement = 'right';
    }
    return {
        trigger: 'hover',
        html: true,
        container: $elem,
        placement: placement,
        title: ability.name,
        content: popoverTextContentDiv('Loading...'),
        template: '<div class="popover size inactive-link" onclick="return false" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    };
}


/**
 *
 * @param description of item/ability
 * @param smogonUrl of item/ability using abilityUrl()/itemUrl()
 * @returns {Element}
 */
function makePopover(description, smogonUrl, gen) {

    var genDiv = individualDiv('gen', gen);
    var descDiv = individualDiv('description', 'Description', description);

    var smogonDiv = document.createElement('div');
    smogonDiv.className = 'smogon-link';
    smogonDiv.innerHTML = '<a href="' + smogonUrl + '" onclick="window.open(\'' + smogonUrl + '\', \'_blank\')">GOTO</a>';

    var popoverElement = document.createElement('div');
    popoverElement.appendChild(genDiv);
    popoverElement.appendChild(descDiv);
    // popoverElement.appendChild(smogonDiv);

    return popoverElement;
}

function individualDiv(mainClass, title, value) {

    var parentDiv = document.createElement('div');
    var titleDiv = document.createElement('div');
    if (value)
        var valueDiv = document.createElement('div');

    parentDiv.className = mainClass;
    titleDiv.className = 'title';
    if (value)
        valueDiv.className = 'value';

    titleDiv.innerText = title;
    if (value)
        valueDiv.innerText = value;

    if (value)
        titleDiv.appendChild(valueDiv);
    parentDiv.appendChild(titleDiv);

    return parentDiv;
}

function popoverTextContentDiv(text) {
    var div = document.createElement('div');
    div.className = 'popover-plain-text';
    div.innerText = text;

    return div;
}