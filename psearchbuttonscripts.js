var validationFailed;
var validationText;


/* starts-validaton functions--------------------------------------------- */

function fastTrim(str) {
return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}


function CheckAllFields(PID,subsID,Client,DOB,PhoneNo,FName,LName,Add1,Add2,city,State,zip,memberID,EligCategory4,EligSubscriberAltID,ClientCaseNo,OtherSearch,CDR,TelehealthPID)
{
 
if(pega.u.d.getProperty("SearchCriteria.SearchType"))
	{var sType=pega.u.d.getProperty("SearchCriteria.SearchType")}
else	{var sType="";}


if(PID=="" && Client=="" && subsID=="" && DOB=="" && PhoneNo=="" && FName=="" && LName=="" && Add1=="" && Add2==""  && city=="" && zip=="" && State==" ")
{  	
      
   if (OtherSearch==1)
   {  
     if(CDR!="true" &&  EligCategory4=="" && EligSubscriberAltID=="" && ClientCaseNo =="")
	 {  validationFailed=true;
		validationText+="Please enter at least one search criteria.\n( OptumID / SubscriberID / Phone / LastName and FirstName / HealthID / Policy No / ClientCaseNo .)\n";
		return false;}
		
	else if (CDR=="true" &&  EligCategory4=="" && EligSubscriberAltID=="" )
	 {  validationFailed=true;
		validationText+="Please enter at least one search criteria.\n( OptumID / SubscriberID / Phone / LastName and FirstName / HealthID / Policy No.)\n";
		return false;}
		
		return true;
   }
   if (OtherSearch==2){
    if(TelehealthPID==""){
	validationFailed=true;
	validationText+="Please enter at least one search criteria.\n( OptumID / SubscriberID / Phone / LastName and FirstName / TelehealthPID.)\n";
		return false;
	} 
	return true;
	
   }
      
   else
   {validationFailed=true;
   validationText+="Please enter at least one search criteria.\n( OptumID / SubscriberID / Phone / LastName and FirstName.)\n"; 
   return false;   
   }
   
}

return true;
}



function CheckMinCriteria(PID,SubPID,PhoneNo,FName,LName,Client,DOB,CDR,Email,EligCategory4,EligSubscriberAltID,ClientCaseNo,OtherSearch,TelehealthPID)
{

if(PID=="" && SubPID=="" && PhoneNo=="" && FName=="" && LName=="" )
{

  if (OtherSearch==1)
   { 
          if(CDR!="true" &&  EligCategory4=="" && EligSubscriberAltID=="" && ClientCaseNo =="")
   {  validationFailed=true;
      validationText+="Please enter at least one search criteria.\n( OptumID / SubscriberID / Phone / LastName and FirstName / HealthID / Policy No/ ClientCaseNo.)\n";  
      return false;	  }
		else if(CDR=="true" &&  EligCategory4=="" && EligSubscriberAltID=="" )
        {  validationFailed=true;
            validationText+="Please enter at least one search criteria.\n( OptumID / SubscriberID / Phone / LastName and FirstName / HealthID / Policy No.)\n";  
            return false;	  } 
 
 return true;
   }
   
   if (OtherSearch==2){
    if(TelehealthPID==""){
	validationFailed=true;
	validationText+="Please enter at least one search criteria.\n( OptumID / SubscriberID / Phone / LastName and FirstName / TelehealthPID.)\n";
		return false;
	} 
	return true;
	
   }
      else
   { 
   validationFailed=true;
   validationText+="Please enter at least one of these fields.\n( OptumID / SubscriberID / Phone / LastName and FirstName.)\n";
 return false;   }   
  
}

if((CDR=="true" &&  PID=="" && SubPID=="" && PhoneNo=="" && Client=="" && DOB=="" && Email=="" )&& (FName!="" || LName!="") )
{
   validationFailed=true;
   validationText+="Please enter additional search criteria to Search with Last Name and First Name.( ClientID / DOB/ OptumID / SubscriberID / Phone /Email. )\n\n";   	
   return false;
}
 
if(PID=="" && SubPID=="" && PhoneNo=="" && (FName=="" || LName=="") )
{


 
if(FName==""){
validationFailed=true;

validateMinLength(FName,"First Name",1);
return false;
}

if(LName==""){
validationFailed=true;

validateMinLength(LName,"Last Name",1);
return false;
}
}

}

function validateSpecialChars(Name,StrName){
var iChars = "!`@#$%^&*()+=-[]\\\';,./{}|\":<>?~_";   

       for (var i = 0; i < Name.length; i++) 
           {       
		   if (iChars.indexOf(Name.charAt(i)) != -1) 
		      { validationFailed=true;
                           validationText+=StrName+" has special characters.These are not allowed. \n";
                                      return false; }
           } 
       return true;         
}

