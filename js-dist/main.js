"use strict";

// HELPER FUNCTION :: select single element from DOM

function getSingleDOMelement(element) {
    return document.querySelector(element);
}

// HELPER FUNCTION :: select all same elements from DOM
function getAllDOMelement(element) {
    return document.querySelectorAll(element);
}

// HELPER FUNCTION :: add stylesheet in element
function addStylesheet(element, styleSheet) {
    return element.style.cssText = styleSheet;
};

// SELECT ELEMENTS
var selectOptionContainer = getSingleDOMelement('.select-option');
var selectedItemWrap = getSingleDOMelement('.select-option__selected');
var selectedItem = getSingleDOMelement('.select-option__selected-item');
var selectOptionWrapper = getSingleDOMelement('.select-option__wrapper');
var optionLists = getSingleDOMelement('.select-option__list');
var listItems = getAllDOMelement('.select-option__list-item');

//ARRAY FOR STORE ELEMENT ID
var listItemIds = [];

// GET KEYBOARD KEY CODE 
var enterKeyCode = 13;
var spaceKeyCode = 32;
var upArrowKeyCode = 38;
var leftArrowKeyCode = 37;
var rightArrowKeyCode = 39;
var downArrowKeyCode = 40;
var escapeKeyCode = 27;

//ADD STYLESHEET AND ATTRIBUTES

(function () {
    // if list items are more than 7 then fixed the height and add vertical scroll bar 
    if (listItems.length > 7) {
        addStylesheet(selectOptionWrapper, "overflow-y: scroll; height:21.5rem");
    }

    // SET ATTRIBUTE
    // list items :: tabindex, id
    for (var i = 0; i < listItems.length; i++) {
        listItems[i].setAttribute("tabindex", 0);
        listItems[i].setAttribute("id", 'option-' + (i + 1));
        listItems[i].setAttribute("role", 'listitem');
    }
})();

// GET RANDOM COLOR
function getRendomColor() {
    var getRndColor = [];
    for (var i = 0; i < listItems.length; i++) {
        var randomColor = Math.floor(Math.random() * 16777345).toString(16);
        var clr = '#000000'.slice(0, -randomColor.length) + randomColor;
        getRndColor.push(clr);
    }
    return getRndColor;
};

// COLORS
var defaultColor = ['#ade486', '#4a90e2', '#f5a622', '#ff6f6f']; // default color for first four items 
var randomColorArray = getRendomColor(); // random color
var colorArray = defaultColor.concat(randomColorArray); // default color and random color (if there are more than four items then apply random color)

// CRATE SPAN TAG AND APPLY BACKGROUND COLOR (INSIDE EACH LIST ITEM)
for (var i = 0; i < listItems.length; i++) {
    var createSpan = document.createElement('span'); // create span tag inside each list-item
    var list_span = listItems[i].appendChild(createSpan);
    list_span.classList.add('list-item_span'); // add class in span tag
    addStylesheet(list_span, 'background:' + colorArray[i]); //apply backgroud color to each span tag
}

// APPLY EVENT LISTENER TO EACH LIST ITEM  (Note: the comment code below does not support in ie11 and safari 5.4)

// listItems.forEach(item => {
//     item.addEventListener('click', e => {
//         selectedItem.innerHTML = item.innerHTML;
//         closeListsVisibility();
//     }
//     );

//     item.addEventListener('keydown', e => {
//         switch (e.keyCode) {
//             case enterKeyCode:
//                 selectedItem.innerHTML = item.innerHTML;
//                 closeListsVisibility();
//                 return;

//             case downArrowKeyCode:
//                 focusNextItem(downArrowKeyCode);
//                 return;
//             case upArrowKeyCode:
//                 focusNextItem(upArrowKeyCode);
//                 return;
//             case escapeKeyCode:
//                 closeListsVisibility();
//                 return;
//             case leftArrowKeyCode:
//                 closeListsVisibility();
//                 return;

//             case rightArrowKeyCode:
//                 closeListsVisibility();
//                 return;
//             default:
//                 return;
//         }
//     })
// });


