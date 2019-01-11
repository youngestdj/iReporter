if (checkCookie('iReporterToken')) {
 	alert('sfvb');
  extendCookie('iReporterToken', getCookie('iReporterToken'), 30);
  window.location.replace("create_record.html");
}

const validateForm = () => {
  email = document.forms.signup.email.value;
  password = document.forms.signup.password.value;
  if (email) {
    if (password) {
      hideMessages();
      showSuccess("Loading....");
      const data = { email, password };
      return data;
    } else showError("Password cannot be empty");
  }  else showError('Email cannot be empty');
};

const clearFormData = () => {
  document.forms.signup.email.value = '';
  document.forms.signup.password.value = '';
}

const postLogin = async (details) => {
  const URL = 'https://jessam-ireporter.herokuapp.com/api/v1/auth/login';
  let data = JSON.stringify(details);

  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  try {
    const fetchResult = fetch(
      new Request(URL, { method: 'POST', cache: 'reload', body: data, headers: headers })
    );
    
    const response = await fetchResult;
    const jsonData = await response.json();
    
    if(jsonData.status === 200) {
      clearFormData();
      setCookie('iReporterToken', jsonData.data[0].token, 30);
      setCookie('iReporterUsername', jsonData.data[0].user.username, 30);
      setCookie('iReporterFirstname', jsonData.data[0].user.firstname, 30);
      setCookie('iReporterLastname', jsonData.data[0].user.lastname, 30);
      setCookie('iReporterOthernames', jsonData.data[0].user.othernames, 30);
      showSuccess('You have been logged in successfully. Please <a href="create_record.html">click here</a> if you are not redirected automatically');
	  window.location.replace("create_record.html");
    } else {
      hideMessages();
      showError(jsonData.error);
    }
  } catch(e) {
		throw Error(e);
  }
}

document.getElementById("submit").addEventListener("click", (event) => {
	event.preventDefault ? event.preventDefault() : event.returnValue = false;
	if(validateForm()) {
		postLogin(validateForm());
	}
})
