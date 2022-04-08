jQuery( document ).ready(function() {


    jQuery('.eg-toggle-2').bootstrapToggle();

  
});


jQuery(".eg-toggle-2").change(function(){

    var divid = jQuery(this).attr("id"); 
    console.log(jQuery(this).prop("checked"));
    if(jQuery(this).prop("checked")){

        jQuery("."+divid).addClass("eg-boxed-3");
        jQuery("."+divid).addClass("eg-optional");
        jQuery("."+divid).removeClass("eg-boxed-2");
        
        jQuery("."+divid).removeClass("eg-optional-2");

    }else{

        jQuery("."+divid).addClass("eg-boxed-2");
        jQuery("."+divid).addClass("eg-optional-2");
        jQuery("."+divid).removeClass("eg-boxed-3");

        
        jQuery("."+divid).removeClass("eg-optional");

    }
    


});

function submitcloningfeature(){

    var cloneportalname = jQuery("#usersportals option:selected").val();
    var data = new FormData();


    if(cloneportalname == ""){

       swal.fire({
            title: "Missing !",
            text: 'Please select the event name from the dropdown.',
            icon: "warning",
           
            confirmButtonClass: "btn-success",
            confirmButtonText: "Close"
        });
       


    }else if(!jQuery("#termscondition").prop("checked")){

        swal.fire({
            title: "Missing !",
            text: 'Please clicked the acknowlegded checkbox.',
            icon: "warning",
           
            confirmButtonClass: "btn-success",
            confirmButtonText: "Close"
        });
        

    }else if(jQuery("#termscondition").prop("checked") && cloneportalname!=""){


        
          Swal.fire({
            title: 'Are you sure?',
            text: 'This action cannot be undone and is only advised before going live with your portal. Clicking "Confirm" will add and/or completely override data and configurations in this current portal based on your selections.',
            icon: "warning",
            
            showCancelButton: true,
            confirmButtonText: 'Confirm',
            cancelButtonText: `Cancel`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                console.log("Qasimriaz");
                cloningfeatureconfrim();
            } else if (result.isDenied) {
              Swal.fire('Changes are not saved', '', 'info')
            }
          })




    }

    

}


function cloningfeatureconfrim(){

    var cloneportalname = jQuery("#usersportals option:selected").val();
    var data = new FormData();
    var cloningfeatureslist = {};

    var url = currentsiteurl+'/';
    var urlnew = url + 'wp-content/plugins/EGPL/cloningfeature.php?contentManagerRequest=cloningfeature';
    var datavalidateurl = url + 'wp-content/plugins/EGPL/cloningfeature.php?contentManagerRequest=datavalidateurl';

    console.log(urlnew);
   
    if(jQuery("#eventsettings2").prop("checked") || jQuery("#eventsettings3").prop("checked")){

        cloningfeatureslist['eventsettings'] = 'checked';
       

    } if(jQuery("#reports2").prop("checked") || jQuery("#reports3").prop("checked")){

       
       cloningfeatureslist['reports'] = 'checked';


    } if(jQuery("#menupages2").prop("checked") || jQuery("#menupages3").prop("checked")){

       
       
        cloningfeatureslist['menupages'] = 'checked';
       
       

    } if(jQuery("#users2").prop("checked") || jQuery("#users3").prop("checked")){

        
      
        cloningfeatureslist['users'] = 'checked';
        
        if(jQuery("#users2").prop("checked")){

            cloningfeatureslist['users'] = 'checked-add';
        }

    } if(jQuery("#levels2").prop("checked") || jQuery("#levels3").prop("checked")){

        
        
        cloningfeatureslist['levels'] = 'checked';
        
        if(jQuery("#levels2").prop("checked")){

            cloningfeatureslist['levels'] = 'checked-add';
        }

    }if(jQuery("#tasks2").prop("checked") || jQuery("#tasks3").prop("checked")){

        cloningfeatureslist['tasks'] = 'checked';
       
        

    } if(jQuery("#resources2").prop("checked") || jQuery("#resources3").prop("checked")){

        
       
        cloningfeatureslist['resources'] = 'checked';
       
       

    } if(jQuery("#Shop2").prop("checked") || jQuery("#Shop3").prop("checked")){

    
        
        cloningfeatureslist['Shop'] = 'checked';
       

    } if(jQuery("#florrplan2").prop("checked") || jQuery("#florrplan3").prop("checked")){

        
        cloningfeatureslist['florrplan'] = 'checked';
        
       

    }
    if(jQuery("#userfields2").prop("checked") || jQuery("#userfields3").prop("checked")){

        
        cloningfeatureslist['userfields'] = 'checked';
        
      

    }
    
    
    cloningfeatureslist['clonesiteid'] = cloneportalname;
    data.append('cloningfeatureslist',JSON.stringify(cloningfeatureslist));
    


    console.log(data);


    let timerInterval
    Swal.fire({
    title: 'Data Validation !',
    html: '<div class="popupcontent"><p>Please wait data is validating...</p></div>',
    timerProgressBar: true,
    icon: 'info',
    showCancelButton: true,
    cancelButtonText: `Cancel`,
    //allowOutsideClick: false,
    didOpen: () => {
        Swal.showLoading()
        const b = Swal.getHtmlContainer().querySelector('p');
        

        jQuery.ajax({
            url: datavalidateurl,
            data: data,
            cache: false,
            contentType: false,
            processData: false,
            type: 'POST',
            success: function (data) {
                
                var message = jQuery.parseJSON(data);
                var appendmessage = "";
                jQuery.each( message, function( i, item ) {

                    if(item.msg !="success"){
                       
                        appendmessage += '<p style="font-size:15px;color:red;">'+item.msg+'</p>';
                    }

                });
               
                
                if(appendmessage !=""){

                    jQuery(".popupcontent").empty();
                    jQuery(".popupcontent").append(appendmessage);

                    jQuery(".popupcontent").append('<p>Are you want to continue or cancel ?</p>');
                    jQuery(".swal2-confirm").text("Continue");
                    Swal.hideLoading();
                   

                }else{

                    //jQuery(".popupcontent").empty();
                    //jQuery(".popupcontent").append('<p>Please wait data is cloning...</p>');
                    //var responce = cloningfeaturesconfrim(cloningfeatureslist);
                    //console.log(responce);

                }
                
                
                
            } });

    },
    willClose: () => {
        //clearInterval(timerInterval)
    }
    }).then((result) => {
    /* Read more about handling dismissals below */
    Swal.fire({
        title: 'Data cloning... !',
        html: '<div class="popupcontent"><p>Please wait data is cloning...</p></div>',
        timerProgressBar: true,
        //allowOutsideClick: false,
        icon: 'info',
        didOpen: () => {

            //Swal.showLoading();
            //cloningfeaturesconfrim(cloningfeatureslist);
           
        }
        
    

        });
    
    });

   
    
   
      

  
            

}
function cloningfeaturesconfrim(dataobject){


    var data = new FormData();
    

    var url = currentsiteurl+'/';
    var urlnew = url + 'wp-content/plugins/EGPL/cloningfeature.php?contentManagerRequest=cloningfeature';
    data.append('cloningfeatureslist',JSON.stringify(dataobject));

      jQuery.ajax({
        url: urlnew,
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'POST',
        success: function (data) {
            
            console.log(data);


            Swal.fire({
                title: 'Completed !',
                html: 'Selected Data has been cloned successfully.',
                icon: 'success',
                confirmButton: "btn-success",
                confirmButtonText: "Close"
               
                }).then((result) => {

                    location.reload();


                });
           
            
            
        } });

        
}
