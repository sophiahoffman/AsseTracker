const  remoteURL = "http://localhost:5002";

export default {
    get(route) {
        return fetch(`${remoteURL}/${route}`)
        .then(results => results.json())
    },
    delete(route, objectId) {
        return fetch(`${remoteURL}/${route}/${objectId}`, {
            method: "DELETE"
        })
        .then(results => results.json());
    },
    post(route, newObject) {
        return fetch(`${remoteURL}/${route}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newObject)
        })
        .then(results => results.json());
    },
    update(route, editedObject) {
        return fetch(`${remoteURL}/${route}/${editedObject.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedObject)
        })
        .then(results => results.json())
    }

}