function validateSpecialCharsForNames(Name,StrName){
var iChars = "!`@#$%^&*()+=[]\\;,./{}|\":<>?~_";    

       for (var i = 0; i < Name.length; i++) 
           {       
		   if (iChars.indexOf(Name.charAt(i)) != -1) 
		      { validationFailed=true;
                           validationText+=StrName+" has special characters.These are not allowed. \n";
                                      return false; }
           } 
       return true;         
}

function validateNumericID(ID,StrName){
	var i;
    for (i = 0; i < ID.length; i++){   
       
        var c = ID.charAt(i);
        if (((c < "0") || (c > "9"))) {
        validationFailed=true;
        validationText+="Please enter valid numeric value for "+StrName+". \n";
                return false;}
    }
    
    return true;
}

function validateStringName(Name,StrName){
	var i;
    for (i = 0; i < Name.length; i++){   
       
        var c = Name.charAt(i);
         if (((c < 65) || (c > 90))) { 
if(c==" ")
{   return true; }

               validationFailed=true;
           validationText+="Please enter valid string value for "+StrName+".\n";
  return false;
     }
    }
    
    return true;
}

function validateNameLength(Name,StrName,max){

if(Name.length > max)
{  
  validationFailed=true;
        validationText+=StrName+" cannot have more than "+max+" characters \n";
    return false;
	}

}

function validateMinLength(Name,StrName,min){

if(Name.length < min)
{  
  validationFailed=true;
        validationText+=StrName+" require "+min+" or more characters \n";
    return false;
	}

}

function validateClientField(Client)
{
/*Check for Client Existence, In case of Client Access*/
var cLength = Client.length;

var isValid = "false";

for(var k=0;k<cLength;k++){
   if(Client.charAt(k) != " "){
       isValid = "true";
       break;
   }
}

if(isValid == "false"){   
  validationFailed=true;
   validationText+="Client is required for Search \n";
   return false;
}

}


/* DOB validations --------*/

function validateFutureDate(DOB)
{
	var dtCh="/";
	var pos1=DOB.indexOf(dtCh);
	var pos2=DOB.indexOf(dtCh,pos1+1);
	var strMonth=DOB.substring(0,pos1);
	var strDay=DOB.substring(pos1+1,pos2);
	var strYear=DOB.substring(pos2+1);
	month=parseInt(strMonth);
	day=parseInt(strDay);
	year=parseInt(strYear);

var myDate=new Date();
myDate.setFullYear(year,month-1,day);
var today = new Date();

if(myDate > today){validationFailed=true;
   validationText+="Please enter valid past date for DOB \n";
   return false;}
else
return true;
}

function isInteger(s){
	var i;
    for (i = 0; i < s.length; i++){   
       
        var c = s.charAt(i);
        if (((c < "0") || (c > "9"))) {return false;}
    }
    
    return true;
}

function stripCharsInBag(s, bag){
	var i;
    var returnString = "";

    for (i = 0; i < s.length; i++){   
        var c = s.charAt(i);
        if (bag.indexOf(c) == -1) {returnString += c;}
    }
    return returnString;
}

function daysInFebruary (year){
	
    return (((year % 4 == 0) && ( (!(year % 100 == 0)) || (year % 400 == 0))) ? 29 : 28 );
}
function DaysArray(n) {
	for (var i = 1; i <= n; i++) {
		this[i] = 31;
		if (i==4 || i==6 || i==9 || i==11) {this[i] = 30}
		if (i==2) {this[i] = 29}
   } 
   return this;
}




function isDate(dtStr){
var dtCh="/";
var minYear=1900;
var maxYear=2100;

	var daysInMonth = DaysArray(12);
	var pos1=dtStr.indexOf(dtCh);
	var pos2=dtStr.indexOf(dtCh,pos1+1);
	var strMonth=dtStr.substring(0,pos1);
	var strDay=dtStr.substring(pos1+1,pos2);
	var strYear=dtStr.substring(pos2+1);
	strYr=strYear;

	if (strDay.charAt(0)=="0" && strDay.length>1) {strDay=strDay.substring(1)}
	if (strMonth.charAt(0)=="0" && strMonth.length>1) {strMonth=strMonth.substring(1)}

	for (var i = 1; i <= 3; i++) {
		if (strYr.charAt(0)=="0" && strYr.length>1) {strYr=strYr.substring(1)}
	}

	month=parseInt(strMonth);
	day=parseInt(strDay);
	year=parseInt(strYr);

	if (pos1==-1 || pos2==-1){
		        validationFailed=true;
          validationText+="The date format should be : mm/dd/yyyy \n";
          return false;
		
	}
	if (strMonth.length<1 || month<1 || month>12){
                  validationFailed=true;
                  validationText+="Please enter a valid month \n";
		
		
	}
	if (strDay.length<1 || day<1 || day>31 || (month==2 && day>daysInFebruary(year)) || day > daysInMonth[month]){
		validationFailed=true;
        		validationText+="Please enter a valid day \n";
	
		
	}
	if (strYear.length != 4 || year==0 || year<minYear || year>maxYear){
		validationFailed=true;
        		validationText+="Please enter a valid 4 digit year between "+minYear+" and "+maxYear +"\n";
				
	}
	if (dtStr.indexOf(dtCh,pos2+1)!=-1 || isInteger(stripCharsInBag(dtStr, dtCh))==false){
		validationFailed=true;
                  validationText+="Please enter a valid date \n";
		
		
	}
	
	

}

