"use strict";

// HELPER FUNCTION :: select single DOM element

function getSingleDOMelement(element) {
    return document.querySelector(element);
}

// HELPER FUNCTION :: select all same DOM elements
function getAllDOMelement(element) {
    return document.querySelectorAll(element);
}

// HELPER FUNCTION :: add stylesheet in element
function addStylesheet(element, styleSheet) {
    return element.style.cssText = styleSheet;
};

// GET DOM ELEMENTS
var DOMelement = {
    optionContainer: getSingleDOMelement('.select-option'),
    selectedItemWrap: getSingleDOMelement('.select-option__selected'),
    selectedItem: getSingleDOMelement('.select-option__selected-item'),
    selectOptionWrapper: getSingleDOMelement('.select-option__wrapper'),
    optionLists: getSingleDOMelement('.select-option__list'),
    listItems: getAllDOMelement('.select-option__list-item')

};

// GET KEYBOARD KEY CODE 
var keyCode = {
    enter: 13,
    space: 32,
    upArrow: 38,
    leftArrow: 37,
    rightArrow: 39,
    downArrow: 40,
    escape: 27
};

//ARRAY FOR STORE ELEMENT ID
var listItemIds = [];

// COTROL DISPLAY ITEMS, SET-ATTRIBUTE  
var CtrlElements = function () {
    return {
        // if list items > 7 then  fixed the height of select option wrapper 
        controlDisplayList: function controlDisplayList() {
            if (DOMelement.listItems.length > 7) {
                return addStylesheet(DOMelement.selectOptionWrapper, "overflow-y: scroll; height:21.5rem");
            }
        },

        // Set attributes
        attributesSet: function attributesSet() {
            for (var i = 0; i < DOMelement.listItems.length; i++) {
                DOMelement.listItems[i].setAttribute("tabindex", 0);
                DOMelement.listItems[i].setAttribute("id", 'option-' + (i + 1));
                DOMelement.listItems[i].setAttribute("role", 'listitem');
            }
        }
    };
}();
CtrlElements.controlDisplayList();
CtrlElements.attributesSet();

// SET DIFFERENT BACKGROUND COLOR OF EACH LIST ITEMS
var getBgColor = function () {
    function getRendomColor() {
        var getRndColor = [];
        for (var i = 0; i < DOMelement.listItems.length; i++) {
            var randomColor = Math.floor(Math.random() * 16777345).toString(16);
            var clr = '#000000'.slice(0, -randomColor.length) + randomColor;
            getRndColor.push(clr);
        }
        return getRndColor;
    };

    // COLORS
    var defaultColor = void 0,
        randomColorArray = void 0,
        colorArray = void 0;
    defaultColor = ['#ade486', '#4a90e2', '#f5a622', '#ff6f6f']; // default color for first four items 
    randomColorArray = getRendomColor(); // random color
    colorArray = defaultColor.concat(randomColorArray); // default color and random color (if there are more than four items then apply random color)

    // CREATE SPAN TAG AND APPLY BACKGROUND COLOR (INSIDE EACH LIST ITEM)
    return {
        itemsBgColor: function itemsBgColor() {
            for (var i = 0; i < DOMelement.listItems.length; i++) {
                var createSpan = document.createElement('span'); // create span tag inside each list-item
                var list_span = DOMelement.listItems[i].appendChild(createSpan);
                list_span.classList.add('list-item_span'); // add class in span tag
                addStylesheet(list_span, 'background:' + colorArray[i]); //apply backgroud color to each span tag
            }
        }
    };
}();
getBgColor.itemsBgColor();

// APPLY EVENT LISTENER TO EACH LIST ITEM  (Note: the comment code below does not support in ie11 and safari 5.4)

// listItems.forEach(item => {
//     item.addEventListener('click', e => {
//         selectedItem.innerHTML = item.innerHTML;
//         closeListsVisibility();
//     }
//     );

//     item.addEventListener('keydown', e => {
//         switch (e.keyCode) {
//             case keyCode.enter:
//                 selectedItem.innerHTML = item.innerHTML;
//                 closeListsVisibility();
//                 return;

//             case keyCode.downArrow:
//                 focusNextItem(keyCode.downArrow);
//                 return;
//             case keyCode.upArrow:
//                 focusNextItem(keyCode.upArrow);
//                 return;
//             case keyCode.escape:
//                 closeListsVisibility();
//                 return;
//             case keyCode.leftArrow:
//                 closeListsVisibility();
//                 return;

