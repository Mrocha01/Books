document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const message = urlParams.get("message");

    if (message) {
        const popup = document.getElementById("popup");
        const popupMessage = document.getElementById("popup-message");

        popupMessage.textContent = message;
        popup.classList.add("active");

        setTimeout(function () {
            popup.classList.remove("active");

            // Remove o parâmetro "message" da URL
            const cleanURL = window.location.href.replace(/[?&]message=([^&#]*)(&|$|#)/i, '');
            window.history.replaceState({}, document.title, cleanURL);
        }, 3000); // Remova o pop-up após 3 segundos (ajuste conforme necessário)
    }
});
