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

// функция для создания карточек из массива попапа
function createCard(name, link, alt) {
    const cardTemplate = document.querySelector('#card-template').content;
    const card = cardTemplate.querySelector('.card').cloneNode(true);

    card.querySelector('.card__image').src = link;
    card.querySelector('.card__image').alt = alt;
    card.querySelector('.card__title').textContent = name;

    // добавление/удаление лайка
    const cardLike = card.querySelector('.card__like-button');
    cardLike.addEventListener('click', (e) => e.target.classList.toggle('card__like-button_is-active'))
    
    // просмотр картинки
    const cardImage = card.querySelector('.card__image');
    cardImage.addEventListener('click', (e) => {
        openModal(imagePopup);
        imageInPopup.src = e.target.src;
        imageInPopup.alt = e.target.alt;
        imageInPopupCaption.textContent = name;
    })

    // удаление карточки
    const cardDelete = card.querySelector('.card__delete-button');
    cardDelete.addEventListener('click', (e) => e.target.closest('.card').remove());
    
    return card;
}

// функция для показа попапа
function openModal(popup) {      
    popup.classList.add('popup_is-opened');
}

// функция для скрытия попапа
function closeModal(popup) {      
    popup.classList.remove('popup_is-opened');
}

// функция для изменения профиля
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    document.querySelector('.profile__title').textContent = nameInput.value;
    document.querySelector('.profile__description').textContent = jobInput.value;
}

// функция добавления карточки
function handleCardFormSubmit(evt) {
    evt.preventDefault();
    placesList.prepend(createCard(placeNameInput.value, linkInput.value, placeNameInput.value))
    buttonSaveCardPopup.addEventListener('click', closeModal(popupCardAdd))
}

function addDefaultProfileValues() {
    nameInput.value = document.querySelector('.profile__title').textContent;
    jobInput.value = document.querySelector('.profile__description').textContent;
}

// добавление карточек из массива
initialCards.forEach(card => {
    placesList.append(createCard(card.name, card.link, card.alt));
});

// открытие/закрытие попапов
buttonEditProfile.addEventListener('click', function() {
    addDefaultProfile()
    openModal(popupProfileEdit)
});
buttonCloseProfilePopup.addEventListener('click', function() {
    closeModal(popupProfileEdit);
    addDefaultProfile()
}) 
buttonSaveProfilePopup.addEventListener('click', () => closeModal(popupProfileEdit));

buttonAddCard.addEventListener('click', () => openModal(popupCardAdd));
buttonCloseCardPopup.addEventListener('click', function() {
    closeModal(popupCardAdd)
    if (placeNameInput.value) placeNameInput.value = '';
    if (linkInput.value) linkInput.value = '';
});

buttonCloseImagePopup.addEventListener('click', () => closeModal(imagePopup));

// редактирование профиля
profileFormElement.addEventListener('submit', handleProfileFormSubmit); 

// создание новой карточки
cardFormElement.addEventListener('submit', handleCardFormSubmit);

// анимации для попапов
popupProfileEdit.classList.add('popup_is-animated');
popupCardAdd.classList.add('popup_is-animated');
imagePopup.classList.add('popup_is-animated');