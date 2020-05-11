import { endpoints } from './endpoints'

export const script = `
    const requests = ${JSON.stringify(endpoints)}
    const select = document.querySelector("select")
    const sendButton = document.querySelector("button")
    const [method, path, headers, body, response] = document.querySelectorAll("textarea")

    for (let req of requests) {
        select.innerHTML += '<option>'+req.name+'</option>'
    }

    select.onchange = () => {
        const selectedRequest = requests.find(
            req => req.name === select.value
        ) || { method: '', path: '', headers: '', body: '' }

        method.value = selectedRequest.method
        path.value = selectedRequest.path

        if (selectedRequest.headers) {
            headers.value = JSON.stringify(selectedRequest.headers, null, 2)
        } else {
            headers.value = ''
        }

        if (selectedRequest.body) {
            body.value = JSON.stringify(selectedRequest.body, null, 2)
        } else {
            body.value = ''
        }
    }    

    sendButton.onclick = () => {
        try {
            sendButton.innerHTML = 'Sending...'
            const config = {
                method: method.value,
                headers: headers.value ? JSON.parse(headers.value) : {}
            }

            if (body.value) config.body = body.value

            fetch(path.value, config)
                .then(res => res.json())
                .then(data => {
                    sendButton.innerHTML = "Send"
                    response.value += JSON.stringify(data, null, 2)
                })
                .catch(err => {
                    sendButton.innerHTML = "Send"
                    const message = err.message
                    response.value += JSON.stringify({ message }, null, 2)
                })
        } catch (err) {
            sendButton.innerHTML = "Send"
            if (err.message.includes("JSON")) {
                alert("Headers and body must be in JSON format")
            } else {
                alert('Unexpected error: ','err.message')
            }
        }
    }
` 