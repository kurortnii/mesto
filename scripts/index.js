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

const popup = document.querySelector('.popup');
const popupOpenButton = document.querySelector('.profile__button-info');
const popupCloseButton = popup.querySelector('.popup__button-close');
const formElement = popup.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__field_name');
const textInput = formElement.querySelector('.popup__field_text');
const profileName = document.querySelector('.profile__name');
const profileText = document.querySelector('.profile__text');
const popupName = document.querySelector('.popup_type_name');

//объвляем переменную, необходимую для рендера карточки

const elementContainer = document.querySelector('.elements');

//объявляем переменные для попапа добавления карточки

const popupAdd = document.querySelector('.popup_type_add-card');
const popupAddButton = document.querySelector('.profile__button-download');
const formElementAdd = popupAdd.querySelector('.popup__form');
const nameCardInput = popupAdd.querySelector('.popup__field_title');
const urlCardInput = popupAdd.querySelector('.popup__field_url');
const popupAddCloseButton = popupAdd.querySelector('.popup__button-close');

//объявляем переменные для попапа увеличения картинки

const elementImage = document.querySelectorAll('.element__image');
const popupWrapImage = document.querySelector('.popup_type_image');
const popupImage = popupWrapImage.querySelector('.popup__image');
const popupImageTitle = popupWrapImage.querySelector('.popup__image-title');

//объявляем переменную для всех кнопок закрытия

const popupCloseButtonAll = document.querySelectorAll('.popup__button-close');


//описываем функцию открытия попапа

const popupOpen = popup => popup.classList.add('popup_opened'); 

//описываем функцию закрытия попапа

const popupClose = () => document.querySelector('.popup_opened').classList.remove('popup_opened');

//описываем функцию закрытия попапа по оверлею 

const popupCloseOverlay = event => {
  if (event.target !== event.currentTarget)

  return; 
  
  popupClose(event.target);
}

//описываем обработчик формы редактирования профиля

const formSubmitHandler = event => {
  event.preventDefault()

  profileName.textContent = nameInput.value;
  profileText.textContent = textInput.value;

  popupClose();
}

//описывыем обработчик формы добавления и сохранения карточки в начало контейнера

const formAddCardHandler = event => {
  event.preventDefault()

  const nameCard = nameCardInput.value;
  const urlCard =  urlCardInput.value;

  addItemToContainer(nameCard, urlCard);
  popupClose();
  formElementAdd.reset();
}

//отрисовываем карточку

const addItemToContainer = (nameCard, urlCard) => {
  const cardElement = document.querySelector('#elementTemplate').content.cloneNode(true);
  const likeButton = cardElement.querySelector('.element__button-like');
  const imageElement = cardElement.querySelector('.element__image');
  const deleteIcon = cardElement.querySelector('.element__button-delete');

  imageElement.src = urlCard;
  imageElement.alt = nameCard;
  cardElement.querySelector('.element__text').textContent = nameCard;

  elementContainer.prepend(cardElement);

  //добавим слушатели на картинки (для ее открытия в полный размер) и кнопки (для удаления карточки и лайка)

  imageElement.addEventListener('click', function() {
    popupOpen(popupWrapImage);
    popupImage.src = imageElement.src;
    popupImageTitle.textContent = imageElement.alt;
  });

  deleteIcon.addEventListener('click', function() {
    deleteIcon.closest('.element').remove();
  });

  likeButton.addEventListener('click', function() {
    likeButton.classList.toggle('element__button-like_active');
  });
}

//пишем обработчики событий для:
//редактирования профиля
//открытия попапов
//закрытия попапов по оверлею
//закрытию попапов и с помощью метода forEach навесим обработчик на все кнопки

popupOpenButton.addEventListener('click', function() {
  popupOpen(popupName);

  nameInput.value = profileName.textContent;
  textInput.value = profileText.textContent;
});

popupAddButton.addEventListener('click', function() {
  popupOpen(popupAdd);
});

popupName.addEventListener('click', popupCloseOverlay);
popupAdd.addEventListener('click', popupCloseOverlay);
popupWrapImage.addEventListener('click', popupCloseOverlay);

popupCloseButtonAll.forEach(button => {
  button.addEventListener('click', popupClose)
});

//объявим обработчики событий

formElement.addEventListener('submit', formSubmitHandler); //для окна редактирования профиля
formElementAdd.addEventListener('submit', formAddCardHandler); //для окна добавления карточки

//рендерим изначальные карточки из входного массива

for (i = 0; i < initialCards.length; i++) {
  addItemToContainer(initialCards[i].name, initialCards[i].link);
}