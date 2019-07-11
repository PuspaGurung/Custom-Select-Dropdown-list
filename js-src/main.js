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
const selectOptionContainer = getSingleDOMelement('.select-option');
const selectedItemWrap = getSingleDOMelement('.select-option__selected');
const selectedItem = getSingleDOMelement('.select-option__selected-item');
const selectOptionWrapper = getSingleDOMelement('.select-option__wrapper');
const optionLists = getSingleDOMelement('.select-option__list');
const listItems = getAllDOMelement('.select-option__list-item');


//ARRAY FOR STORE ELEMENT ID
const listItemIds = [];

// GET KEYBOARD KEY CODE 
const enterKeyCode = 13;
const spaceKeyCode = 32;
const upArrowKeyCode = 38;
const leftArrowKeyCode = 37;
const rightArrowKeyCode = 39;
const downArrowKeyCode = 40;
const escapeKeyCode = 27;

//ADD STYLE ON SELECT-OPTION__WRAPPER
// if list items are more than 7 then fixed the height and add vertical scroll bar 
if (listItems.length > 7) {
    addStylesheet(selectOptionWrapper, "overflow-y: scroll; height:21.5rem");
}

// SET ATTRIBUTE
// list items :: tabindex, id
for (let i = 0; i < listItems.length; i++) {
    listItems[i].setAttribute("tabindex", 0);
    listItems[i].setAttribute("id", `option-${i + 1}`);
    listItems[i].setAttribute("role", `listitem`);
}

// GET RANDOM COLOR
function getRendomColor() {
    let getRndColor = [];
    for (let i = 0; i < listItems.length; i++) {
        let randomColor = Math.floor(Math.random() * 16777345).toString(16);
        let clr = '#000000'.slice(0, -randomColor.length) + randomColor;
        getRndColor.push(clr);
    }
    return getRndColor;
};

// COLORS
let defaultColor = ['#ade486', '#4a90e2', '#f5a622', '#ff6f6f']; // default color for first four items 
let randomColorArray = getRendomColor(); // random color
let colorArray = defaultColor.concat(randomColorArray); // default color and random color (if there are more than four items then apply random color)

// CRATE SPAN TAG AND APPLY BACKGROUND COLOR (INSIDE EACH LIST ITEM)
for (let i = 0; i < (listItems.length); i++) {
    let createSpan = document.createElement('span'); // create span tag inside each list-item
    let list_span = listItems[i].appendChild(createSpan);
    list_span.classList.add('list-item_span'); // add class in span tag
    addStylesheet(list_span, `background:${colorArray[i]}`); //apply backgroud color to each span tag
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
for (let i = 0; i < listItems.length; i++) {
    selectedItem.innerHTML = listItems[0].innerHTML;  //default selected first item

    listItems[i].addEventListener('click', function (e) {
        selectedItem.innerHTML = listItems[i].innerHTML;
        closeListsVisibility();
    });

    listItems[i].addEventListener('keydown', function (e) {
        switch (e.keyCode) {
            case enterKeyCode:
                selectedItem.innerHTML = listItems[i].innerHTML;
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



// EVENT LISTENER 
selectedItemWrap.addEventListener('click', e => {
    toggleDropdownVisibility(e);
});
selectedItemWrap.addEventListener('keydown', e => {
    toggleDropdownVisibility(e);
});

//HIDE DROPDOWN LISTS WHEN MOUSE-CLICK OUTSIDE THE LISTS CONTAINER 
document.addEventListener("click", function (e) {
    let elementWrapper = selectOptionContainer;
    let targetElement = e.target;
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
listItems.forEach(item => listItemIds.push(item.id));
console.log(listItemIds);


function focusNextItem(direction) {
    const activeElementId = document.activeElement.id; //Get the currently focused element 
    console.log(activeElementId);

    const currentActiveElementIndex = listItemIds.indexOf(activeElementId);

    if (direction === downArrowKeyCode) {

        const currentActiveElementIsNotLastItem =

            currentActiveElementIndex < listItemIds.length - 1;

        if (currentActiveElementIsNotLastItem) {

            const nextListItemId = listItemIds[currentActiveElementIndex + 1];

            document.querySelector(`#${nextListItemId}`).focus();

        }
    } else if (direction === upArrowKeyCode) {

        const currentActiveElementIsNotFirstItem =

            currentActiveElementIndex > 0;


        if (currentActiveElementIsNotFirstItem) {
            const nextListItemId = listItemIds[currentActiveElementIndex - 1];
            console.log(document.querySelector(`#${nextListItemId}`).focus());
        }
    }

}
