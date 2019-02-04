const deleteRecord = async (record) => {
  const typeId = await getTypeId(record);

  if (type === 'intervention') type = 'interventions';

  showSuccess("Please wait....");
  const URL = `https://jessam-ireporter.herokuapp.com/api/v1/${typeId.type}/${typeId.id}`;
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('x-access-token',  getCookie("iReporterToken"));
  try {
    const fetchResult = fetch(
      new Request(URL, { method: 'DELETE', headers: headers })
    );
    
    const response = await fetchResult;
    const jsonData = await response.json();

    if (jsonData.status === 200) {
     hideMessages();
     showSuccess(jsonData.data[0].message);
    }
    else {
      hideMessages();
      showError(jsonData.error);
    }
  } catch(e) {
  throw Error(e);
  }
};

const getRecord = async (id, type) => {
  if (type === 'intervention') type = 'interventions';

  const URL = `https://jessam-ireporter.herokuapp.com/api/v1/${type}/${id}`;
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('x-access-token',  getCookie("iReporterToken"));
  try {
    const fetchResult = fetch(
      new Request(URL, { method: 'GET', headers: headers })
    );
    
    const response = await fetchResult;
    const jsonData = await response.json();

    if (jsonData.status === 200) {
     hideMessages();
     return jsonData.data[0];
    }
    else {
      hideMessages();
      showError(jsonData.error);
    }
  } catch(e) {
  throw Error(e);
  }
}

const showRecordDetails = async (record) => {
  const typeId = await getTypeId(record);
  
  // create modal
  const modal = createNode('div');
  modal.className = 'modal';
  modal.style.display = 'block';
  
  // modal body
  const modalContent = createNode('div');
  modalContent.className = 'modal-content';

  const loading = createNode('span');
  loading.innerHTML = 'Loading record...';
  
  const head = createNode('div');
  head.className = 'header';
  
  // close button 
  const close = createNode('span');
  close.className = 'close';
  close.innerHTML = '&times;';

  // location and comment textboxes
  const locationBox = createNode('textarea');
  const commentBox = createNode('textarea');

  commentBox.style.display = 'none';
  locationBox.style.display = 'none';
  
  // location and comment labels
  const commentText = createNode('span');
  const locationText = createNode('span');
  
  commentText.innerHTML = 'Comment';
  locationText.innerHTML = 'Location';

  commentText.style.display = 'none';
  locationText.style.display = 'none';

  const locationButton = createNode('button');
  locationButton.id = `l-${typeId.type}_${typeId.id}_`;
  locationButton.innerHTML = 'Update Location';
  locationButton.style.display = 'none';
  locationButton.className = 'edit-location';
  locationBox.className = locationButton.id; 

  const commentButton = createNode('button');
  commentButton.id = `c-${typeId.type}_${typeId.id}_`;
  commentButton.innerHTML = 'Update comment';
  commentButton.style.display = 'none';
  commentButton.className = 'edit-comment';
  commentBox.className = commentButton.id;

  append(head, close);
  append(modalContent, head);
  append(modalContent, locationText);
  append(modalContent, locationBox);
  append(modalContent, locationButton);
  append(modalContent, commentText);
  append(modalContent, commentBox);
  append(modalContent, commentButton);

  append(modalContent, loading);
  append(modal, modalContent);

  const body = document.getElementsByTagName("body")[0];
  append(body, modal);

  const singleRecord = await getRecord(typeId.id, typeId.type);
  loading.style.display = 'none';

  locationBox.value = singleRecord.location;
  commentBox.value = singleRecord.comment;

  commentText.style.display = 'inline';
  locationText.style.display = 'inline';
  commentBox.style.display = 'block';
  locationBox.style.display = 'block';
  locationButton.style.display = 'block';
  commentButton.style.display = 'block';
  
  close.onclick = () => {
    modal.style.display = "none";
  }
};

const editColumn = async (record, column, data) => {
  const typeId = await getTypeId(record);
  if (typeId.type === 'intervention') typeId.type = 'interventions';

  showSuccess("Updating record, please wait...");
  const URL = `https://jessam-ireporter.herokuapp.com/api/v1/${typeId.type}/${typeId.id}/${column}`;
  console.log(URL);
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('x-access-token',  getCookie("iReporterToken"));
  data = JSON.stringify(data);

  try {
    const fetchResult = fetch(
      new Request(URL, { method: 'PATCH', headers: headers, body: data })
    );
    
    const response = await fetchResult;
    const jsonData = await response.json();

    if (jsonData.status === 200) {
     hideMessages();
     const successMsg = `${jsonData.data[0].message}. Please <span class="reload">reload</span> page to see changes`;
     showSuccess(successMsg);
     closeModal();
     location.reload();
     reloadPage();
    }
    else {
      hideMessages();
      showError(jsonData.error);
    }
  } catch(e) {
  throw Error(e);
  }
};

const reloadPage = () => {
  const reload = document.querySelector('.reload');
  reload.onclick = () => {
    location.reload();
  }  
};

const closeModal = () => {
  const modal = document.querySelector('.modal');
  modal.style.display = 'none';
}

const getTypeId = async (record) => {
  let obj = {};
  obj.type = record.match(/\-(.*?)\_/)[1];
  obj.id = record.match(/\_(.*?)\_/)[1];
  return obj;
}

deleteButton = document.querySelectorAll('button.delete');
for(let i = 0; i < deleteButton.length; i++) {
  deleteButton[i].addEventListener('click', (e) => {
    e.preventDefault ? e.preventDefault() : (e.returnValue = false);
    let record = deleteButton[i].id;
    deleteRecord(record);
  });
}

editButton = document.querySelectorAll('button.edit');
for(let i = 0; i < editButton.length; i++) {
  editButton[i].addEventListener('click', async (e) => {
  e.preventDefault ? e.preventDefault() : (e.returnValue = false);
  record = editButton[i].id;
  await showRecordDetails(record);
  checkLocation();
  checkComment();
  })
};

const checkLocation = () => {
  locationButton = document.querySelector('.edit-location');
  locationButton.addEventListener('click', (e) => {
    e.preventDefault ? e.preventDefault() : (e.returnValue = false);
    record = locationButton.id;
    const locationClass = `.${record}`;
    let data = document.querySelector(locationClass).value;
    data = { location: data };
    editColumn(record, 'location', data);
  })  
};

const checkComment = () => {
  commentButton = document.querySelector('.edit-comment');
  commentButton.addEventListener('click', (e) => {
    e.preventDefault ? e.preventDefault() : (e.returnValue = false);
    record = commentButton.id;
    const commentClass = `.${record}`;
    console.log(commentClass);
    let data = document.querySelector(commentClass).value;
    data = { comment: data };
    editColumn(record, 'comment', data);
  })
}
