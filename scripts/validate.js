 //опишем функцию, чтобы показать ошибку 
 
const showInputError = (formSelector, inputSelector, errorMessage, object) => { 
  const errorElement = formSelector.querySelector(`#${inputSelector.id}-error`); 
  inputSelector.classList.add(object.inputErrorClass); 
  errorElement.textContent = errorMessage; 
  errorElement.classList.add(object.errorClass);
} 
 
//опишем функцию, чтобы скрыть ошибку 
 
const hideInputError = (formSelector, inputSelector, object) => { 
  const errorElement = formSelector.querySelector(`#${inputSelector.id}-error`); 
  inputSelector.classList.remove(object.inputErrorClass); 
  errorElement.classList.remove(object.errorClass); 
  errorElement.textContent = ''; 
} 
 
//опишем функцию, чтобы проверить валидность формы 
 

const checkInputValidity = (formSelector, inputSelector, object) => { 
  if(!inputSelector.validity.valid) { 
    showInputError(formSelector, inputSelector, inputSelector.validationMessage, object); 
  } 
  else { 
    hideInputError(formSelector, inputSelector, object); 
  } 
} 
 
//опишем функцию, чтобы проверить валидность поля 
 
const hasInvalidInput = inputList => { 
  return inputList.some((inputSelector) => { 
    return !inputSelector.validity.valid; 
  }); 
} 
 
//опишем фукнцию для переключения кнопки в неактивный режим 
 
const toggleButtonState = (inputList, submitButtonSelector, object) => { 
  if(hasInvalidInput(inputList)) { 
    submitButtonSelector.classList.add(object.inactiveButtonClass); 
    submitButtonSelector.setAttribute('disabled', ''); 
  } 
  else { 
    submitButtonSelector.classList.remove(object.inactiveButtonClass); 
    submitButtonSelector.removeAttribute('disabled', ''); 
  } 
} 
 
//опишем функцию, чтобы навесить события на все формы 
 

const setEvenListeners = (formElement, object) => { 
  const inputList = Array.from(formElement.querySelectorAll(object.inputSelector)); 
  const buttonElement = formElement.querySelector(object.submitButtonSelector); 
 
  toggleButtonState(inputList, buttonElement, object); 
 
  inputList.forEach((inputSelector) => { 
    inputSelector.addEventListener('input', function() { 
      checkInputValidity(formElement, inputSelector, object);
      toggleButtonState(inputList, buttonElement, object); 
    }); 
  }); 
} 
 
//опишем функцию для валидации 
 

const enableValidation = (object) => { 
  const formList = Array.from(document.querySelectorAll(object.formSelector)); 
  formList.forEach((item) => { 
    item.addEventListener('submit', function(evt){
      evt.preventDefault(); 
    }); 
    formList.forEach((item) => { 
      setEvenListeners(item, object);
    }); 
  }); 
} 


enableValidation({ 
  formSelector: '.popup__form', 
  inputSelector: '.popup__field', 
  submitButtonSelector: '.popup__button-submit', 
  inactiveButtonClass: 'popup__button-submit_inactive', 
  inputErrorClass: 'popup__field_type_error', 
  errorClass: 'popup__field-error_active' 
});