/* End- DOB validations */

function validatePhoneNumber(elementValue){
var phoneNumberPattern = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

if(phoneNumberPattern.test(elementValue)==false)
{       validationFailed=true;
        validationText+="Invalid Value for  Phone No - Valid formats (123)-456-7890 or 123-456-7890 or 123456-7890 or 1234567890 \n";
  return false; }
else{return true ; }

}


/* End validation functions----------------------------------------------*/


function SearchParticipants(){

validationFailed=false;
validationText=""; 

var PID=pega.u.d.getProperty("SearchCriteria.PID");
var SubPID=pega.u.d.getProperty("SearchCriteria.SubPID");
var Client=pega.u.d.getProperty("SearchCriteria.ClientID");
var FName=pega.u.d.getProperty("SearchCriteria.FirstName");
var LName=pega.u.d.getProperty("SearchCriteria.LastName");
var DOB=pega.u.d.getProperty("SearchCriteria.DateofBirth");
var Phone=pega.u.d.getProperty("SearchCriteria.PhoneNumber");
var Add1=pega.u.d.getProperty("SearchCriteria.StreetAddress1");
var Add2=pega.u.d.getProperty("SearchCriteria.StreetAddress2");
var City=pega.u.d.getProperty("SearchCriteria.City");
var State=pega.u.d.getProperty("SearchCriteria.State");
var Zip=pega.u.d.getProperty("SearchCriteria.Zip");
var memberID=pega.u.d.getProperty("SearchCriteria.MemberID");
var participantTypeID=pega.u.d.getProperty("SearchCriteria.ParticipantTypeID");
var CDR=pega.u.d.getProperty("SearchCriteria.CDRSearch");
var EligCategory4=pega.u.d.getProperty("SearchCriteria.EligCategory4");
var EligSubscriberAltID=pega.u.d.getProperty("SearchCriteria.EligSubscriberAltID");
var Email=pega.u.d.getProperty("SearchCriteria.Email");
var ClientCaseNo=pega.u.d.getProperty("SearchCriteria.ClientCaseNo");
var OtherSearch=pega.u.d.getProperty("SearchCriteria.OtherSearch");
var TelehealthPID=pega.u.d.getProperty("SearchCriteria.TelehealthPID");
  

  PID=fastTrim(PID);
  SubPID=fastTrim(SubPID);
  FName=fastTrim(FName);
  LName=fastTrim(LName);
  Add1=fastTrim(Add1);
  Add2=fastTrim(Add2);
  City=fastTrim(City);
  Zip=fastTrim(Zip);
  if(EligCategory4){  EligCategory4=fastTrim(EligCategory4);} 
  if(EligSubscriberAltID){  EligSubscriberAltID=fastTrim(EligSubscriberAltID);}   
  if(TelehealthPID){  TelehealthPID=fastTrim(TelehealthPID);} 
  
  if(Email){  Email=fastTrim(Email);} 
  if(CDR){ CDR="true";} else { CDR="false";}
  if(memberID){  memberID=fastTrim(memberID);}
  if(participantTypeID){  participantTypeID=fastTrim(participantTypeID);}  
   if(ClientCaseNo){ClientCaseNo=fastTrim(ClientCaseNo);}


/* starts- Validation function calls------*/


if(clientOnlyAccessrole) {
  /*Check for Client Existence, In case of Client Access*/
   validateClientField(Client);					
}

if(!clientOnlyAccessrole) {
	if(fastTrim(ClientCount)==0)
	{ 
		validationText+="You do not have Clients assigned.\nSo you will not be able to view participant data.\nPlease Contact your supervisor.\n";
		validationFailed=true;
	}

}


if(CheckAllFields(PID,SubPID,Client,FName,LName,DOB,Phone,Add1,Add2,City,State,Zip,memberID,EligCategory4,EligSubscriberAltID,ClientCaseNo,OtherSearch,CDR,TelehealthPID))
     {CheckMinCriteria(PID,SubPID,Phone,FName,LName,Client,DOB,CDR,Email,EligCategory4,EligSubscriberAltID,ClientCaseNo,OtherSearch,TelehealthPID);}
	 
	 



if(PID){
validateNumericID(PID,"Optum ID") ;
validateSpecialChars(PID,"Optum ID") ;
}

if(SubPID)
{

validateSpecialChars(SubPID,"Subscriber ID") ;
}

if(FName)
{
validateStringName(FName,"First Name");
validateSpecialCharsForNames(FName,"First Name");
validateMinLength(FName,"First Name",1);
validateNameLength(FName,"First Name",25);
}

if(LName)
{
validateStringName(LName,"Last Name");
validateSpecialCharsForNames(LName,"Last Name");
validateMinLength(LName,"Last Name",1);
validateNameLength(LName,"Last Name",50);
}

if(DOB)
{

validateFutureDate(DOB);
isDate(DOB);
}

if(Phone)	{
validatePhoneNumber(Phone);
}

if(Add1)
{
validateSpecialCharsForNames(Add1,"Address1");
}

if(Add2)
{
validateSpecialCharsForNames(Add2,"Address2");
}

if(City)
{
validateStringName(City,"City");
validateSpecialCharsForNames(City,"City");
}


if(Zip)
{
validateNumericID(Zip,"Zip");
}

if(memberID)
{
validateNumericID(memberID,"Health Plan ID") ;
validateSpecialChars(memberID,"Health Plan ID") ;
}


if(validationFailed)
{alert(validationText);
return false;
}

/* Ends- Validation function calls------*/

var oSafeURL = new SafeURL('Data-Portal.SearchParticipantAll');
if(PID)	oSafeURL.put("PID",PID);
if(SubPID)oSafeURL.put("SubscriberID",SubPID);	
if(Client)oSafeURL.put("ClientID",Client);	
if(FName)	oSafeURL.put("FirstName",FName);	
if(LName)	oSafeURL.put("LastName",LName);
if(DOB)	oSafeURL.put("DOB",DOB);	
if(Phone)	oSafeURL.put("PhoneNo",Phone);	
if(Add1)	oSafeURL.put("Address1",Add1);	
if(Add2)	oSafeURL.put("Address2",Add2);	
if(City)	oSafeURL.put("City",City);	
if(State)	oSafeURL.put("State",State);	
if(Zip)	oSafeURL.put("Zip",Zip);
if(EligCategory4)	oSafeURL.put("EligCategory4",EligCategory4);
if(EligSubscriberAltID)	oSafeURL.put("EligSubscriberAltID",EligSubscriberAltID);
if(ClientCaseNo)	oSafeURL.put("ClientCaseNo",ClientCaseNo);
if(OtherSearch)	oSafeURL.put("OtherSearch",OtherSearch);
if(TelehealthPID)	oSafeURL.put("TelehealthPID",TelehealthPID);

if(Email)	oSafeURL.put("Email",Email);
if(CDR) oSafeURL.put("CDRSearch",CDR);
if(memberID) oSafeURL.put("MemberEligId",memberID);
if(participantTypeID) oSafeURL.put("ParticipantTypeID",participantTypeID);



			var busyIndicator = new pega.ui.busyIndicator();
			busyIndicator.setVisibility(true);
			busyIndicator.setMessage("Please wait.. Searching Participants..");
			busyIndicator.show();
  
			 var myCallback = { 
				success: function(o) {	
									  
						var URL = new SafeURL('Alere-FW-Apollo-Data-Search-Apollo.GetUHCClientByPolicy');
                  		var Callback = { 
									success: function(o) {	
                                      if(o.responseText == "Y"){
                                      pega.u.d.reloadSection(pega.u.d.getSectionByName("SearchParticipantLeft_Inner2"), "", "", false, false, -1, false);
                                      }
                                     
                						},
                          failure: function(o) {

					
			                                  } 
				                     };
                 var Connection = pega.util.Connect.asyncRequest('Post', URL.toURL(),  Callback, ''); 
                  
                  
parent._setResultsFrame(pxReqURI + '?pyActivity=SetHomePageIframes&SectionName=SearchResults&pzPrimaryPageName=pyPortal');
                             
                  


					var interval_iframeCheck = setInterval(function(){
						var docElem = parent.frames["home_results_iframe"].document;
						if(docElem){
							if(docElem.readyState == "complete"){
								clearInterval(interval_iframeCheck);
								busyIndicator.hide();
							}
						} 
					}, 300);
									
				}, 
				failure: function(o) {

					busyIndicator.hide();
			         } 
				};
				
				var myConnection = pega.util.Connect.asyncRequest('Post', oSafeURL.toURL(),  myCallback, '');
			

}


function reloadMySection() {
	pega.u.d.reloadSection(null, "", "", false, true, '-1', false);
}