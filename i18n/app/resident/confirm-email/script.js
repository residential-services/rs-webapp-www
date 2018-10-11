


my.vars.query = my.ui.util.parseQuery();

my.stitch.client = stitch.Stitch.initializeDefaultAppClient("app0-vxpqk"); 

$( "#dialogOk" ).on( "click", () => {
    window.location.assign('../home/');
});

my.stitch.account.confirmEmail(
    my.vars.query.token,
    my.vars.query.tokenId 
).then(() => {
    $('#dialogText').text('Email confirmed !');
    //$('#dialogOk').show();
    $('#dialog').modal('show');
}).catch(err => {
    $('#dialogText').text(`Email unconfirmed. Error was: ${err}`);
    //$('#dialogOk').show();
    $('#dialog').modal('show');
});
