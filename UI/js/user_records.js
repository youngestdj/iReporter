const getRecords = async (type) => {
  getRecords.called = true;
  showSuccess("Loading records...");
  const URL = `https://jessam-ireporter.herokuapp.com/api/v1/${type}`;
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
     return jsonData.data;
    }
    else {
      hideMessages();
      showError(jsonData.error);
      return false;
    }
  } catch(e) {
	throw Error(e);
  }
};

const createElements = async (current, redFlag, redFlagsGroup) => {
  // create html elements
  const fieldset = createNode('fieldset');
  const legend = createNode('legend');

  const adminRecordGroup = createNode('div');
  adminRecordGroup.className = "admin-record-group";

  // title
  const titleRecordItem = createNode('div');
  titleRecordItem.className = "record-item";

  const tTitle = createNode('span');
  tTitle.className = 'title';
  tTitle.innerHTML = 'Title:';

  const tContent = createNode('span');
  tContent.className = 'content';
  tContent.innerHTML = redFlag.title;

  append(titleRecordItem, tTitle);
  append(titleRecordItem, tContent);


  // coordinates
  const coRecordItems = createNode('div');
  coRecordItems.className = 'record-item';

  const coTitle = createNode('span');
  coTitle.className = 'title';
  coTitle.innerHTML = 'Coordinates:';

  const coContent = createNode('span');
  coContent.className = 'content';
  coContent.innerHTML = redFlag.location;

  append(coRecordItems, coTitle);
  append(coRecordItems, coContent);


  // Status
  const statusRecordItems = createNode('div');
  statusRecordItems.className = 'record-item';

  const sTitle = createNode('span');
  sTitle.className = 'title';
  sTitle.innerHTML = 'Status:';

  const sContent = createNode('span');
  sContent.className = 'content';
  sContent.innerHTML = redFlag.status;

  append(statusRecordItems, sTitle);
  append(statusRecordItems, sContent);


  // Comment
  const commentRecordItems = createNode('div');
  commentRecordItems.className = 'record-item';

  const cTitle = createNode('span');
  cTitle.className = 'title';
  cTitle.innerHTML = 'Comment:';

  const cContent = createNode('span');
  cContent.className = 'content';
  cContent.innerHTML = redFlag.comment;

  append(commentRecordItems, cTitle);
  append(commentRecordItems, cContent);


  // legend
  legend.innerHTML = `(${current}) ${redFlag.createdon}`;
  append(fieldset, legend);
  append(fieldset, titleRecordItem);
  append(fieldset, coRecordItems);
  append(fieldset, statusRecordItems);
  append(fieldset, commentRecordItems);
  if (typeof createButtons === 'function') {
    const buttons = await createButtons(redFlag);
    append(fieldset, buttons);
  }
  append(adminRecordGroup, fieldset);
  append(redFlagsGroup, adminRecordGroup);
};
