const placesList = document.querySelector('.places__list');

const profileEditPopup = document.querySelector('.popup_type_edit');
const profileFormElement = document.querySelector('.popup__form');
const nameInput = profileFormElement.querySelector('.popup__input_type_name');
const jobInput = profileFormElement.querySelector('.popup__input_type_description');

const cardAddPopup = document.querySelector('.popup_type_new-card');

const imagePopup = document.querySelector('.popup_type_image');

const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close');
const saveButton = document.querySelector('.popup__button');

function createCard(name, link, alt) {
    const cardTemplate = document.querySelector('#card-template').content;
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    
    card.querySelector('.card__image').src = link;
    card.querySelector('.card__image').alt = alt;
    card.querySelector('.card__title').textContent = name;
    
    return card;
}

function openModal(popup) {      
    popup.classList.add('popup_is-opened');
}

function closeModal(popup) {      
    popup.classList.remove('popup_is-opened');
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    
    document.querySelector('.profile__title').textContent = nameInput.value;
    document.querySelector('.profile__description').textContent = jobInput.value;
    saveButton.addEventListener('click', () => closeModal(profileEditPopup));
}

editButton.addEventListener('click', () => openModal(profileEditPopup));
closeButton.addEventListener('click', () => closeModal(profileEditPopup));

nameInput.value = document.querySelector('.profile__title').textContent;
jobInput.value = document.querySelector('.profile__description').textContent;

profileFormElement.addEventListener('submit', handleProfileFormSubmit); 


initialCards.forEach(card => {
    placesList.append(createCard(card.name, card.link, card.alt));
});



// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
