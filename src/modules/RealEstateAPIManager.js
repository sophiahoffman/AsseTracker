// @authored by Sophia Hoffman

import APIManager from './APIManager';


export default {
    component: "realEstate",
    userId: localStorage.getItem("userId"),

    getAllRealEstate () {
        let route = `${this.component}?userId=${this.userId}&&activeAsset=true&&_expand=reType&&_sort=purchaseDate&&_order=desc`
        return APIManager.get(route);
    },
    getOneRealEstate (objectId) {
        let route = `${this.component}/${objectId}?_expand=reType`
        return APIManager.get(route);
    },
    postRealEstate (newObject) {
        let route = `${this.component}?`
        return APIManager.post(route, newObject);
    },
    updateRealEstate (editedObject) {
        let route = `${this.component}`
        return APIManager.update(route, editedObject);
    },
    deleteRealEstate (objectId) {
        let route = `${this.component}`
        return APIManager.delete(route, objectId);
    },
    getAllRealEstateTypes () {
        let route = `reType`
        return APIManager.get(route);
    }

}