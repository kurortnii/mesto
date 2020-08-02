const popup = document.querySelector('.popup');
const popupOpenButton = document.querySelector('.profile__button-info');
const popupCloseButton = popup.querySelector('.popup__button-close');
let formElement = popup.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__field_name');
let textInput = formElement.querySelector('.popup__field_text');
let profileName = document.querySelector('.profile__name');
let profileText = document.querySelector('.profile__text');

const popupToggle = function() {

  nameInput.value = profileName.textContent;
  textInput.value = profileText.textContent;
  
  popup.classList.toggle('popup_opened');
}

function formSubmitHandler(event) {
  event.preventDefault()

  profileName.textContent = nameInput.value;
  profileText.textContent = textInput.value;

  popup.classList.toggle('popup_opened');
}

popupOpenButton.addEventListener('click', popupToggle);
popupCloseButton.addEventListener('click', popupToggle);
formElement.addEventListener('submit', formSubmitHandler);