const form = document.getElementById("formCustomer");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
   const dataForm ={}


   for (const [key, value] of formData.entries()) {
     dataForm[key] = value;
   }

   const emptyFields = validateDataForm(dataForm);

   if (emptyFields) {
    alert("Por favor complete todos los campos obligatorios: " + emptyFields.join(", "));
  } else {
    try {
      const response = await fetch('http://localhost:3000/compras', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataForm)
      });

      if (response.ok) {
        console.log('La orden de compra se ha creado exitosamente.');
        window.location.href = '../pages/Purchase-Confirmation.html';
      } else {
        console.error('Error al crear la orden de compra:', response.statusText);
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  }
});


// Validaciones del formulario
const validateDataForm = (dataForm) => {
  let emptyFields = [];
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const phoneRegex = /^\d{10}$/;
  const cardNumberRegex = /^\d{14}$/;
  const cvvRegex = /^\d{3}$/;

  for (const key in dataForm) {
    if (dataForm[key].trim() == "") {
      emptyFields.push(key);
    }
  }

  if (dataForm.name.length <= 3) {
    alert("El nombre debe contener más de 3 caracteres");
    emptyFields.push('name');
  }

  if (!emailRegex.test(dataForm.email)) {
    alert("El email ingresado no es valido");
    emptyFields.push("email");
  }

  if (!phoneRegex.test(dataForm.phone)) {
    alert("El número de teléfono debe tener exactamente 10 números");
    emptyFields.push("phone");
  }

  if (!cardNumberRegex.test(dataForm["cardNumber"])) {
    alert("El número de la tarjeta debe tener exáctamente 14 números");
    emptyFields.push("cardNumber");
  }

  if (!cvvRegex.test(dataForm.securityNumber)) {
    alert("El CVV debe tener exáctamente 3 dígitos");
    emptyFields.push("securityNumber");
  }

  return emptyFields.length > 0 ? emptyFields : false;
};