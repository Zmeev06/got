// НОВЫЙ ЧАТ
$('.sidebar_menu_top_actions_new_chat').on('click',function(e){
    e.preventDefault();

    let ulElement = document.querySelector("#side-menu");
    var firstLiElement = ulElement.querySelector('li');
    var clonedElement = $(firstLiElement).clone();

    function generateRandomString() {
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        var randomString = '';
        for (var i = 0; i < 6; i++) {
            var randomIndex = Math.floor(Math.random() * characters.length);
            randomString += characters[randomIndex];
        }
        return randomString;
    }
    var newId = generateRandomString();
    // clonedElement.attr("id", newId);
    var newHref = "#" + newId;
    clonedElement.children('a').attr('href', newHref);
    // Klonlangan elementning div elementining id atributini olamiz
    var divId = clonedElement.children('div').attr('id');
    // Klonlangan elementning div elementining id atributini o'zgartiramiz
    clonedElement.children('div').attr('id', newId);
    clonedElement.children('a').attr('aria-expanded' , false)
    clonedElement.children('.collapse').removeClass('show')
    $('#side-menu').prepend(clonedElement)
})



// EDIT
$('.actions_sp img:nth-of-type(2)').on('click', function(e){
    e.preventDefault();
    $('.main_input').removeAttr('disabled')
    $('.actions_sp').addClass('display-none')
    $(".actions_sp.three").removeClass('display-none')
    $(".actions_sp.three").css({
        "top": "17px",
        "right": "40px"
    })
    $(".main_input").focus();
})

$(".actions_sp.three svg").on('click', function(e){
    let hasDisabledAttr =  document.querySelector('.main_input').hasAttribute('disabled');
    if (hasDisabledAttr === false) {
        $('.main_input').prop( "disabled", true )
    }
    $('.actions_sp.three').addClass('display-none');
    $('.actions_sp.main').removeClass('display-none');
})



// PASSWORD EYE
$(".password_eye").on('click' , function(e){
    e.preventDefault();
    let parentInp = $(this).parent().children('input');
    if (parentInp.attr('type') === 'password') {
        parentInp.attr("type", "text");
    } else {
        parentInp.attr("type", "password");
    }
})



// MENU OPEN
let menuToggler = document.querySelector('.bars_menu');
    menuToggler.addEventListener('click',function(e){
    e.preventDefault();
    this.classList.toggle('active');
    document.querySelector('.left-side-menu').classList.toggle('show');
    document.querySelector('body').classList.toggle('.modal-open');
    document.querySelector('.mod').classList.toggle('show');
    document.querySelector('.mod').classList.toggle('modal-backdrop');
    document.querySelector('.mod').classList.toggle('fade');
    })

// MENU X CLOSE
let menuXToggler = document.querySelector('.x_menu_mob');
    menuXToggler.addEventListener('click',function(e){
    e.preventDefault();
    this.classList.toggle('active');
    document.querySelector('.left-side-menu').classList.remove('show');
    document.querySelector('body').classList.toggle('modal-open');
    document.querySelector('.mod').classList.remove('show');
    document.querySelector('.mod').classList.remove('modal-backdrop');
    document.querySelector('.mod').classList.remove('fade');
    })



    