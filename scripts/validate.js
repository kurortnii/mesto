//положим в отдельную переменную объект настроек форм

const formSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_inactive',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__field-error_active'
}

//опишем функцию, чтобы показать ошибку

const showInputError = (formSelector, inputSelector, errorMessage, {errorClass, inputErrorClass}) => {
  const errorElement = formSelector.querySelector(`#${inputSelector.id}-error`);
  inputSelector.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
}

//опишем функцию, чтобы скрыть ошибку

const hideInputError = (formSelector, inputSelector, {errorClass, inputErrorClass}) => {
  const errorElement = formSelector.querySelector(`#${inputSelector.id}-error`);
  inputSelector.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
}

//опишем функцию, чтобы проверить валидность формы

const checkInputValidity = (formSelector, inputSelector) => {
  if(!inputSelector.validity.valid) {
    showInputError(formSelector, inputSelector, inputSelector.validationMessage, formSettings);
  }
  else {
    hideInputError(formSelector, inputSelector, formSettings);
  }
}

//опишем функцию, чтобы проверить валидность поля

const hasInvalidInput = inputList => {
  return inputList.some((inputSelector) => {
    return !inputSelector.validity.valid;
  });
}

//опишем фукнцию для переключения кнопки в неактивный режим

const toggleButtonState = (inputList, submitButtonSelector, {inactiveButtonClass}) => {
  if(hasInvalidInput(inputList)) {
    submitButtonSelector.classList.add(inactiveButtonClass);
    submitButtonSelector.setAttribute('disabled', '');
  }
  else {
    submitButtonSelector.classList.remove(inactiveButtonClass);
    submitButtonSelector.removeAttribute('disabled', '');
  }
}

//опишем функцию, чтобы навесить события на все формы

const setEvenListeners = (formElement, {inputSelector, submitButtonSelector}) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);

  toggleButtonState(inputList, buttonElement, formSettings);

  inputList.forEach((inputSelector) => {
    inputSelector.addEventListener('input', function() {
      checkInputValidity(formElement, inputSelector);
      toggleButtonState(inputList, buttonElement, formSettings);
    });
  });
}

//опишем функцию для валидации

const enableValidation = ({formSelector}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((item) => {
    item.addEventListener('submit', function(evt){
      evt.preventDefault();
    });

    formList.forEach((item) => {
      setEvenListeners(item, formSettings)
    });
  });
}

enableValidation(formSettings);