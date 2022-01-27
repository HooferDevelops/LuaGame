function request(method, url) {
    return new Promise((res, rej) => {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                res(xhr.responseText);
            }
        }

        xhr.onerror = () => {
            rej(xhr.responseText);
        }

        xhr.send();

    })
}

export { request };