const URL_API = 'https://api.spacexdata.com/v3';



export async function getAllLaunches() {
    try {
        const response = await fetch(`${URL_API}/launches`);
        const data = await response.json();
        return data;
    } catch(error) {
        console.error(error);
    }
}

export async function getLaunchByFlughtNumber(flightNumber) {
    try {
        const responsej = await fetch(`${URL_API}/launches/${flightNumber}`);
        const data = await response.json();
        return data;
    } catch(error) {
        console.error(error);
    }
}