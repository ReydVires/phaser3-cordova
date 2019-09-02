export class LocalDatabase {
    constructor(key = 'localData'){
        this.key = key;
    }

    setKey(key){
        const uniqueKey = this.key + "_" + key;
        return uniqueKey;
    }

    saveData(key, value){
        if (key && value){
            const uid = this.setKey(key);
            console.log("Is overwrite? " + this.isDataExist(uid) + ", value: " + value);
            if (this.canToJSON(value)){
                console.log("Data " + uid + " saved from JSON!");
            }
            else {
                console.log("Data " + uid + " saved!");
            }
            localStorage.setItem(uid, value);
        }
    }

    saveObject(key, value){
        if (key && value){
            const uid = this.setKey(key);
            console.log("Is overwrite? " + this.isDataExist(uid) + ", value: " + value);
            if (this.canToJSON(value)){
                localStorage.setItem(uid, JSON.stringify(value));
                console.log("Data " + uid + " saved from object!");
            }
            else {
                console.warn("Data " + uid + " not an object!");
            }
        }
    }

    getData(key, init = false, value = 0){
        const uid = this.setKey(key);
        let data = this.getObjectData(key);
        if (data === null && !init){
            data = localStorage.getItem(uid);
        }
        else if (init){
            data = value;
            this.saveData(uid, value);
        }
        return data;
    }

    getObjectData(key){
        const uid = this.setKey(key);
        if (this.isDataExist(uid)){
            const data = localStorage.getItem(uid);
            if (this.canToJSON(data)){
                const obj = JSON.parse(data);
                return obj;
            }
        }
        return null;
    }

    deleteData(key){
        const uid = this.setKey(key);
        if (this.isDataExist(uid)){
            console.warn("Data " + uid + " deleted!");
            localStorage.removeItem(uid);
        }
        else {
            console.log("Data " + uid + " not found!");
        }
    }

    isDataExist(key){
        const uid = this.setKey(key);
        const data = localStorage.getItem(uid);
        return (data !== null) || (data !== undefined);
    }

    canToJSON(obj){
        let result = false;
        let json = undefined;
        switch (typeof obj) {
            case undefined:
            case null:
                break;
            case 'object':
                result = true;
                break;
            default:
                try {
                    json = JSON.parse(obj);
                    result = (typeof json === 'object');
                } catch (e) {
                    console.log("JSON.parse error: " + e);
                    result = false;
                }
                break;
        }
        return result;
    }

}