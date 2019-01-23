const success = document.getElementById('success');
const error = document.getElementById('error');

const createNode = (element) => {
    return document.createElement(element);
};

const append = (parent, el) => {
    return parent.appendChild(el);
};

const showSuccess = (message) => {
	success.style.visibility = 'visible';
	success.innerHTML = message;
};

const hideMessages = () => {
	error.style.visibility = 'hidden';
	success.style.visibility = 'hidden';	
};

const showError = (message) => {
	error.style.visibility = 'visible';
	error.innerHTML = message;
};

if (document.querySelector(".username")) {
  const username = `@${getCookie("iReporterUsername")}`;
  document.querySelector(".username").innerHTML = username;
}