// APPLY EVENT LISTENER TO EACH LIST ITEM (forEach() method does not support in ie11, safari below 5.4)
var eventHandle = function () {
    var _loop = function _loop(_i) {
        selectedItem.innerHTML = listItems[0].innerHTML; //default selected first item

        listItems[_i].addEventListener('click', function (e) {
            selectedItem.innerHTML = listItems[_i].innerHTML;
            selectedItem.focus();
            closeListsVisibility();
        });

        listItems[_i].addEventListener('keydown', function (e) {
            switch (e.keyCode) {
                case enterKeyCode:
                    selectedItem.innerHTML = listItems[_i].innerHTML;
                    selectedItem.focus();
                    closeListsVisibility();
                    return;

                case downArrowKeyCode:
                    focusNextItem(downArrowKeyCode);
                    return;
                case upArrowKeyCode:
                    focusNextItem(upArrowKeyCode);
                    return;
                case escapeKeyCode:
                    closeListsVisibility();
                    return;
                case leftArrowKeyCode:
                    closeListsVisibility();
                    return;

                case rightArrowKeyCode:
                    closeListsVisibility();
                    return;
                default:
                    return;
            }
        });
    };

    for (var _i = 0; _i < listItems.length; _i++) {
        _loop(_i);
    };
}();

// EVENT LISTENER 
selectedItemWrap.addEventListener('click', function (e) {
    toggleDropdownVisibility(e);
});
selectedItemWrap.addEventListener('keydown', function (e) {
    toggleDropdownVisibility(e);
});

//HIDE DROPDOWN LISTS WHEN MOUSE-CLICK OUTSIDE THE LISTS CONTAINER 
document.addEventListener("click", function (e) {
    var elementWrapper = selectOptionContainer;
    var targetElement = e.target;
    do {
        if (targetElement == elementWrapper) {
            return;
        }
        targetElement = targetElement.parentNode;
    } while (targetElement);
    closeListsVisibility();
});

//TOGGLE VISIBILITY OF LISTS
function toggleDropdownVisibility(e) {

    function toggle() {
        return selectOptionWrapper.classList.contains("hide__drop-down") ? selectOptionWrapper.classList.remove("hide__drop-down") : selectOptionWrapper.classList.add("hide__drop-down");
    }

    if (e.type === "click") {
        toggle();
    }

    if (e.keyCode === escapeKeyCode) {
        closeListsVisibility();
    }

    if (e.keyCode === enterKeyCode) {
        toggle();
    }

    if (e.keyCode === spaceKeyCode) {
        toggle();
    }

    if (e.keyCode === downArrowKeyCode) {
        focusNextItem(downArrowKeyCode);
    }
    if (e.keyCode === upArrowKeyCode) {
        focusNextItem(upArrowKeyCode);
    }
}

//CLOSE LIST VISIBILITY
function closeListsVisibility() {
    selectOptionWrapper.classList.add("hide__drop-down");
    selectOptionWrapper.setAttribute("aria-expanded", false);
    selectedItem.setAttribute("aria-expanded", false);
}

//HANDLE ARROW KEY
// get ID of each list items
listItems.forEach(function (item) {
    return listItemIds.push(item.id);
});
console.log(listItemIds);

function focusNextItem(direction) {
    //   console.log(directio);
    var activeElementId = document.activeElement.id; //Get the currently focused element 
    // console.log(activeElementId);

    var currentActiveElementIndex = listItemIds.indexOf(activeElementId);

    if (direction === downArrowKeyCode) {

        var currentActiveElementIsNotLastItem = currentActiveElementIndex < listItemIds.length - 1;

        if (currentActiveElementIsNotLastItem) {

            var nextListItemId = listItemIds[currentActiveElementIndex + 1];

            document.querySelector('#' + nextListItemId).focus();
        }
    } else if (direction === upArrowKeyCode) {

        var currentActiveElementIsNotFirstItem = currentActiveElementIndex > 0;

        if (currentActiveElementIsNotFirstItem) {
            var _nextListItemId = listItemIds[currentActiveElementIndex - 1];
            console.log(document.querySelector('#' + _nextListItemId).focus());
        }
    }
}