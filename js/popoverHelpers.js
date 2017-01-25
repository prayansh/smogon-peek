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
function makePopover(description, shortDesc, extra) {
    var descDiv = individualDiv('description', 'Description', description);
    var shortDiv = individualDiv('shortDescription', 'Description', shortDesc);
    // Hide long description and display short Description
    descDiv.style.display = 'none';
    shortDiv.style.display = 'block';

    var toggleExpand = document.createElement('div');
    toggleExpand.className = 'toggle';
    toggleExpand.innerText = 'Read More';
    toggleExpand.onclick = function () {
        if (descDiv.style.display == 'block') {
            descDiv.style.display = 'none';
            shortDiv.style.display = 'block';
            toggleExpand.innerText = 'Read More';
        }

        else if (shortDiv.style.display == 'block') {
            descDiv.style.display = 'block';
            shortDiv.style.display = 'none';
            toggleExpand.innerText = 'Read Less';
        }
    };
    var popoverElement = document.createElement('div');
    if (extra) {
        var genDiv = individualDiv('extra', extra);
        popoverElement.appendChild(genDiv);
    }
    popoverElement.appendChild(descDiv);
    popoverElement.appendChild(shortDiv);
    popoverElement.appendChild(toggleExpand);

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