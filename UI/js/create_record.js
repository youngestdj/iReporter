const validateForm = () => {
  title = document.forms.createRecord.title.value;
  recordType = document.forms.createRecord.recordType.value;
  longitude = document.forms.createRecord.longitude.value;
  latitude = document.forms.createRecord.latitude.value;
  comment = document.forms.createRecord.comment.value;

  if (title.trim().length > 1) {
    if (longitude.trim().length > 1) {
      if(latitude.trim().length > 1) {
        if (comment.trim().length > 1) {
          if (recordType === 'red-flags' || recordType === 'interventions') {
            showSuccess("Loading....");
            const location = `${latitude} ${longitude}`;
            return { title, recordType, location, comment };
          } else showError("Please select a record type");
        } else showError("Please enter a comment")
      } else showError("Please enter your latitude")
    } else showError("Please enter your longitude");
  } else showError("Title cannot be empty");
};

const clearFormData = () => {
  document.forms.createRecord.title.value = '';
  document.forms.createRecord.recordType.value = '';
  document.forms.createRecord.longitude.value = '';
  document.forms.createRecord.latitude.value = '';
  document.forms.createRecord.comment.value = '';
};

const postRecord = async (details, type) => {
  const URL = `https://jessam-ireporter.herokuapp.com/api/v1/${type}`;
  let data = JSON.stringify(details);

  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('x-access-token',  getCookie("iReporterToken"));
  try {
    const fetchResult = fetch(
      new Request(URL, { method: 'POST', cache: 'reload', body: data, headers: headers })
    );
    
    const response = await fetchResult;
    const jsonData = await response.json();

    if(jsonData.status === 201) {
      clearFormData();
      showSuccess(jsonData.data[0].message);
    } else {
      hideMessages();
      showError(jsonData.error);
    }
  } catch(e) {
		throw Error(e);
  }
};

document.getElementById("submit").addEventListener("click", (event) => {
	event.preventDefault ? event.preventDefault() : event.returnValue = false;
	if(validateForm()) {
		hideMessages();
		postRecord(validateForm(), validateForm().recordType);
	}
})
