const form = document.querySelector('form');
form.nextElementSibling.hidden = true;

form.lastElementChild.onclick = (e) => {
    e.preventDefault();

    const loc = form.children[0].value;
    fetch('/weather?address=' + loc).then((response) => {
        response.json().then((data) => {
            form.nextElementSibling.hidden = false;
            if (data.error) {
                form.nextElementSibling.children[0].innerHTML = data.error;
                form.nextElementSibling.children[1].innerHTML = '';
            } else {
                form.nextElementSibling.children[0].innerHTML = data.forecast;
                form.nextElementSibling.children[1].innerHTML = data.location;
            }
            form.firstElementChild.value = '';
        })
    })
}