//             case keyCode.rightArrow:
//                 closeListsVisibility();
//                 return;
//             default:
//                 return;
//         }
//     })
// });


// APPLY EVENT LISTENER TO EACH LIST ITEM (forEach() method does not support in ie11, safari below 5.4)
var eventHandle = function () {
    var _loop = function _loop(i) {
        DOMelement.selectedItem.innerHTML = DOMelement.listItems[0].innerHTML; //default selected first item

        DOMelement.listItems[i].addEventListener('click', function (e) {
            DOMelement.selectedItem.innerHTML = DOMelement.listItems[i].innerHTML;
            DOMelement.selectedItem.focus();
            closeListsVisibility();
        });

        DOMelement.listItems[i].addEventListener('keydown', function (e) {
            switch (e.keyCode) {
                case keyCode.enter:
                    DOMelement.selectedItem.innerHTML = DOMelement.listItems[i].innerHTML;
                    DOMelement.selectedItem.focus();
                    closeListsVisibility();
                    return;

                case keyCode.downArrow:
                    focusNextItem(keyCode.downArrow);
                    return;
                case keyCode.upArrow:
                    focusNextItem(keyCode.upArrow);
                    return;
                case keyCode.escape:
                    closeListsVisibility();
                    return;
                case keyCode.leftArrow:
                    closeListsVisibility();
                    return;

                case keyCode.rightArrow:
                    closeListsVisibility();
                    return;
                default:
                    return;
            }
        });
    };

    for (var i = 0; i < DOMelement.listItems.length; i++) {
        _loop(i);
    };
}();

// EVENT LISTENER 
DOMelement.selectedItemWrap.addEventListener('click', function (e) {
    toggleDropdownVisibility(e);
});
DOMelement.selectedItemWrap.addEventListener('keydown', function (e) {
    toggleDropdownVisibility(e);
});

//HIDE DROPDOWN LISTS WHEN MOUSE-CLICK OUTSIDE THE LISTS CONTAINER 
document.addEventListener("click", function (e) {
    var elementWrapper = DOMelement.optionContainer;
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
        return DOMelement.selectOptionWrapper.classList.contains("hide__drop-down") ? DOMelement.selectOptionWrapper.classList.remove("hide__drop-down") : DOMelement.selectOptionWrapper.classList.add("hide__drop-down");
    }

    if (e.type === "click") {
        toggle();
    }

    if (e.keyCode === keyCode.escape) {
        closeListsVisibility();
    }

    if (e.keyCode === keyCode.enter) {
        toggle();
    }

    if (e.keyCode === keyCode.space) {
        toggle();
    }

    if (e.keyCode === keyCode.downArrow) {
        focusNextItem(keyCode.downArrow);
    }
    if (e.keyCode === keyCode.upArrow) {
        focusNextItem(keyCode.upArrow);
    }
}

//CLOSE LIST VISIBILITY
function closeListsVisibility() {
    DOMelement.selectOptionWrapper.classList.add("hide__drop-down");
    DOMelement.selectOptionWrapper.setAttribute("aria-expanded", false);
    DOMelement.selectedItem.setAttribute("aria-expanded", false);
}

//HANDLE ARROW KEY
// get ID of each list items
DOMelement.listItems.forEach(function (item) {
    return listItemIds.push(item.id);
});
console.log(listItemIds);

function focusNextItem(direction) {
    //   console.log(directio);
    var activeElementId = document.activeElement.id; //Get the currently focused element 
    // console.log(activeElementId);

    var currentActiveElementIndex = listItemIds.indexOf(activeElementId);

    if (direction === keyCode.downArrow) {

        var currentActiveElementIsNotLastItem = currentActiveElementIndex < listItemIds.length - 1;

        if (currentActiveElementIsNotLastItem) {

            var nextListItemId = listItemIds[currentActiveElementIndex + 1];

            document.querySelector('#' + nextListItemId).focus();
        }
    } else if (direction === keyCode.upArrow) {

        var currentActiveElementIsNotFirstItem = currentActiveElementIndex > 0;

        if (currentActiveElementIsNotFirstItem) {
            var _nextListItemId = listItemIds[currentActiveElementIndex - 1];
            console.log(document.querySelector('#' + _nextListItemId).focus());
        }
    }
}