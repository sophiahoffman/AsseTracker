import APIManager from './APIManager';


export default {
    component: "vehicles",
    userId: localStorage.getItem("userId"),

    getAllVehicles () {
        let route = `${this.component}?userId=${this.userId}&&activeAsset=true&&_expand=vehicleType&&_sort=purchaseDate&&_order=desc`
        return APIManager.get(route);
    },
    getOneVehicle (objectId) {
        let route = `${this.component}/${objectId}?_expand=vehicleType`
        return APIManager.get(route);
    },
    postVehicle (newObject) {
        let route = `${this.component}?`
        return APIManager.post(route, newObject);
    },
    updateVehicle (editedObject) {
        let route = `${this.component}`
        return APIManager.update(route, editedObject);
    },
    deleteVehicle (objectId) {
        let route = `${this.component}`
        return APIManager.delete(route, objectId);
    }

}