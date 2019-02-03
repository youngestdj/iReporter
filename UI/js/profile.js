document.querySelector('#firstname').innerHTML = getCookie("iReporterFirstname");
document.querySelector('#lastname').innerHTML = getCookie("iReporterLastname");
document.querySelector('#othernames').innerHTML = getCookie("iReporterOthernames");

const showRecords = async (recordType) => {
  let redFlagsGroup = `.${recordType}`;
  redFlagsGroup = document.querySelector(redFlagsGroup);
  const redFlags = await getRecords(recordType);      

  if (redFlags) {
  	let current = 1;

    redFlags.map((redFlag) => {
      incrementCounter(redFlag);
      createElements(current, redFlag, redFlagsGroup);
      current+=1;
    });
    
  }
};

const incrementCounter = (redFlag) => {
    // increment status counter
    let newCount = parseInt(document.querySelector('#newCount').innerHTML, 10) || 0;
    let resolvedCount = parseInt(document.querySelector('#resolvedCount').innerHTML, 10) || 0;
    let rejectedCount = parseInt(document.querySelector('#rejectedCount').innerHTML, 10) || 0;
    let uInvestigationCount = parseInt(document.querySelector('#uInvestigationCount').innerHTML, 10) || 0;

    if (redFlag.status === 'draft') document.querySelector('#newCount').innerHTML = newCount+=1;
    else if (redFlag.status === 'resolved') document.querySelector('#resolvedCount').innerHTML = resolvedCount+=1;
    else if (redFlag.status === 'rejected') document.querySelector('#rejectedCount').innerHTML = rejectedCount+=1;
    else if (redFlag.status === 'under investigation') document.querySelector('#uInvestigationCount').innerHTML = uInvestigationCount+=1;
};

showRecords('red-flags');
showRecords('interventions');
