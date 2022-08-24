<template>
    <div class="weather-widget" v-if="apiData">
        <button @click="optionsOpened = true" class="weather-widget__options">
            <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
                <path d="M64,39A25,25,0,1,0,89,64,25,25,0,0,0,64,39Zm0,44A19,19,0,1,1,83,64,19,19,0,0,1,64,83Z"/>
                <path d="M121,48h-8.93a1,1,0,0,1-.94-.68,49.9,49.9,0,0,0-2-4.85,1,1,0,0,1,.18-1.15L115.62,35a7,7,0,0,0,0-9.9L102.89,12.38a7,7,0,0,0-9.9,0l-6.31,6.31a1,1,0,0,1-1.15.18,49.76,49.76,0,0,0-4.85-2,1,1,0,0,1-.68-.94V7a7,7,0,0,0-7-7H55a7,7,0,0,0-7,7v8.93a1,1,0,0,1-.68.94,49.9,49.9,0,0,0-4.85,2,1,1,0,0,1-1.15-.18L35,12.38a7,7,0,0,0-9.9,0L12.38,25.11a7,7,0,0,0,0,9.9l6.31,6.31a1,1,0,0,1,.18,1.15,49.76,49.76,0,0,0-2,4.85,1,1,0,0,1-.94.68H7a7,7,0,0,0-7,7V73a7,7,0,0,0,7,7h8.93a1,1,0,0,1,.94.68,49.9,49.9,0,0,0,2,4.85,1,1,0,0,1-.18,1.15L12.38,93a7,7,0,0,0,0,9.9l12.73,12.73a7,7,0,0,0,9.9,0l6.31-6.31a1,1,0,0,1,1.15-.18,49.76,49.76,0,0,0,4.85,2,1,1,0,0,1,.68.94V121a7,7,0,0,0,7,7H73a7,7,0,0,0,7-7v-8.93a1,1,0,0,1,.68-.94,49.9,49.9,0,0,0,4.85-2,1,1,0,0,1,1.15.18L93,115.62a7,7,0,0,0,9.9,0l12.73-12.73a7,7,0,0,0,0-9.9l-6.31-6.31a1,1,0,0,1-.18-1.15,49.76,49.76,0,0,0,2-4.85,1,1,0,0,1,.94-.68H121a7,7,0,0,0,7-7V55A7,7,0,0,0,121,48Zm1,25a1,1,0,0,1-1,1h-8.93a7,7,0,0,0-6.6,4.69,43.9,43.9,0,0,1-1.76,4.26,7,7,0,0,0,1.35,8l6.31,6.31a1,1,0,0,1,0,1.41L98.65,111.38a1,1,0,0,1-1.41,0l-6.31-6.31a7,7,0,0,0-8-1.35,43.88,43.88,0,0,1-4.27,1.76,7,7,0,0,0-4.68,6.6V121a1,1,0,0,1-1,1H55a1,1,0,0,1-1-1v-8.93a7,7,0,0,0-4.69-6.6,43.9,43.9,0,0,1-4.26-1.76,7,7,0,0,0-8,1.35l-6.31,6.31a1,1,0,0,1-1.41,0L16.62,98.65a1,1,0,0,1,0-1.41l6.31-6.31a7,7,0,0,0,1.35-8,43.88,43.88,0,0,1-1.76-4.27A7,7,0,0,0,15.93,74H7a1,1,0,0,1-1-1V55a1,1,0,0,1,1-1h8.93a7,7,0,0,0,6.6-4.69,43.9,43.9,0,0,1,1.76-4.26,7,7,0,0,0-1.35-8l-6.31-6.31a1,1,0,0,1,0-1.41L29.35,16.62a1,1,0,0,1,1.41,0l6.31,6.31a7,7,0,0,0,8,1.35,43.88,43.88,0,0,1,4.27-1.76A7,7,0,0,0,54,15.93V7a1,1,0,0,1,1-1H73a1,1,0,0,1,1,1v8.93a7,7,0,0,0,4.69,6.6,43.9,43.9,0,0,1,4.26,1.76,7,7,0,0,0,8-1.35l6.31-6.31a1,1,0,0,1,1.41,0l12.73,12.73a1,1,0,0,1,0,1.41l-6.31,6.31a7,7,0,0,0-1.35,8,43.88,43.88,0,0,1,1.76,4.27,7,7,0,0,0,6.6,4.68H121a1,1,0,0,1,1,1Z"/>
            </svg>
        </button>
        <options 
            @handle-option-click="toggleOptions" 
            @handle-delete="deleteCity"
            @handle-drag="dragCity"
            @handle-add="addCity"
            :cities="apiData" 
            :isActive="optionsOpened"
            :error="addingStatus"
        >
        </options>
        <weather-block 
            v-for="weatherBlock in apiData" 
            :key="weatherBlock.id" 
            :apiData="weatherBlock"
            @handle-option-click="toggleOptions"
        >
        </weather-block>
    </div>
