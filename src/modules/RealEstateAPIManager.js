import APIManager from './APIManager';


export default {
    component: "realEstate",

    getAllRealEstate () {
        let route = `${this.component}?userId=${localStorage.getItem("userId")}&&activeAsset=true&&_sort=purchaseDate&&_order=desc`
        return APIManager.get(route);
    },
    postRealEstate (newObject) {
        let route = `${this.component}?`
        return APIManager.post(route, newObject);
    },
    updateRealEstate (editedObject) {
        let route = `${this.component}/${editedObject.id}`
        return APIManager.update(route, editedObject);
    },
    deleteRealEstate (objectId) {
        let route = `${this.component}/${objectId}`
        return APIManager.delete(route, objectId);
    }

}