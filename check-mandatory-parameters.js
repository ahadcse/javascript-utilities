const required = ["DeviceID", "TenantID", "UserID", "Manufacturer", "ModelID", "OS", "OSVersion"];
let one_item_in_record = {
	"OS": "7.0.1",
	"first": "1",
	"second": "2", 
	"third": "3" 
};
let item_not_in_record = {
	"first": "1",
	"second": "2", 
	"third": "3", 
	"fourth": "4", 
};

let all_in_record = {
	"DeviceID": "1",
	"TenantID": "2", 
	"UserID": "3", 
	"ModelID": "4", 
};

function validateAttributes(record) {
    var missing = [];
    required.map(a => {
        if (!record[a] || record[a].trim().length == 0) {
            missing.push(a);
        }
    });
    if (missing && missing.length > 0) {
        console.log("Required parameters are missing: " + JSON.stringify(missing));
    }
}

this.validateAttributes(one_item_in_record);
this.validateAttributes(item_not_in_record);
this.validateAttributes(all_in_record);