</template>

<script>
import Options from './options/Options';
import WeatherBlock from './weatherBlock/WeatherBlock';

export default {
    components: {Options, WeatherBlock},
    data() {
        return {
            api: '9a311be8dfe0163a5b9f860cbc9fb1e0',
            apiData: [],
            optionsOpened: false,
            addingStatus: true
        }
    },
    created() {
        // It's a function that fills the array with data from the API.
        const fillCitiesArray = (res) => {
            const array = res ? res : this.cities;
            array.forEach(city => {
                this.findCityByName(city)
                .then(res => {
                    this.findWeather(res[0])
                    .then(res => res ? this.apiData.push(res) : null) 
                })
            });
        }

        if (!this.cities) {
            navigator.geolocation.getCurrentPosition(pos => {
                if (!pos) return [];
                const geo = {
                    lat: pos.coords.latitude,
                    lon: pos.coords.longitude
                }
                this.findWeather(geo)
                .then(res => {
                    if (!res) return [];
                    return [res.name];
                })
                .then(res => fillCitiesArray(res))
            });
        } else {
            fillCitiesArray(this.cities)
        }
    },
    computed: {
        cities() {
            // It's checking if there is an array in localStorage and if it's not empty.
            const checkSavedCities = () => {
                return Array.isArray(getCitiesFromLocalStorage()) && getCitiesFromLocalStorage().length ? true : false
            }
            // It's getting an array from localStorage.
            const getCitiesFromLocalStorage = () => {
                return JSON.parse(localStorage.getItem('weather-cities'));
            }
            if (checkSavedCities()) {
                return getCitiesFromLocalStorage();
            }
        }
    },
    methods: {
        toggleOptions() {
            this.optionsOpened = !this.optionsOpened;
        },
        updateLocalStorage() {
            // It's saving an array of cities in localStorage.
            localStorage.setItem('weather-cities', JSON.stringify(this.apiData.map(item => item.name)))
        },
        deleteCity(id) {
            // It's deleting a city from the array and updating localStorage.
            this.apiData = this.apiData.filter(item => item.id !== id)
            this.updateLocalStorage()
        },
        dragCity(payload) {
            // It's swapping two elements in the array.
            const swapElems = (arr, a, b) => {
                arr[a] = arr.splice(b, 1, arr[a])[0];
            }
            // It's getting the index of the dragged and dropped elements and then swapping them.
            const dragItemIndex = this.apiData.map(item => item.id).indexOf(+payload.drag);
            const dropItemIndex = this.apiData.map(item => item.id).indexOf(+payload.drop);
            swapElems(this.apiData, dragItemIndex, dropItemIndex);
            this.updateLocalStorage()
        },
        async findWeather(res) {
            return await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${res.lat}&units=metric&lon=${res.lon}&appid=${this.api}`)
                         .then(data => data.json())
        },
        async findCityByName(name) {
            return await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=1&appid=${this.api}`)
                         .then(data => data.json())
        },
        addCity(name) {
            if (!name) {
                this.addingStatus = false;
                return;
            }
            const pushNewCity = (data) => {
                this.findWeather(data)
                .then(res => {
                    // It's checking if the data is received from the API and if it is, it's pushing it
                    // to the array and updating localStorage. If not, it's setting the status to
                    // false.
                    if (res) {
                        this.apiData.push(res);
                        this.updateLocalStorage();
                        this.addingStatus = true;
                    } else {
                        this.addingStatus = false;
                    }
                }) 
            }
            this.findCityByName(name).then(data => {
                if (!data.length) {
                    this.addingStatus = false;
                    return;
                }
                pushNewCity(data[0])
            });
        }
    },
}
</script>

<style lang="scss" scoped>
.weather-widget {
    position: relative;
    box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
    background: rgba(0,0,0,.1);
    padding: 10px;
    width: 340px;
    overflow: hidden;
    min-height: 290px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    &__options {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 25px;
        height: 25px;
        border: none;
        background: transparent;
        cursor: pointer;
        z-index: 10;
    }
}
</style>