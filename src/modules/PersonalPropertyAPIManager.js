import APIManager from './APIManager';


export default {
    component: "personalProperty",

    getAllPersonalProperty () {
        let route = `${this.component}?userId=${localStorage.getItem("userId")}&&activeAsset=true&&_expand=ppType&&_sort=purchaseDate&&_order=desc`
        return APIManager.get(route);
    },
    getOnePersonalProperty (objectId) {
        let route = `${this.component}/${objectId}?_expand=ppType`
        return APIManager.get(route);
    },
    postPersonalProperty (newObject) {
        let route = `${this.component}?`
        return APIManager.post(route, newObject);
    },
    updatePersonalProperty (editedObject) {
        let route = `${this.component}`
        return APIManager.update(route, editedObject);
    },
    deletePersonalProperty (objectId) {
        let route = `${this.component}`
        return APIManager.delete(route, objectId);
    }

}