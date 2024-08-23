
function bindButton() {
    //make sure document is ready 
    if (document.readyState !== 'complete') {
        setTimeout(bindButton, 100);
        return;
    }

    document.querySelector('#form1-pow-button').addEventListener('click', (e) => {
        if(!e.target.checked) {
            e.preventDefault();
        }
        fetch('/create_challenge.php', {
            method: 'POST',
            body: JSON.stringify({ website: window.location.hostname }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if(response.status === 200) {
                e.target.disabled = true;
                response.json().then(data => {
                    console.log('Received challenge data');
                    solveChallenge(data, e.target);
                });
            } else {
                alert(`create_challenge.php returned status ${response.status}`);
                console.log(response)
            }
        });
    }); 
}

function clearPow(button) {
    //const id = button.id.match(/\d+/)[0];
    button.disabled = false;
    document.querySelector('#form1-pow').value = '';
    document.querySelector('input[type="submit"]').disabled = true;
    const label = document.querySelector('#form1-pow-button-label');
    label.innerHTML = label.innerHTML.replace('🧑','🤖');
    label.innerHTML = label.innerHTML.replace('⌛','🤖');
}

async function solveChallenge(challengeData, button) {
    if (window.Worker) {
        document.querySelector('input[type="submit"]').disabled = true;
        const powWorker = new Worker("pow.js");
        powWorker.postMessage(challengeData);
        const label = document.querySelector('#form1-pow-button-label');
        label.innerHTML = label.innerHTML.replace('🤖','⌛');
        powWorker.onmessage = e => {
            console.log(e);
            if (e.data.error) {
                console.error(e.data.error);
                return;
            }
            document.querySelector('pre').innerText =
                `Time: ${e.data.time}\n` +
                `Difficulty: ${e.data.difficulty}\n` +
                `Target: ${e.data.target}\n` +
                `Memory in KiB: ${e.data.memory}\n` +
                `Encoded: ${e.data.argon2Hash.encoded}\n` +
                `Hex: ${e.data.argon2Hash.hashHex}\n` +
                `Nonce: ${e.data.nonce}\n` +
                `Time Taken (ms): ${e.data.timeTaken}`;
    
            let serverMessage = JSON.parse(JSON.stringify(challengeData));
            //browser fallback for { ...challengeData, hash: e.data.argon2Hash.encoded};

            serverMessage.hash = e.data.argon2Hash.encoded;
            fetch('/check_challenge.php', {
                method: 'POST',
                body: JSON.stringify(serverMessage)
            }).then(response => response.text()
                .then(data => {
                    console.log('Received server response');
                    console.log(data);
                    document.querySelector('#form1-pow').value = data
                    document.querySelector('input[type="submit"]').disabled = false;
                    label.innerHTML = label.innerHTML.replace('⌛','🧑');
                    setTimeout(() => clearPow(button), (1000 * 60 * 3) - 5 * 1000);
                })
            );
        }
    } else {
        console.error('Web workers not supported in this browser :(');
    }
}

bindButton();
