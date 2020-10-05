//входной массив для рендеринга изначального вида страницы

const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//объявляем переменные для попапа редактирования профиля

const popupName = document.querySelector('.popup_type_name');
const popupOpenButton = document.querySelector('.profile__button-info');
const formElement = popupName.querySelector('.popup__form');
const nameInput = popupName.querySelector('.popup__field_name');
const textInput = popupName.querySelector('.popup__field_text');
const profileName = document.querySelector('.profile__name');
const profileText = document.querySelector('.profile__text');

//объвляем переменную, необходимую для рендера карточки

const elementContainer = document.querySelector('.elements');

//объявляем переменные для попапа добавления карточки

const popupAdd = document.querySelector('.popup_type_add-card');
const popupAddButton = document.querySelector('.profile__button-download');
const formElementAdd = popupAdd.querySelector('.popup__form');
const nameCardInput = popupAdd.querySelector('.popup__field_title');
const urlCardInput = popupAdd.querySelector('.popup__field_url');

//объявляем переменные для попапа увеличения картинки

const popupWrapImage = document.querySelector('.popup_type_image');
const popupImage = popupWrapImage.querySelector('.popup__image');
const popupImageTitle = popupWrapImage.querySelector('.popup__image-title');

//объявляем переменную для всех кнопок закрытия

const popupCloseButtonAll = document.querySelectorAll('.popup__button-close');


//описываем функцию открытия попапа

const openPopup = popup => popup.classList.add('popup_opened'); 

//описываем функцию закрытия попапа

const closePopup = () => document.querySelector('.popup_opened').classList.remove('popup_opened');

//описываем функцию закрытия попапа по оверлею 

const popupCloseOverlay = event => {
  if (event.target !== event.currentTarget)

  return; 
  
  closePopup(event.target);
}

//описываем обработчик формы редактирования профиля

const formSubmitHandler = event => {
  event.preventDefault()

  profileName.textContent = nameInput.value;
  profileText.textContent = textInput.value;

  closePopup();
}

//описывыем обработчик формы добавления и сохранения карточки в начало контейнера

const formAddCardHandler = event => {
  event.preventDefault()
 
  const nameCard = nameCardInput.value; 
  const urlCard =  urlCardInput.value;

  //получили карточку 
  const elementItem = createCard(nameCard, urlCard);
  
  //передали ее в контейнер
  addCardToContainer(elementContainer, elementItem);
  
  closePopup(); 
  formElementAdd.reset(); 
}

//отрисовываем карточку

const createCard = (nameCard, urlCard) => {
  const cardElement = document.querySelector('#elementTemplate').content.cloneNode(true);
  const likeButton = cardElement.querySelector('.element__button-like');
  const imageElement = cardElement.querySelector('.element__image');
  const deleteIcon = cardElement.querySelector('.element__button-delete');

  imageElement.src = urlCard;
  imageElement.alt = nameCard;
  cardElement.querySelector('.element__text').textContent = nameCard;

  //добавим слушатели на картинки (для ее открытия в полный размер) и кнопки (для удаления карточки и лайка)

  imageElement.addEventListener('click', function() {
    openPopup(popupWrapImage);
    popupImage.src = imageElement.src;
    popupImageTitle.textContent = imageElement.alt;
  });

  deleteIcon.addEventListener('click', function() {
    deleteIcon.closest('.element').remove();
  });

  likeButton.addEventListener('click', function() {
    likeButton.classList.toggle('element__button-like_active');
  });

  return cardElement;
}

//описываем функцию для добавления карточки в контейнер

const addCardToContainer = (elementContainer, cardElement) => {
  elementContainer.prepend(cardElement);
}

//пишем обработчики событий для:
//редактирования профиля
//открытия попапов
//закрытия попапов по оверлею
//закрытию попапов и с помощью метода forEach навесим обработчик на все кнопки

popupOpenButton.addEventListener('click', function() {
  openPopup(popupName);

  nameInput.value = profileName.textContent;
  textInput.value = profileText.textContent;
});

popupAddButton.addEventListener('click', function() {
  openPopup(popupAdd);
});

popupName.addEventListener('click', popupCloseOverlay);
popupAdd.addEventListener('click', popupCloseOverlay);
popupWrapImage.addEventListener('click', popupCloseOverlay);

popupCloseButtonAll.forEach(button => {
  button.addEventListener('click', closePopup)
});

//объявим обработчики событий

formElement.addEventListener('submit', formSubmitHandler); //для окна редактирования профиля
formElementAdd.addEventListener('submit', formAddCardHandler); //для окна добавления карточки

//рендерим изначальные карточки из входного массива

initialCards.forEach(card => {
  const cardElement = createCard(card.name, card.link);

  addCardToContainer(elementContainer, cardElement);
});