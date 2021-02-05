const update = document.querySelector('#update-button');
const delete_button = document.querySelector('#delete-button');
const delete_message = document.querySelector('#message');

update.addEventListener('click', _ => {
    fetch('/quotes', {
        method: 'put',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
            name: 'Darth Vader',
            quote: 'I find your lack of faith disturbing.'
        })
    })
        .then(result => {
            if (result.ok) return result.json();
        })
        .then(response => {
            window.location.reload(true);
        })
});
delete_button.addEventListener('click', _ => {
   fetch('/quotes', {
       method: 'delete',
       headers: {'Content-Type': 'application/json'},
       body: JSON.stringify({
           name: 'Darth Vader'
       })
   })
       .then( result => {
           if (result.ok) return result.json();
       })
       .then(response => {
           if (response === "No More Vader") {
               delete_message.textContent = "No More Vader Quotes";
           } else {
               window.location.reload(true);
           }
       })
});