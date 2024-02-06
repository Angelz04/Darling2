const form = document.getElementById("formCustomer");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);
   const dataForm ={}


   for (const [key, value] of formData.entries()) {
     dataForm[key] = value;
   }

   console.log(dataForm)
 })
