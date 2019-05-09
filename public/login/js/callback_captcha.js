function recaptcha_callback() {
    var registerBtn = document.querySelector('#continue');
    registerBtn.removeAttribute('disabled');
    registerBtn.style.cursor = ('pointer');
}