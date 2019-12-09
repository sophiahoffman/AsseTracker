const  remoteURL = "http://localhost:5002";

export default {
    get(component) {
        return fetch(`${remoteURL}/${component}`)
    },
    delete(component, objectId) {
        return fetch(`${remoteURL}/${component}/${objectId}`, {
            method: "DELETE"
        })
        .then(results => results.json());
    },
    post(component, newObject) {
        return fetch(`${remoteURL}/${component}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newObject)
        })
        .then(results => results.json());
    },
    update(component, editedObject) {
        return fetch(`${remoteURL}/${component}/${editedObject.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedObject)
        })
        .then(results => results.json())
    }




}