const showRecords = async (recordType) => {
  let redFlagsGroup = `.${recordType}`;
  redFlagsGroup = document.querySelector(redFlagsGroup);
  const redFlags = await getRecords(recordType);      

  if (redFlags) {
  	let current = 1;

    redFlags.map((redFlag) => {
    let newCount = parseInt(document.querySelector('.recordCount').innerHTML, 10) || 0;    
    document.querySelector('.recordCount').innerHTML = newCount+=1;
      createElements(current, redFlag, redFlagsGroup);
      current+=1;
    });
  }
  if(recordType === 'interventions') {
    // load script to delete/edit records
    let tag = document.createElement("script");
    tag.src = "js/record_ops.js";
    document.getElementsByTagName("body")[0].appendChild(tag);
  }};

const createButtons = async (redFlag) => {
  if(redFlag.status === 'draft') {
    const recordItem = createNode('div');
    recordItem.className = 'record-item center';

    const editButton = createNode('button');
    editButton.className = 'edit';
    editButton.innerHTML = 'Edit';
    editButton.id = `e-${redFlag.type}_${redFlag.id}_`;

    const deleteButton = createNode('button');
    deleteButton.className = 'delete';
    deleteButton.innerHTML = 'Delete';
    deleteButton.id = `d-${redFlag.type}_${redFlag.id}_`;

    append(recordItem, editButton);
    append(recordItem, deleteButton);

    return recordItem;
  }
};

showRecords('red-flags');
showRecords('interventions');