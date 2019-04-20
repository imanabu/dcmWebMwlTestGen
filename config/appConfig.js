const appConfig = {

    generator: {
        // 12 makes about 100 case a day hospital.
        absoluteMax: 250,
        defaultMax: 20,
        hourlyPatients: 12,
        persistConfig: false,
    },

    speedLimit: {
        // See https://www.npmjs.com/package/express-slow-down
        windowMs: 15 * 60 * 1000, // 15 minutes
        delayAfter: 120, // allow 100 requests per 15 minutes, then...
        delayMs: 1500 // begin adding 500ms of delay per request above 100:
    },

    departments: [
        {   active: true,
            department: "1234" ,
            modalities: ["US", "DX", "VL"],
            reasons: ["Minor Burn", "Fall", "Cut", "Fracture"]
        },
        {
            active: true,
            department: "5672" ,
            modalities: ["CT", "MR", "US", "DX", "VL"],
            reasons: ["Flu", "Cold Symptoms", "Acute Abdominal Pain", "Food obstruction"]
        },
        {
            active: true,
            department: "2456" ,
            modalities: ["CT", "MR", "VL"],
            reasons: ["Eye Infection", "Acute Ocular Trauma", "Retinal Detachment", "Foreign Object Removal"]
        },
    ]
};

module.exports = appConfig;