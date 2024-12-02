const placesList = document.querySelector('.places__list');

const popupProfileEdit = document.querySelector('.popup_type_edit');
const profileFormElement = document.querySelector('.popup__form');
const nameInput = profileFormElement.querySelector('.popup__input_type_name');
const jobInput = profileFormElement.querySelector('.popup__input_type_description');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonCloseProfilePopup = popupProfileEdit.querySelector('.popup__close');
const buttonSaveProfilePopup = popupProfileEdit.querySelector('.popup__button');

const popupCardAdd = document.querySelector('.popup_type_new-card');
const buttonAddCard = document.querySelector('.profile__add-button');
const cardFormElement = popupCardAdd.querySelector('.popup__form');
const placeNameInput = popupCardAdd.querySelector('.popup__input_type_card-name');
const linkInput = popupCardAdd.querySelector('.popup__input_type_url');
const buttonCloseCardPopup = popupCardAdd.querySelector('.popup__close');
const buttonSaveCardPopup = popupCardAdd.querySelector('.popup__button');

const imagePopup = document.querySelector('.popup_type_image');
const buttonCloseImagePopup = imagePopup.querySelector('.popup__close');
const imageInPopup = imagePopup.querySelector('.popup__image');
const imageInPopupCaption = imagePopup.querySelector('.popup__caption');

function createCard(name, link, alt) {
    const cardTemplate = document.querySelector('#card-template').content;
    const card = cardTemplate.querySelector('.card').cloneNode(true);

    card.querySelector('.card__image').src = link;
    card.querySelector('.card__image').alt = alt;
    card.querySelector('.card__title').textContent = name;

    const cardLike = card.querySelector('.card__like-button');
    cardLike.addEventListener('click', (e) => e.target.classList.toggle('card__like-button_is-active'));
    
    const cardImage = card.querySelector('.card__image');
    cardImage.addEventListener('click', (e) => {
        openModal(imagePopup);
        imageInPopup.src = e.target.src;
        imageInPopup.alt = e.target.alt;
        imageInPopupCaption.textContent = name;
    });

    const cardDelete = card.querySelector('.card__delete-button');
    cardDelete.addEventListener('click', (e) => e.target.closest('.card').remove());
    
    return card;
}

function isKeyEscape(evt) {
    if (evt.key == 'Escape') {
        const popup = document.querySelector('.popup_is-opened');
        closeModal(popup);
    }
}

function isOverlay(evt) {
    const popup = document.querySelector('.popup_is-opened');
    if (popup == evt.target) {
        closeModal(popup);
    }
}

function openModal(popup) {      
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', isKeyEscape);
    popup.addEventListener('click', isOverlay);
}

function closeModal(popup) {      
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', isKeyEscape);
    popup.removeEventListener('click', isOverlay);
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    document.querySelector('.profile__title').textContent = nameInput.value;
    document.querySelector('.profile__description').textContent = jobInput.value;
    resetFormErrors(profileFormElement, buttonSaveProfilePopup);
}

function handleCardFormSubmit(evt) {
    evt.preventDefault();
    placesList.prepend(createCard(placeNameInput.value, linkInput.value, placeNameInput.value));
    buttonSaveCardPopup.addEventListener('click', closeModal(popupCardAdd));
    resetFormErrors(cardFormElement, buttonSaveCardPopup);
    addDefaultCardValues();
}

function addDefaultProfileValues() {
    nameInput.value = document.querySelector('.profile__title').textContent;
    jobInput.value = document.querySelector('.profile__description').textContent;
}

function addDefaultCardValues() {
    if (placeNameInput.value) placeNameInput.value = '';
    if (linkInput.value) linkInput.value = '';
}

function showInputError(formElement, inputElement, message) {
    const errorSpan = formElement.querySelector(`.${inputElement.id}-input-error`);
    inputElement.classList.add('popup__input_type_error');
    errorSpan.textContent = message;
    errorSpan.classList.add('popup__input-error_active');
}

function hideInputError(formElement, inputElement) {
    const errorSpan = formElement.querySelector(`.${inputElement.id}-input-error`);
    inputElement.classList.remove('popup__input_type_error');
    errorSpan.textContent = '';
    errorSpan.classList.remove('popup__input-error_active');
}

function resetFormErrors(formElement, buttonElement) {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement);
    });

    buttonElement.classList.add('popup__button_inactive');
    buttonElement.setAttribute('disabled', true);
}

function checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
}

function hasInvalidInput(inputList) {
    return inputList.some((inputElement => {
        return !inputElement.validity.valid;
    }))
}

function toggleButtonState (inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add('popup__button_inactive');
      buttonElement.setAttribute('disabled', true);
    } else {
      buttonElement.classList.remove('popup__button_inactive');
      buttonElement.removeAttribute('disabled');
    }
  }

function setEventListeners (formElement) {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__button');
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
};

function enableValidation () {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
        setEventListeners(formElement);
    });
  };
  

initialCards.forEach(card => {
    placesList.append(createCard(card.name, card.link, card.alt));
});

buttonEditProfile.addEventListener('click', function() {
    addDefaultProfileValues();
    openModal(popupProfileEdit);
});

buttonCloseProfilePopup.addEventListener('click', function() {
    resetFormErrors(profileFormElement, buttonSaveProfilePopup);
    closeModal(popupProfileEdit);
    addDefaultProfile();
})

buttonSaveProfilePopup.addEventListener('click', () => closeModal(popupProfileEdit));

buttonAddCard.addEventListener('click', () => openModal(popupCardAdd));

buttonCloseCardPopup.addEventListener('click', function() {
    resetFormErrors(cardFormElement, buttonSaveCardPopup);
    closeModal(popupCardAdd);
    addDefaultCardValues();
});

buttonCloseImagePopup.addEventListener('click', () => closeModal(imagePopup));

profileFormElement.addEventListener('submit', handleProfileFormSubmit); 

cardFormElement.addEventListener('submit', handleCardFormSubmit);

popupProfileEdit.classList.add('popup_is-animated');
popupCardAdd.classList.add('popup_is-animated');
imagePopup.classList.add('popup_is-animated');

enableValidation();