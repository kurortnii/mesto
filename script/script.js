const popup = document.querySelector('.popup');
const popupOpenButton = document.querySelector('.profile__button-info');
const popupCloseButton = popup.querySelector('.popup__button-close');

const popupToggle = function() {
  popup.classList.toggle('popup_opened');
}

popupOpenButton.addEventListener('click', popupToggle);
popupCloseButton.addEventListener('click', popupToggle);

let formElement = popup.querySelector('.popup__form');

function formSubmitHandler() {
  event.preventDefault()

  let nameInput = formElement.querySelector('.popup__field_name');
  let textInput = formElement.querySelector('.popup__field_text');

  let profileName = document.querySelector('.profile__name');
  let profileText = document.querySelector('.profile__text');

  profileName.textContent = nameInput.value;
  profileText.textContent = textInput.value;

  popup.classList.remove('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler);