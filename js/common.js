$('.img-thumbnail').on('click', function(e){
    //console.log(this.src);
    $("#viewImage").attr("src", this.src);
    $('#imageModal').modal('show');
});


$('.btnCopy').on('click', function(e){
    var regex = /[^0-9]/g;
    var bankValue = $(this).parent().find("span").html();
    var tempInput = document.createElement('input');
    tempInput.value = bankValue.replace(regex, "");
    document.body.appendChild(tempInput);

    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);

    alert(bankValue + '\n복사완료');
});