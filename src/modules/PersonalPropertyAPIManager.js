// @authored by Sophia Hoffman

import APIManager from './APIManager';


export default {
    component: "personalProperty",
    userId: localStorage.getItem("userId"),

    getActivePersonalProperty () {
        let route = `${this.component}?userId=${this.userId}&&activeAsset=true&&_expand=ppType&&_expand=realEstate&&_sort=purchaseDate&&_order=desc`
        return APIManager.get(route);
    },
    getActivePersonalPropertyAtLocation (locationId) {
        let route = `${this.component}?realEstateId=${locationId}&&activeAsset=true&&_expand=ppType&&_expand=realEstate&&_sort=purchaseDate&&_order=desc`
        return APIManager.get(route);
    },
    getDisposedPersonalProperty () {
    let route = `${this.component}?userId=${this.userId}&&activeAsset=false&&_expand=ppType&&_expand=realEstate&&_sort=purchaseDate&&_order=desc`
    return APIManager.get(route);
    },
    getAllPersonalProperty () {
    let route = `${this.component}?userId=${this.userId}&&_expand=ppType&&&&_expand=realEstate_sort=purchaseDate&&_order=desc`
    return APIManager.get(route);
    },
    getOnePersonalProperty (objectId) {
        let route = `${this.component}/${objectId}?_expand=ppType&&_expand=realEstate`
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