<template>
    <div :class="['options', {'options_active': isActive}]">
        <div class="options__top-block">
            <div class="options__header">
                <div class="options__title">Settings</div>
                <button @click="optionClick" class="options__options">
                    <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
                        <path d="M64,39A25,25,0,1,0,89,64,25,25,0,0,0,64,39Zm0,44A19,19,0,1,1,83,64,19,19,0,0,1,64,83Z"/>
                        <path d="M121,48h-8.93a1,1,0,0,1-.94-.68,49.9,49.9,0,0,0-2-4.85,1,1,0,0,1,.18-1.15L115.62,35a7,7,0,0,0,0-9.9L102.89,12.38a7,7,0,0,0-9.9,0l-6.31,6.31a1,1,0,0,1-1.15.18,49.76,49.76,0,0,0-4.85-2,1,1,0,0,1-.68-.94V7a7,7,0,0,0-7-7H55a7,7,0,0,0-7,7v8.93a1,1,0,0,1-.68.94,49.9,49.9,0,0,0-4.85,2,1,1,0,0,1-1.15-.18L35,12.38a7,7,0,0,0-9.9,0L12.38,25.11a7,7,0,0,0,0,9.9l6.31,6.31a1,1,0,0,1,.18,1.15,49.76,49.76,0,0,0-2,4.85,1,1,0,0,1-.94.68H7a7,7,0,0,0-7,7V73a7,7,0,0,0,7,7h8.93a1,1,0,0,1,.94.68,49.9,49.9,0,0,0,2,4.85,1,1,0,0,1-.18,1.15L12.38,93a7,7,0,0,0,0,9.9l12.73,12.73a7,7,0,0,0,9.9,0l6.31-6.31a1,1,0,0,1,1.15-.18,49.76,49.76,0,0,0,4.85,2,1,1,0,0,1,.68.94V121a7,7,0,0,0,7,7H73a7,7,0,0,0,7-7v-8.93a1,1,0,0,1,.68-.94,49.9,49.9,0,0,0,4.85-2,1,1,0,0,1,1.15.18L93,115.62a7,7,0,0,0,9.9,0l12.73-12.73a7,7,0,0,0,0-9.9l-6.31-6.31a1,1,0,0,1-.18-1.15,49.76,49.76,0,0,0,2-4.85,1,1,0,0,1,.94-.68H121a7,7,0,0,0,7-7V55A7,7,0,0,0,121,48Zm1,25a1,1,0,0,1-1,1h-8.93a7,7,0,0,0-6.6,4.69,43.9,43.9,0,0,1-1.76,4.26,7,7,0,0,0,1.35,8l6.31,6.31a1,1,0,0,1,0,1.41L98.65,111.38a1,1,0,0,1-1.41,0l-6.31-6.31a7,7,0,0,0-8-1.35,43.88,43.88,0,0,1-4.27,1.76,7,7,0,0,0-4.68,6.6V121a1,1,0,0,1-1,1H55a1,1,0,0,1-1-1v-8.93a7,7,0,0,0-4.69-6.6,43.9,43.9,0,0,1-4.26-1.76,7,7,0,0,0-8,1.35l-6.31,6.31a1,1,0,0,1-1.41,0L16.62,98.65a1,1,0,0,1,0-1.41l6.31-6.31a7,7,0,0,0,1.35-8,43.88,43.88,0,0,1-1.76-4.27A7,7,0,0,0,15.93,74H7a1,1,0,0,1-1-1V55a1,1,0,0,1,1-1h8.93a7,7,0,0,0,6.6-4.69,43.9,43.9,0,0,1,1.76-4.26,7,7,0,0,0-1.35-8l-6.31-6.31a1,1,0,0,1,0-1.41L29.35,16.62a1,1,0,0,1,1.41,0l6.31,6.31a7,7,0,0,0,8,1.35,43.88,43.88,0,0,1,4.27-1.76A7,7,0,0,0,54,15.93V7a1,1,0,0,1,1-1H73a1,1,0,0,1,1,1v8.93a7,7,0,0,0,4.69,6.6,43.9,43.9,0,0,1,4.26,1.76,7,7,0,0,0,8-1.35l6.31-6.31a1,1,0,0,1,1.41,0l12.73,12.73a1,1,0,0,1,0,1.41l-6.31,6.31a7,7,0,0,0-1.35,8,43.88,43.88,0,0,1,1.76,4.27,7,7,0,0,0,6.6,4.68H121a1,1,0,0,1,1,1Z"/>
                    </svg>
                </button>
            </div>
            <div class="options__cities">
                <single-option 
                    :city="city" 
                    v-for="city in cities" 
                    :key="city.id"
                    @handle-delete="deleteCity"
                    @handle-drag="dragCity"
                >
                </single-option>
            </div>
        </div>
        <div class="options__add-more">
            <template v-if="cities.length <= 4">
                <label for="city-name" class="options__add-label">Input city name</label>
                <input 
                    id="city-name" 
                    v-model="newCityName" 
                    @keypress.enter="addCity" 
                    type="text" 
                    :class="['options__city-name-input', {'options__city-name-input_error': hasError}]"
                >
                <button @click="addCity" class="options__city-add-btn">Add</button>
            </template>
            <p v-else>You can only add 5 cities. Please delete some</p>
        </div>
    </div>
</template>

<script>
import SingleOption from './SingleOption'

export default {
    components: {SingleOption},
    props: ['cities', 'isActive', 'error'],
    emits: ['handle-option-click', 'handle-delete', 'handle-drag', 'handle-add'],
    data() {
        return {
            newCityName: '',
            dubbedCity: false
        }
    },
    computed: {
        hasError() {
            return !this.error && !this.dubbedCity;
        }
    },
    methods: {
        optionClick() {
            this.$emit('handle-option-click')
        },
        deleteCity(id) {
            this.$emit('handle-delete', id)
        },
        dragCity(payload) {
            this.$emit('handle-drag', payload)
        },
        addCity() {
            if (!this.cities.filter((o) => o.name.toLowerCase() === this.newCityName.toLowerCase()).length > 0) {
                this.$emit('handle-add', this.newCityName)
                this.newCityName = '';
                this.dubbedCity = false;
            } else {
                this.dubbedCity = true;
            }
                
        }
    },
}
</script>

<style lang="scss" scoped>
.options {
    position: absolute;
    width: 100%;
    height: 100%;
    transition: .3s all;
    top: 0;
    transform: translateY(-100%);
    left: 0;
    z-index: 99;
    background: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px;
    box-sizing: border-box;
    height: 290px;
    &_active {
        transform: translateY(0);
        box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
    }
    &__add-more {
        display: flex;
        flex-direction: column;
        gap: 10px;
        align-items: center;
    }
    &__city-name-input {
        border: 1px solid #bbb;
        &_error {
            border-color: red;
        }
    }
    &__city-add-btn {
        width: 50px;
        cursor: pointer;
    }
    &__cities {
        margin-top: 30px;
        overflow: auto;
        height: 100px;
    }
    &__options {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 25px;
        height: 25px;
        border: none;
        background: transparent;
        cursor: pointer;
    }
}
</style>