---
layout: null
---
{% assign path = page.url | split: "/" %}
{% assign language = path[1] %}
{% assign i18n = site.data[language] %}
{% assign c = i18n.app.resident.confirmEmail %}


$( "#dialogOk" ).on( "click", () => {
    window.location.assign('../home/?action=sign-in');
});

my.stitch.account.confirmEmail(
    my.vars.query.token,
    my.vars.query.tokenId 
).then(() => {
    $('#dialogText').text('{{c.text.confirmed}}');
    $('#dialogOk').show();
    $('#dialog').modal('show');
}).catch(err => {
    $('#dialogText').text(`{{c.text.unconfirmed}} ${err}`);
    $('#dialogOk').hide();
    $('#dialog').modal('show');
});
