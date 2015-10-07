/**
 * Created by ajb3 on 8/11/2015.
 */
monitModule.controller('monitoringController',['$scope','$filter','monFactory','loginService','auditFactory','uiGridGroupingConstants','$modal','$timeout',function($scope,$filter,monFactory,loginService,auditFactory,uiGridGroupingConstants,$modal,$timeout){
    /*var monitpage=auditFactory.insertData;
    var pageViewed=auditFactory.pageviewed;
    var page=monitpage.data.pageViewed;
    var currentpage="Monitoring";
    var duplicatepage;
    if(currentpage){
        angular.forEach(page, function(value){
            if(currentpage.toLowerCase() == value.toLowerCase()){
                duplicatepage = true;
            }
        });
        if(!duplicatepage){
            page.push(currentpage);
        }
    }*/
    var monitpage=auditFactory.insertData;
    var page=auditFactory.pageviewed;
    var action=auditFactory.monitoringaction;
    var actiontaken=auditFactory.actionTaken;
    var monitaction=monitpage.data;
    var currentpage="Monitoring";
    var duplicatepage;
    if(currentpage){
        angular.forEach(page, function(value){
            if(currentpage.toLowerCase() == value.toLowerCase()){
                duplicatepage = true;
            }
        });
        if(!duplicatepage){
            page.push(currentpage);
        }
    }
    monitpage.data.pageViewed=page;
    $scope.message= "I am from Monitoring Page";

    //Dynamic
   /* $scope.templateList=[
        {name:"Send Transaction View", code:"SEND"},
        {name:"Receive Transaction View", code:"RECEIVE"},
        {name:"Consumer Transaction View", code:"BOTH"},
        {name:"All Transaction View", code:"ALL"}
    ];*/

    //Static
    $scope.dateRangeList=[
        {name:"Last 1 Day", code: "1"},
        {name:"Last 7 Days", code:"7"},
        {name:"Last 15 Days", code:"15"},
        {name:"Last 35 Days", code:"35"},
        {name:"Last 60 Days", code:"60"},
        {name:"Last 90 Days", code:"90"}
    ];



    $scope.initial_view ="optional_icon";
    $scope.toggle_view = function() {

        if ($scope.initial_view === "optional_icon")
            $scope.initial_view = "optional_icon_toggle";
        else
            $scope.initial_view = "optional_icon";

    };


    //Static
    $scope.transactionList=[
        {name:"Send", code:"SEND"},
        {name:"Receive", code:"RECEIVE"},
        {name:"Both", code:"BOTH"}

    ];

    $scope.patternList =[
        { name: "Sharing Photo IDs", code:"PHOTOID-SHARE"},
        { name: "Sharing Legal IDs", code:"LEGALID-SHARE"},
        { name: "Sharing Phone #s",  code:"PHONE-SHARE"},
        { name: "Sharing Address",  code:"ADDRESS-SHARE"},
        { name:" Multiple Photo IDs", code:"PHOTOID-MULTIPLE"},
        { name:" Multiple Legal IDs", code:"LEGALID-MULTIPLE"},
        { name:" Multiple Phone #s", code:"PHONE-MULTIPLE"},
        { name:" Multiple Address", code:"ADDRESS-MULTIPLE"},
        { name:" Multiple Send", code:"SEND-MULTIPLE"},
        { name:" Multiple Receive", code:"RECEIVE-MULTIPLE"},
        { name:"Send Aggregate Amount", code:"SEND-AGGREGATE"},
        { name:"Receive Aggregate Amount", code:"RECEIVE-AGGREGATE"},
        { name:" Flipping", code:"FLIP"},
        {name: "No Pattern", code:"NO-PATTERN"}
    ];


    var inputData={"data":{"userId":loginService.userId.get()}};
    $scope.givenName=loginService.givenName.get();

    if(loginService.userType.get()=='E'){
        $scope.disableHq= true;
    }
    else{
        $scope.disableHq=false;
    }
    //Need to comment this in integration
    //inputData.data.userId= "addtest2";
    if(inputData.data.userId){
        $scope.loadingMessage="Loading Filter Data ....";
        monFactory.getData(inputData).then(function success(responseData){
                $scope.loadingMessage="";
                if(responseData.response.data.filterDetails) {
                    if(responseData.response.data.filterDetails.error) {
                        $scope.alerts = [
                            { type: 'danger', msg: responseData.response.data.filterDetails.error },
                        ];
                        $scope.loadingMessage="";
                        return;
                    }
                    var countryObjectData = responseData.response.data.filterDetails.countryInfo;
                    var productObjectData = responseData.response.data.filterDetails.prodInfo;
                    var locationObjectData = responseData.response.data.filterDetails.hierarchyData;
                    var hqObjectData= responseData.response.data.filterDetails.hqToBeDisplayed;

                    //var hierarchyInfo = responseData.response.data.filterDetails.hierarchyInfo;
                    var templateObjectData=responseData.response.data.filterDetails.templateList;

                    var countryList = [], prodInfoList = [], division1List = [], division2List = [], locationList = [], templateList=[];

                    for (var i = 0; i < countryObjectData.length; i++) {
                        countryList.push(countryObjectData[i]);
                    }
                    for (var i = 0; i < productObjectData.length; i++) {
                        prodInfoList.push(productObjectData[i]);
                    }
                    for (var i = 0; i < locationObjectData.length; i++) {
                        locationList.push(locationObjectData[i]);
                    }
                    for (var i = 0; i < templateObjectData.length; i++) {
                        templateList.push(templateObjectData[i]);
                    }

                    $scope.countryList = countryList;
                    $scope.productList = prodInfoList;
                    $scope.locationList = locationList;
                    $scope.templateList= templateList;

                    if(loginService.userType.get()=='E'){
                        //External Agent
                        $scope.selectedHq={"name": hqObjectData.name, "code": hqObjectData.code }
                    }
                    else
                    {
                        //Internal User
                        //$scope.hqList= responseData.response.data.filterDetails.internalAccountList ;
                    }
                }
            }
        );
    }


    /* Grid Search functionality */
    $scope.refreshData=function(termObj){
        $scope.gridOptions.data = $scope.transData;

        while (termObj) {
            var oSearchArray = termObj.split(' ');
            $scope.gridOptions.data = $filter('filter')($scope.gridOptions.data, oSearchArray[0], undefined);
            oSearchArray.shift();
            termObj = (oSearchArray.length !== 0) ? oSearchArray.join(' ') : '';
        }
    }

    $scope.refresh= function(obj){
        $scope.selectedTransaction= obj;
    }

    var commonConsumerDefs =
        [
            { field: 'consumerLegacyReferenceNumber', displayName: 'Reference Number', width: 100},
            { field: 'consumerTranDate', displayName: 'Transaction Date', width: 150},
            { field: 'consumerTranTime', displayName: 'Transaction Time', width: 150},
            { field: 'consumerLastName', displayName: 'Last Name', width: 150},
            { field: 'consumerPhoneNumber', displayName: 'Phone Number', width: 160},
            { field: 'consumerIdPhoto', displayName: 'Photo Id', width: 150},
            { field: 'consumerIdTypePhoto', displayName: 'Photo Id Type', width: 100},
            { field: 'consumerBirthDate', displayName: 'Birth Date', width: 150},
            { field: 'consumerIdTypeLegal', displayName: 'Legal Id Type', width: 100},
            { field: 'consumerIdLegal', displayName: 'Legal Id', width: 150},
            { field: 'consumerAddr1', displayName: 'Address', width: 150},
            { field: 'consumerCity', displayName: 'City', width: 150},
            { field: 'consumerState', displayName: 'State', width: 100},
            { field: 'consumerCountry', displayName: 'Country', width: 100},
            { field: 'consumerCardId', displayName: 'Card Id', width: 100},
            { field: 'consumerTranType', displayName: 'Transaction Type', width: 150},
            { field: 'consumerFaceUSDAmount', displayName: 'Face Amount(USD)', width: 150},
            { field: 'consumerFirstName', displayName: 'First Name', width: 150},
            { field: 'consumerMiddleName', displayName: 'Middle Name', width: 150},
            { field: 'uniqueConsumer', displayName:'', width:5 }
        ];
    var commonSenderDefs=[

        { field: 'sendLegacyReferenceNumber', displayName: 'Legacy Reference #', width: 150},
        { field: 'sendFaceUSDAmount', displayName: 'Face Amount(USD)', width: 100},
        { field: 'sendDate', displayName: 'Send Date', width: 150},
        { field: 'sendTime', displayName: 'Send Time', width: 150},
        { field: 'sendConsumerFirstName', displayName: 'Sender First Name', width: 150},
        { field: 'sendConsumerMiddleName', displayName: 'Sender Middle Name', width: 150},
        { field: 'sendConsumerLastName', displayName: 'Sender Last Name', width: 150},
        { field: 'sendConsumerAddr1', displayName: 'Address', width: 150},
        { field: 'sendConsumerCity', displayName: 'City', width: 150},
        { field: 'sendConsumerState', displayName: 'State', width: 100},
        { field: 'sendConsumerCountry', displayName: 'Sender Country', width: 100},
        { field: 'sendConsumerPhoneNumber', displayName: 'Phone Number', width: 160},
        { field: 'sendConsumerIdLegal', displayName: 'Legal Id', width: 150},
        { field: 'sendConsumerIdTypeLegal', displayName: 'Legal Id Type', width: 100},
        { field: 'sendConsumerBirthDate', displayName: 'Birth Date', width: 150},
        { field: 'sendConsumerIdPhoto', displayName: 'Photo Id', width: 150},
        { field: 'sendConsumerIdTypePhoto', displayName: 'Photo Id Type', width: 100},
        { field: 'sendConsumerCardId', displayName: 'Card Id', width: 100},
        { field: 'intdRecConsumerFirstName', displayName: 'Receiver First Name', width: 150},
        { field: 'intdRecConsumerLastName', displayName: 'Receiver Last Name', width: 150},
        { field: 'intdRecConsumerState', displayName: 'Receiver State', width: 150},
        { field: 'intdRecConsumerCountry', displayName: 'Receiver Country', width: 150},
        { field: 'sendconsumerdkey', displayName:'', width:1 }


    ];
    var commonReceiverDefs=[
        { field: 'receiveLegacyReferenceNumber', displayName: 'Legacy Reference#', width: 150},
        { field: 'receiveFaceUSDAmount', displayName: 'Face Amount(USD)', width: 150},
        { field: 'receiveDate', displayName: 'Receive Time', width: 150},
        { field: 'receiveTime', displayName: 'Receive Time', width: 150},
        { field: 'recSendConsumerFirstName', displayName: 'Sender First Name', width: 150},
        { field: 'recSendConsumerLastName', displayName: 'Sender Last Name', width: 150},
        { field: 'recSendConsumerState', displayName: 'Sender State', width: 150},
        { field: 'recSendConsumerCountry', displayName: 'Sender Country', width: 150},
        { field: 'receiveConsumerFirstName', displayName: 'Receiver First Name', width: 150},
        { field: 'receiveConsumerMiddleName', displayName: 'Receiver Middle Name', width: 150},
        { field: 'receiveConsumerLastName', displayName: 'Receiver Last Name', width: 150},
        { field: 'receiveConsumerAddr1', displayName: 'Address', width: 150},
        { field: 'receiveConsumerState', displayName: 'State', width: 150},
        { field: 'receiveConsumerCity', displayName: 'City', width: 150},
        { field: 'receiveConsumerCountry', displayName: 'Country', width: 150},
        { field: 'receiveConsumerPhoneNumber', displayName: 'Phone Number', width: 160},
        { field: 'receiveConsumerIdLegal', displayName: 'Legal Id', width: 150},
        { field: 'receiveConsumerIdTypeLegal', displayName: 'Legal Id Type', width: 100},
        { field: 'receiveConsumerBirthDate', displayName: 'Birth Date', width: 150},
        { field: 'receiveConsumerIdPhoto', displayName: 'Photo Id', width: 150},
        { field: 'receiveConsumerIdTypePhoto', displayName: 'Photo Id Type', width: 100},
        { field: 'receiveConsumerCardId', displayName: 'Card Id', width: 100},
        { field: 'receiveconsumerdkey', displayName:'', width:1 }
    ];

    var parentTemplateDefs=[];
    $scope.exportXls=function() {
        alasql('SELECT * INTO XLSX("result.xlsx",{headers:true})FROM?', [$scope.transData]);
    };
    $scope.exportPdf = function () {
        var myElement = angular.element(document.querySelectorAll(".custom-csv-link-location"));
        $scope.gridApi.exporter.pdfExport('all', 'all', myElement);
    };
    $scope.selectedTemplateChoice= function(choice){
        $scope.selectedTemplate= choice;
        //Consumer Information: Both
        $scope.templateName='';
        if(choice.templateId=='3'){
            $scope.columnDefs=commonConsumerDefs;
            parentTemplateDefs=commonConsumerDefs;
            $scope.selectedTransaction=  {name:"Both", code:"BOTH"};

            $scope.selectedSendCountry={name:"", code:""};
            $scope.selectedReceiveCountry={name:"", code:""};

            $scope.disableReceiveCountry = false;
            $scope.disableSendCountry= false;
            $scope.templateType=choice.templateName;
        }
        //Send Transaction: Send
        else if(choice.templateId=='1'){
            $scope.columnDefs=commonConsumerDefs;
            parentTemplateDefs=commonConsumerDefs;
            $scope.selectedTransaction=  {name:"Send", code:"SEND"};

            $scope.selectedSendCountry={name:"UNITED STATES", code:"US"};
            $scope.selectedReceiveCountry={name:"", code:""};

            $scope.disableReceiveCountry = false;
            $scope.disableSendCountry= true;
            $scope.templateType=choice.templateName;

        }
        //Receive Transaction: Receive
        else if(choice.templateId=='2'){
            $scope.columnDefs=commonConsumerDefs;
            parentTemplateDefs=commonConsumerDefs;
            $scope.selectedTransaction=  {name:"Receive", code:"RECEIVE"};

            $scope.selectedReceiveCountry={name:"UNITED STATES", code:"US"};
            $scope.selectedSendCountry={name:"", code:""};

            $scope.disableReceiveCountry = true;
            $scope.disableSendCountry= false;
            $scope.templateType=choice.templateName;
        }
        //for custom templates
        else{
            $scope.templateName=choice.templateName;
            fetchCustomTemplateFilterData(choice);
        }
    }

    var fetchCustomTemplateFilterData= function(choice){

        var inputData= {data: {userId: loginService.userId.get(), templateId:choice.templateId }};

        monFactory.getCustomTemplateFilterData(inputData).then(function success(response){
            if(response.response.data) {
                if (response.response.data.userPreferenceInputDetails) {
                    var inputObject = response.response.data.userPreferenceInputDetails.input;
                    if(inputObject) {
                        $scope.datepickers.startDate = inputObject.startDate;
                        $scope.selectedProduct.name = inputObject.prodType;
                        $scope.selectedLocation.name = inputObject.accountNumber;
                        $scope.datepickers.endDate = inputObject.endDate;
                        // Need to include all the filter Names
                    }
                    $scope.templateType = response.response.data.userPreferenceInputDetails.templateType;
                    assignParentTemplateDefs();
                }
            }
        });

    };
    var assignParentTemplateDefs=function(){

        // These template names should be same through out when fetch and update.
        switch($scope.templateType){
            case "Consumer Information":{
                parentTemplateDefs= commonConsumerDefs;
                break;
            }
            case "Receive Transaction":{
                parentTemplateDefs= commonSenderDefs;
                break;
            }
            case "Send Transaction":{
                parentTemplateDefs= commonReceiverDefs;
                break;
            }
        }

    };
    $scope.viewTransactions= function viewTransactions(){

        var currentaction="View";
        var duplicateaction;
        if(currentaction){
            angular.forEach(action, function(value){
                if(currentaction.toLowerCase() == value.toLowerCase()){
                    duplicateaction = true;
                }
            });
            if(!duplicateaction){
                action.push(currentaction);
            }
        }
        monitaction.actionTaken=actiontaken;
        monitaction.actionTaken.Monitoring=action;
        $scope.loadingMessage="Fetching Data ....";
        //$scope.columnDefs=[];
        /*if(!$scope.templateType){
            $scope.templateType= $scope.selectedTemplate.templateName;
        }*/
        var transactionRequest= {
            data: {
                "userId":loginService.userId.get(),
                "templateId":$scope.selectedTemplate.templateId,
                "templateType":$scope.templateType,
                "input": {
                    "prodType": $scope.selectedProduct.code,
                    //"serviceType": $scope.selectedTransaction.code,
                    "accountNumber": $scope.selectedLocation.code,
                    "minFaceAmount": $scope.faceMinAmount,
                    "maxFaceAmount": $scope.faceMaxAmount,
                    "phoneNumber": $scope.phoneNumber,
                    "firstName": $scope.firstName,
                    "lastName": $scope.lastName,
                    "startDate": $filter('date')($scope.datepickers.startDate, 'MM/dd/yyyy'),
                    "endDate": $filter('date')($scope.datepickers.endDate, 'MM/dd/yyyy'),
                    "sendCountry": $scope.selectedSendCountry.code,
                    "receiveCountry": $scope.selectedReceiveCountry.code,
                    "dateRange": $scope.dateRangeList.code
                }
            }
        }
        var paginationOptions = {
            pageNumber: 1,
            pageSize: 25,
            sort: null
        };

        $scope.gridOptions = {
            enableSorting: true,
            paginationPageSizes: [25, 50, 75],
            paginationPageSize: 25,
            //useExternalPagination: true,
            treeRowHeaderAlwaysVisible: false,
            columnDefs:$scope.columnDefs,

            /* Export CSV, PDF */
            /*enableGridMenu: true,*/
            enableSelectAll: true,
            exporterCsvFilename: 'Transaction Data.csv',
            exporterPdfDefaultStyle: {fontSize: 9},
            exporterPdfTableStyle: {margin: [30, 30, 30, 30]},
            exporterPdfTableHeaderStyle: {fontSize: 10, bold: true, italics: true, color: 'red'},
            exporterPdfHeader: {text: "Transaction Result", style: 'headerStyle'},
            exporterPdfFooter: function (currentPage, pageCount) {
                return {text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle'};
            },
            exporterPdfCustomFormatter: function (docDefinition) {
                docDefinition.styles.headerStyle = {fontSize: 22, bold: true};
                docDefinition.styles.footerStyle = {fontSize: 10, bold: true};
                return docDefinition;
            },
            exporterPdfOrientation: 'portrait',
            exporterPdfPageSize: 'LETTER',
            exporterPdfMaxGridWidth: 500,
            exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),


            onRegisterApi: function(gridApi) {
                $scope.gridApi = gridApi;
            }
        };

        monFactory.getTransactionData(transactionRequest).then(function success(response){

                if(response.response.data){
                    var transactionResponse= response.response.data.userPreferenceOutputDetails;
                    if(transactionResponse){
                        if(transactionResponse.totalCount==0) {
                            $scope.alerts = [
                                { type: 'danger', msg: 'No records have returned for the given search. Please modify it and try again.' },
                            ];
                            $scope.loadingMessage="";
                            return;
                        }
                        if(transactionResponse.error) {
                            $scope.alerts = [
                                { type: 'danger', msg: response.response.data.userPreferenceOutputDetails.error },
                            ];
                            $scope.loadingMessage="";
                            return;
                        }
                        //This is only for Custom Template guys
                        if(transactionResponse.output){
                            if($scope.selectedTemplate.templateId=="1" || $scope.selectedTemplate.templateId=="2" || $scope.selectedTemplate.templateId=="3") {

                            }
                            else{
                                $scope.columnDefs=[];
                                /*  parentTemplateDefs=transactionResponse.output;
                                 $scope.columnDefs=parentTemplateDefs;*/
                                var templateColumns = transactionResponse.output;
                                parentTemplateDefs.forEach(function (column) {
                                    for (var i in templateColumns) {
                                        if (templateColumns[i].field == column.field) {
                                            column.displayOrder = templateColumns[i].displayOrder;
                                            column.sortOrder = templateColumns[i].sortOrder;
                                            $scope.columnDefs.push(column);
                                        }
                                    }
                                });
                            }
                        }
                        $scope.transData=transactionResponse.outputData;
                        if($scope.transData) {
                            $scope.gridOptions.data = $scope.transData;
                        }
                    }
                }
                $scope.loadingMessage="";

            }
        );


    }
    /*  Drop down Controls*/

    $scope.selectedTransactionChoice= function(choice){
        $scope.selectedTransaction= choice;
    };

    var setBlankConsumer= function(){
        /*$scope.gridApi.grid.columns.forEach(function(column){
            if(column.code == 'uniqueConsumer'){
                column.width=1;
                column.displayName=' ';
            }
        });*/

        $scope.gridOptions.columnDefs.forEach(function(column){
            if(column.field == 'uniqueConsumer'){
                column.width=1;
                column.displayName='';
            }
        });

    };

    var setUniqueConsumer=function(){

        /*$scope.gridApi.grid.columns.forEach(function(column){
            if(column.field == 'uniqueConsumer'){
                column.width=550;
                column.displayName='Consumer';
            }
        });*/

        $scope.gridOptions.columnDefs.forEach(function(column){
            if(column.field == 'uniqueConsumer'){
                column.width=550;
                column.displayName='Consumer';
            }
        });
    }
    $scope.selectedPatternChoice= function(choice){

        $scope.selectedPattern= choice;
        var updatedGridData=[];
        var clonedGridData=[];
        var aggregateMinAmount= $scope.aggregateMinAmount;
        switch (choice.code){
            case "PHOTOID-SHARE":{
                //$scope.gridOptions.columnDefs=$scope.columnDefs;
                setBlankConsumer();
                /*clonedGridData=$scope.transData;
                clonedGridData.forEach(function(record){
                    for(var i=0,len=clonedGridData.length;i<len;i++){
                        if(clonedGridData[i].consumerIdPhoto == record.consumerIdPhoto){
                            updatedGridData.push (record);
                        }
                    }
                });
                $scope.gridOptions.data=updatedGridData;*/
                $scope.gridOptions.data=$scope.transData;
                $scope.gridApi.grouping.clearGrouping();
                $scope.gridApi.grouping.groupColumn('consumerIdPhoto');

                break;
            }
            case "PHONE-SHARE":{
                //$scope.gridOptions.columnDefs=$scope.columnDefs;
                setBlankConsumer();
                $scope.gridOptions.data=$scope.transData;
                $scope.gridApi.grouping.clearGrouping();
                $scope.gridApi.grouping.groupColumn('consumerPhoneNumber');

                break;
            }
            case "LEGALID-SHARE": {
                //$scope.gridOptions.columnDefs=$scope.columnDefs;
                setBlankConsumer();
               /* clonedGridData=$scope.transData;
                clonedGridData.forEach(function(record){
                    for(var i=0,len=clonedGridData.length;i<len;i++){
                        if(clonedGridData[i].consumerIdLegal == record.consumerIdLegal){
                            updatedGridData.push (record);
                        }
                    }
                });
                $scope.gridOptions.data=updatedGridData;*/
                $scope.gridOptions.data=$scope.transData;
                $scope.gridApi.grouping.clearGrouping();
                $scope.gridApi.grouping.groupColumn('consumerIdLegal');

                break;
            }
            case "ADDRESS-SHARE":{
                setBlankConsumer();
                $scope.gridOptions.data=$scope.transData;
                $scope.gridApi.grouping.clearGrouping();
                $scope.gridApi.grouping.groupColumn('consumerAddr1');

                break;
            }
            case "PHOTOID-MULTIPLE":{
                //$scope.gridOptions.columnDefs=$scope.columnDefs;
                //setUniqueConsumer();
                $scope.gridApi.grouping.clearGrouping();
                clonedGridData= $scope.transData;
                clonedGridData.forEach(function(record){
                    record.uniqueConsumer=  record.consumerLastName + "," + record.consumerFirstName + "," + record.consumerAddr1 + "," + record.consumerPhoneNumber + "," + record.consumerCountry;
                });

                clonedGridData.forEach(function(record){
                    for(var i=0,len=clonedGridData.length;i<len;i++){
                        if(clonedGridData[i].uniqueConsumer == record.uniqueConsumer && clonedGridData[i].consumerIdPhoto !=record.consumerIdPhoto){
                            updatedGridData.push (record);
                        }
                    }

                });
                updatedGridData = _.filter(updatedGridData, function (element, index) {
                    // tests if the element has a duplicate in the rest of the array
                    for(index += 1; index < updatedGridData.length; index += 1) {
                        if (_.isEqual(element, updatedGridData[index])) {
                            return false;
                        }
                    }
                    return true;
                });

                $scope.gridOptions.data=updatedGridData;
                //$scope.gridOptions.columnDefs=$scope.columnDefs;

                //$scope.gridApi.grid.options.data= updatedGridData;
                //$scope.gridApi.grid.rows=updatedGridData;
                /*$scope.gridOptions.data.filter(function(record){
                    return record.uniqueConsumer == record.uniqueConsumer && record.sendConsumerIdPhoto!= record.sendConsumerIdPhoto;
                });*/

                //$scope.gridApi.grid.refresh();
                setUniqueConsumer();
                /*$scope.gridApi.grid.columns.forEach(function(column){
                    if(column.code == 'uniqueConsumer'){
                        column.width=550;
                        column.displayName='Consumer';
                    }
                });*/

                $scope.gridApi.grouping.groupColumn('uniqueConsumer');

                break;
            }
            case "LEGALID-MULTIPLE" :{
                //$scope.gridOptions.columnDefs=$scope.columnDefs;
                //setUniqueConsumer();
                $scope.gridApi.grouping.clearGrouping();
                clonedGridData= $scope.transData;
                clonedGridData.forEach(function(record){
                    record.uniqueConsumer=  record.consumerLastName + ", " + record.consumerFirstName + ", " + record.consumerAddr1 + ", " + record.consumerPhoneNumber + ", " + record.consumerCountry;
                });

                clonedGridData.forEach(function(record){
                    for(var i=0,len=clonedGridData.length;i<len;i++){
                        if(clonedGridData[i].uniqueConsumer == record.uniqueConsumer && clonedGridData[i].consumerIdLegal !=record.consumerIdLegal){
                            updatedGridData.push (record);
                        }
                    }

                });
                updatedGridData = _.filter(updatedGridData, function (element, index) {
                    // tests if the element has a duplicate in the rest of the array
                    for(index += 1; index < updatedGridData.length; index += 1) {
                        if (_.isEqual(element, updatedGridData[index])) {
                            return false;
                        }
                    }
                    return true;
                });
                $scope.gridOptions.data=updatedGridData;

                setUniqueConsumer();
                $scope.gridApi.grouping.groupColumn('uniqueConsumer');

                break;
            }
            case "PHONE-MULTIPLE" :{
                //$scope.gridOptions.columnDefs=$scope.columnDefs;
                //setUniqueConsumer();
                $scope.gridApi.grouping.clearGrouping();
                clonedGridData= $scope.transData;
                clonedGridData.forEach(function(record){
                    record.uniqueConsumer=  record.consumerLastName + ", " + record.consumerFirstName + ", " + record.consumerAddr1 + ", " + record.consumerCountry;
                });

                clonedGridData.forEach(function(record){
                    for(var i=0,len=clonedGridData.length;i<len;i++){
                        if(clonedGridData[i].uniqueConsumer == record.uniqueConsumer && clonedGridData[i].consumerPhoneNumber !=record.consumerPhoneNumber){
                            updatedGridData.push (record);
                        }
                    }

                });
                updatedGridData = _.filter(updatedGridData, function (element, index) {
                    // tests if the element has a duplicate in the rest of the array
                    for(index += 1; index < updatedGridData.length; index += 1) {
                        if (_.isEqual(element, updatedGridData[index])) {
                            return false;
                        }
                    }
                    return true;
                });
                $scope.gridOptions.data=updatedGridData;

                //$scope.gridApi.grid.refresh();
                setUniqueConsumer();
                $scope.gridApi.grouping.groupColumn('uniqueConsumer');
                //$scope.gridApi.colMovable.moveColumn(16, 0);

                break;
            }
            case "ADDRESS-MULTIPLE" :{
                //$scope.gridOptions.columnDefs=$scope.columnDefs;
                //setUniqueConsumer();
                $scope.gridApi.grouping.clearGrouping();
                clonedGridData= $scope.transData;
                clonedGridData.forEach(function(record){
                    record.uniqueConsumer=  record.consumerLastName + ", " + record.consumerFirstName +  ", " + record.consumerPhoneNumber + ", " + record.consumerCountry;
                });
                clonedGridData.forEach(function(record){
                    for(var i=0,len=clonedGridData.length;i<len;i++){
                        if(clonedGridData[i].uniqueConsumer == record.uniqueConsumer &&clonedGridData[i].consumerAddr1 !=record.consumerAddr1){
                            updatedGridData.push (record);
                        }
                    }

                });
                updatedGridData = _.filter(updatedGridData, function (element, index) {

                    for(index += 1; index < updatedGridData.length; index += 1) {
                        if (_.isEqual(element, updatedGridData[index])) {
                            return false;
                        }
                    }
                    return true;
                });
                $scope.gridOptions.data=updatedGridData;

                //$scope.gridApi.grid.refresh();
                setUniqueConsumer();
                $scope.gridApi.grouping.groupColumn('uniqueConsumer');

                break;
            }
                // This is only for SEND TRANSACTION VIEW
            case "SEND-MULTIPLE" :{
                //$scope.gridOptions.columnDefs=$scope.columnDefs;

                $scope.gridApi.grouping.clearGrouping();

                $scope.gridOptions.data.forEach(function(record){
                    record.uniqueConsumer=   record.sendConsumerLastName + "," + record.sendConsumerFirstName + "," + record.sendConsumerAddr1 + "," + record.sendConsumerPhoneNumber + "," + record.sendConsumerCountry;
                });

                $scope.gridOptions.data.forEach(function(record){
                    for(var i=0,len=$scope.gridOptions.data.length;i<len;i++){
                        if($scope.gridOptions.data[i].uniqueConsumer == record.uniqueConsumer && $scope.gridOptions.data[i].poeTranConsumerDkey   !=record.poeTranConsumerDkey){
                            updatedGridData.push (record);
                        }
                    }
                });
                updatedGridData = _.filter(updatedGridData, function (element, index) {
                    // tests if the element has a duplicate in the rest of the array
                    for(index += 1; index < updatedGridData.length; index += 1) {
                        if (_.isEqual(element, updatedGridData[index])) {
                            return false;
                        }
                    }
                    return true;
                });
                $scope.gridOptions.data=updatedGridData;

                setUniqueConsumer();
                //$scope.gridApi.grid.refresh();
                $scope.gridApi.grouping.groupColumn('uniqueConsumer');

                break;
            }
             //This is only for RECEIVE TRANSACTION VIEW
            case "RECEIVE-MULTIPLE" :{
                //$scope.gridOptions.columnDefs=$scope.columnDefs;

                $scope.gridApi.grouping.clearGrouping();

                $scope.gridOptions.data.forEach(function(record){
                    record.uniqueConsumer =  record.receiveConsumerLastName + "," + record.receiveConsumerFirstName + "," + record.receiveConsumerAddr1 + "," + record.receiveConsumerPhoneNumber + "," + record.receiveConsumerCountry;
                });

                $scope.gridOptions.data.forEach(function(record){
                    for(var i=0,len=$scope.gridOptions.data.length;i<len;i++){
                        if($scope.gridOptions.data[i].uniqueConsumer == record.uniqueConsumer && $scope.gridOptions.data[i].poeTranConsumerDkey   !=record.poeTranConsumerDkey  ){
                            updatedGridData.push (record);
                        }
                    }
                });
                updatedGridData = _.filter(updatedGridData, function (element, index) {
                    // tests if the element has a duplicate in the rest of the array
                    for(index += 1; index < updatedGridData.length; index += 1) {
                        if (_.isEqual(element, updatedGridData[index])) {
                            return false;
                        }
                    }
                    return true;
                });
                $scope.gridOptions.data=updatedGridData;
                setUniqueConsumer();
                //$scope.gridApi.grid.refresh();
                $scope.gridApi.grouping.groupColumn('uniqueConsumer');

                break;
            }
            // This is only for SEND TRANSACTION VIEW
            case "SEND-AGGREGATE":{
                $scope.gridApi.grouping.clearGrouping();

                $scope.gridOptions.data.forEach(function(record){
                    record.uniqueConsumer =  record.sendConsumerLastName + "," + record.sendConsumerFirstName + "," + record.sendConsumerAddr1 + "," + record.sendConsumerPhoneNumber + "," + record.sendConsumerCountry;
                });

                $scope.gridOptions.data.forEach(function(record){
                    for(var i=0,len=$scope.gridOptions.data.length;i<len;i++){
                        //tranTime.substr(0,10) will convert from "2013-04-01 21:19:28.0" to "2013-04-01"
                        if($scope.gridOptions.data[i].tranTime && record.tranTime ){
                            if($scope.gridOptions.data[i].uniqueConsumer == record.uniqueConsumer && $scope.gridOptions.data[i].tranTime.substr(0,10) == record.tranTime.substr(0,10) && $scope.gridOptions.data[i].poeTranConsumerDkey   !=record.poeTranConsumerDkey ){
                                updatedGridData.push (record);
                            }
                        }
                    }
                });
                updatedGridData = _.filter(updatedGridData, function (element, index) {
                    // tests if the element has a duplicate in the rest of the array
                    for(index += 1; index < updatedGridData.length; index += 1) {
                        if (_.isEqual(element, updatedGridData[index])) {
                            return false;
                        }
                    }
                    return true;
                });

                if(aggregateMinAmount){
                    _(updatedGridData).filter('sendFaceUSDAmount').reduce(function(a,m,i,p) {
                        return (a + m.salary/p.length) > aggregateMinAmount
                    },0);
                }
                $scope.gridOptions.data=updatedGridData;
                setUniqueConsumer();
                //$scope.gridApi.grid.refresh();
                $scope.gridApi.grouping.groupColumn('uniqueConsumer');

                break;
            }
            // This is only for RECEIVE TRANSACTION VIEW
            case "RECEIVE-AGGREGATE":{
                $scope.gridApi.grouping.clearGrouping();

                $scope.gridOptions.data.forEach(function(record){
                    record.uniqueConsumer =  record.receiveConsumerLastName + "," + record.receiveConsumerFirstName + "," + record.receiveConsumerAddr1 + "," + record.receiveConsumerPhoneNumber + "," + record.receiveConsumerCountry;
                });

                $scope.gridOptions.data.forEach(function(record){
                    for(var i=0,len=$scope.gridOptions.data.length;i<len;i++){
                        //tranTime.substr(0,10) will convert from "2013-04-01 21:19:28.0" to "2013-04-01"
                        if($scope.gridOptions.data[i].tranTime && record.tranTime ){
                            if($scope.gridOptions.data[i].uniqueConsumer == record.uniqueConsumer && $scope.gridOptions.data[i].tranTime.substr(0,10) == record.tranTime.substr(0,10) && $scope.gridOptions.data[i].poeTranConsumerDkey   !=record.poeTranConsumerDkey){
                                updatedGridData.push (record);
                            }
                        }
                    }
                });
                updatedGridData = _.filter(updatedGridData, function (element, index) {
                    // tests if the element has a duplicate in the rest of the array
                    for(index += 1; index < updatedGridData.length; index += 1) {
                        if (_.isEqual(element, updatedGridData[index])) {
                            return false;
                        }
                    }
                    return true;
                });

                if(aggregateMinAmount){
                    _(updatedGridData).filter('receiveFaceUSDAmount').reduce(function(a,m,i,p) {
                        return (a + m.salary/p.length) > aggregateMinAmount
                    },0);
                }

                $scope.gridOptions.data=updatedGridData;
                setUniqueConsumer();
                //$scope.gridApi.grid.refresh();
                $scope.gridApi.grouping.groupColumn('uniqueConsumer');

                break;
            }
            case "FLIP":{

                $scope.gridApi.grouping.clearGrouping();

                $scope.gridOptions.data.forEach(function(record){
                    record.uniqueConsumer =  record.consumerLastName + "," + record.consumerFirstName + "," + record.consumerAddr1 + "," + record.consumerPhoneNumber + "," + record.consumerCountry;
                });

                $scope.gridOptions.data.forEach(function(record){
                    for(var i=0,len=$scope.gridOptions.data.length;i<len;i++){
                        //tranTime.substr(0,10) will convert from "2013-04-01 21:19:28.0" to "2013-04-01"
                        if($scope.gridOptions.data[i].consumerTranTime && record.consumerTranTime ){
                            if($scope.gridOptions.data[i].uniqueConsumer == record.uniqueConsumer && $scope.gridOptions.data[i].consumerTranTime.substr(0,10) == record.consumerTranTime.substr(0,10) && $scope.gridOptions.data[i].consumerTranType != record.consumerTranType ){
                                updatedGridData.push (record);
                            }
                        }
                    }
                });
                updatedGridData = _.filter(updatedGridData, function (element, index) {
                    // tests if the element has a duplicate in the rest of the array
                    for(index += 1; index < updatedGridData.length; index += 1) {
                        if (_.isEqual(element, updatedGridData[index])) {
                            return false;
                        }
                    }
                    return true;
                });
                $scope.gridOptions.data=updatedGridData;
                setUniqueConsumer();
                //$scope.gridApi.grid.refresh();
                $scope.gridApi.grouping.groupColumn('uniqueConsumer');

                break;
            }
            case "NO-PATTERN" :{
                // $scope.gridOptions.columnDefs=$scope.columnDefs;
                setBlankConsumer();
                $scope.gridOptions.data=$scope.transData;
                $scope.gridApi.grouping.clearGrouping();
                break;
            }

        }
    }
    $scope.selectedProductChoice= function(choice){
        $scope.selectedProduct= choice;
        if(choice.code=='MO'){
            $scope.disableReference= false;
        }
        else{
            $scope.disableReference= true;
        }
    }




    $scope.selectedDateRangeChoice= function(choice){
        $scope.selectedDateRange= choice;
    }
    $scope.selectedSendCountry={"name":"", "code":""};
    $scope.selectedReceiveCountry={"name":"", "code":""};
    $scope.selectedTransaction={"name":"", "code":""};
    $scope.selectedProduct={"name":"", "code":""};
    $scope.selectedTemplate={"templateName":"","templateId":""}
    $scope.selectedLocation={"name":"", "code":""};
    $scope.selectedHq={"name":"", "code":""};

    $scope.faceMinAmount='';
    $scope.faceMaxAmount='';
    $scope.firstName='';
    $scope.lastName='';
    $scope.phoneNumber=''
    /*$scope.selectedCountryChoice= function(choice){
     $scope.selectedCountry=choice;
     }*/

    /*DatePicker Controls*/
    $scope.datepickers={
        dtStart:false,
        dtEnd:false,
        format: 'MM/dd/yyyy',
        startDate:'',
        endDate:''
    }

    $scope.open = function ($event,which) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.datepickers[which] = true;
    };


    /* Type ahead Filter  */
    $scope.startsWith=function(item,viewValue){
        return  item.substr(0, viewValue.length).toLowerCase() == viewValue.toLowerCase();
    };

    $scope.$on("destroy", function(){

    });
    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };


    $scope.removeColumn= function () {
        $scope.columnDefs.filter(function(column){
                return column.checked==false;
        })
    };

    /*Show Hide Modal*/

    //$scope.items = ['item1', 'item2', 'item3'];

    $scope.animationsEnabled = true;

    $scope.open = function (size) {
        //columnDef are the custom template columns
        // Need to replace the commonConsumerDefs with the parent template of the custom template

        //$scope.columns=commonConsumerDefs;
       /* $scope.columns=[];
        commonConsumerDefs.forEach(function(col){
            $scope.columns.push(col);

        })*/

        parentTemplateDefs.forEach(function(column){
            column.checked=false;
            for(var i in $scope.columnDefs ){
                if(column.field== ($scope.columnDefs[i].field))
                {
                    column.checked=true;
                }
            }
        })

        var modalInstance = $modal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'app/monitoring/templates/showModalColumns.html',
            controller: 'showModalController',
            size: size,
            resolve: {
                columns: function () {
                    return parentTemplateDefs
                }
                //, templateName:$scope.templateName
            }
        });



        modalInstance.result.then(function (data) {
            //$scope.columnDefs = data.columns;
            $scope.templateName=data.templateName;
            if(!$scope.templateType){
                $scope.templateType= $scope.selectedTemplate.templateName;
            }
            //Need to check only some are removing from grid
            data.columns.forEach(function(column){
                if(!column.checked) {
                    $scope.columnDefs.splice($scope.columnDefs.indexOf(column), 1);
                }
            });

            //saveColumnsData(data.columns);
            var columnsDef= data.columns;
            var savingColumns=[];

            columnsDef.forEach(function(column){
                if(column.checked && column.field!="uniqueConsumer"){
                    column.displayOrder= columnsDef.indexOf(column)+1;
                    column.sortOrder="";
                    //column.field= column.field;
                    savingColumns.push({field:column.field ,displayOrder:columnsDef.indexOf(column)+1,sortOrder:""});
                }
            })

            var preferenceInputRequest= {
                data: {
                    "userId":loginService.userId.get(),
                    //"templateId": "5",
                    "templateName": $scope.templateName,
                    //"templateType": $scope.templateType,
                    "templateType":$scope.templateType,
                    "parentTemplateName": $scope.templateType,
                    input: {
                        "prodType": $scope.selectedProduct.code,
                        //"serviceType": $scope.selectedTransaction.code,
                        "accountNumber": $scope.selectedLocation.code,
                        "minFaceAmount": $scope.faceMinAmount,
                        "maxFaceAmount": $scope.faceMaxAmount,
                        "phoneNumber": $scope.phoneNumber,
                        "firstName": $scope.firstName,
                        "lastName": $scope.lastName,
                        "startDate": $filter('date')($scope.datepickers.startDate, 'MM/dd/yyyy'),
                        "endDate": $filter('date')($scope.datepickers.endDate, 'MM/dd/yyyy'),
                        "sendCountry": $scope.selectedSendCountry.code,
                        "receiveCountry": $scope.selectedReceiveCountry.code,
                        "dateRange": $scope.dateRangeList.code
                    },
                    output:{
                        "columns": savingColumns
                    }
                }
            }
            monFactory.savePreferencesData(preferenceInputRequest).then(function success (response){
                if(response.response.data){
                    if(response.response.data.userPreferenceStatus){
                        var responseStatus= response.response.data.userPreferenceStatus;
                        if(responseStatus.error) {
                            $scope.alerts = [
                                {type: 'danger', msg: responseStatus.error}
                            ];
                        }
                        else if(responseStatus.data){
                            $scope.alerts = [
                                {type: 'success', msg: responseStatus.data}
                            ];
                        }
                    }
                }
            });

        }, function () {
            //$log.info('Modal dismissed at: ' + new Date());

        });
    };

 /*   var saveColumnsData= function(columnsDef){

        var savingColumns=[];

        columnsDef.forEach(function(column){
            if(column.checked){
                column.displayOrder= columnsDef.indexOf(column)+1;
                column.sortOrder="";
                column.code= column.code;
                savingColumns.push({field:column.code ,displayOrder:columnsDef.indexOf(column)+1,sortOrder:""});
            }
        })

        var preferenceInputRequest= {
            data: {
                "userId":loginService.userId.get(),
                "templateId": "5",
                "templateName": $scope.templateName,
                "templateType": $scope.selectedTemplate.code,
                "parentTemplateName": $scope.selectedTemplate.name,
                input: {
                    "prodType": $scope.selectedProduct.code,
                    "serviceType": $scope.selectedTransaction.code,
                    "accountNumber": $scope.selectedLocation.code,
                    "minFaceAmount": $scope.faceMinAmount,
                    "maxFaceAmount": $scope.faceMaxAmount,
                    "phoneNumber": $scope.phoneNumber,
                    "firstName": $scope.firstName,
                    "lastName": $scope.lastName,
                    "startDate": $filter('date')($scope.datepickers.startDate, 'MM/dd/yyyy'),
                    "endDate": $filter('date')($scope.datepickers.endDate, 'MM/dd/yyyy'),
                    "sendCountry": $scope.selectedSendCountry.code,
                    "receiveCountry": $scope.selectedReceiveCountry.code,
                    "dateRange": $scope.dateRangeList.code
                },
                output:{
                    "columns": savingColumns
                }
            }
        }
        monFactory.savePreferencesData(preferenceInputRequest).then(function success (response){
            if(response.response.data){
                if(response.response.data.userPreferenceStatus){
                    var responseStatus= response.response.data.userPreferenceStatus
                    $scope.alerts = [
                        { type: 'success', msg:  responseStatus.data }
                    ];
                }
            }
        });
    };*/
    $scope.toggleAnimation = function () {
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };

}]);