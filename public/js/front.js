const form = document.querySelector('form');

form.lastElementChild.onclick = (e) => {
    e.preventDefault();

    const loc = form.children[0].value;
    fetch('/weather?address=' + loc).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                form.previousElementSibling.innerHTML = data.error
            } else {
                form.previousElementSibling.innerHTML = data.location + '\n' + data.forecast
            }
        })
    })
}