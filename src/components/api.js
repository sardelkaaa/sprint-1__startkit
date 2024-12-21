const config = {
    baseUrl: 'https://nomoreparties.co/v1/apf-cohort-202',
    headers: {
      authorization: '97040fde-2249-4664-b748-5787a7c167f5',
      'Content-Type': 'application/json'
    }
  }

export const getUserInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject(`Ошибка ${res.status}`); 
        });
}

export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject(`Ошибка ${res.status}`); 
        });
}

export const editProfile = (nameInput, descriptionInput) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: nameInput,
            about: descriptionInput
        })
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка ${res.status}`);
        });
}

export const addNewCard = (name, link) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            link: link
        })
    }) 
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка ${res.status}`);
        });
}

export const deleteCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
        .then((res) => {
            if (res.ok) {
                return res.json();            }
            return Promise.reject(`Ошибка ${res.status}`)
        });
}

export const addLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject(`Ошибка: ${res.status}`);
        })
}

export const removeLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject(`Ошибка: ${res.status}`);
        })
}

export const editImage = (avatar) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: avatar
        })
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject(`Ошибка: ${res.status}`);
        })
}