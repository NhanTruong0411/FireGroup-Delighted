// Hàm tạo (constructor) hoặc đối tượng (object) `Validation`
function Validator(options) {

   function validate(inputElement, rule) {

      var errorElement = inputElement.parentElement.querySelector('.form-message')
      var errorMessage = rule.test(inputElement.value);

      if(errorMessage) {
         errorElement.innerText = errorMessage;
         inputElement.classList.add('invalid');
      } else {
         errorElement.innerText = "";
         inputElement.classList.remove('invalid');
      }
   }

   let formElement = document.querySelector(options.form);
   if(formElement) {
      options.rules.forEach(rule => {
         let inputElement = formElement.querySelector(rule.selector);
         // blur event
         inputElement.onblur = () => {
            validate(inputElement, rule);
         ;}
         //onInput event
         inputElement.oninput = () => {
            var errorElement = inputElement.parentElement.querySelector('.form-message')
            errorElement.innerText = "";
            inputElement.classList.remove('invalid');
         }
      })
   }  
}

Validator.isRequired = function(selector) {
   return {
      selector,
      test: (value) => {
         return value.trim() ? undefined : "This fill is required !"
      }
   };
}
