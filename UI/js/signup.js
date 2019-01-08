if (checkCookie('iReporterToken')) {
  extendCookie('iReporterToken', getCookie('iReporterToken'), 30);
  window.location.replace("create_record.html");
}

let email, firstname, lastname, password, othernames, username, phone;

const validateForm = () => {
  email = document.forms.signup.email.value;
  firstname = document.forms.signup.firstname.value;
  lastname = document.forms.signup.lastname.value;
  password = document.forms.signup.password.value;
  othernames = document.forms.signup.othernames.value;
  username = document.forms.signup.username.value;
  phone = document.forms.signup.phone.value;
  if (email) {
    if (firstname) {
      if (lastname) {
        if (password) {
          if (othernames) {
            if (username) {
              if (phone) {
                hideMessages();
                showSuccess("Loading.....");
                const data = { email, firstname, lastname, password, othernames, username, phonenumber:phone };
                return data;
              } else showError("Phone number cannot be empty");
            } else showError("Username cannot be empty");
          } else showError("Other names cannot be empty");
        } else showError("Password cannot be empty");
      }  else showError('Lastname cannot be empty');
    }  else showError('Firstname cannot be empty');
  }  else showError('Email cannot be empty');
};

const clearFormData = () => {
  email = '';
  firstname = '';
  lastname = '';
  password = '';
  othernames = '';
  phone = '';
  username = '';
}

const postData = async (details) => {
  const URL = 'https://jessam-ireporter.herokuapp.com/api/v1/auth/signup';
  let data = JSON.stringify(details);
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  try {
    const fetchResult = fetch(
      new Request(URL, { method: 'POST', cache: 'reload', body: data, headers: headers })
    );
    const response = await fetchResult;
    const jsonData = await response.json();

    if(jsonData.status === 201) {
      clearFormData();
      setCookie('iReporterToken', jsonData.data[0].token, 30);
      setCookie('iReporterUsername', jsonData.data[0].user.username, 30);
      setCookie('iReporterFirstname', jsonData.data[0].user.firstname, 30);
      setCookie('iReporterLastname', jsonData.data[0].user.lastname, 30);
      setCookie('iReporterOthernames', jsonData.data[0].user.othernames, 30);
      showSuccess("Account created successfully");
	  window.location.replace("create_record.html");
    } else {
      hideMessages();
      showError(jsonData.error);
    }
  } catch(e){
    throw Error(e);
  }
}

document.getElementById("submit").addEventListener("click", (event) => {
	event.preventDefault ? event.preventDefault() : (event.returnValue = false);
	if(validateForm()) {
		postData(validateForm());
	}
})
