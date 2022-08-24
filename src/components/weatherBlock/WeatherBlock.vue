<template>
    <div class="weather" v-if="apiData">
        
        <div class="weather__place">{{ apiData.name }}, {{ apiData.sys.country }}</div>
        <div class="weather__weather">
            <div class="weather__img">
                <img :src="`http://openweathermap.org/img/wn/${apiData.weather[0].icon}@2x.png`" :alt="apiData.weather[0].main">
            </div>
            <div class="weather__counter-container">
                <div class="weather__counter weather__counter_max">{{ apiData.main.temp_max ? roundDigit(apiData.main.temp_max) + '°' : '- -' }}</div>
                <div class="weather__counter weather__counter_min">{{ apiData.main.temp_min ? roundDigit(apiData.main.temp_min) + '°' : '- -' }}</div>
            </div>
        </div>
        <div class="weather__descr">
            Feels like {{ roundDigit(apiData.main.feels_like) }}°, {{ apiData.weather[0].description }}
        </div>
        <div class="weather__subinfo-info">
            <div class="weather__subinfo-block">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 612 612">
                    <path d="M564.952,146.096L225.006,59.23v0.019c-4.781-1.262-9.697-1.874-14.631-1.874c-56.113,0-88.224,73.019-94.439,153H76.5
                        V85.833c11.551-8.721,19.125-22.434,19.125-38.021C95.625,21.401,74.224,0,47.812,0S0,21.401,0,47.812
                        c0,15.587,7.574,29.299,19.125,38.021v497.479c0,15.836,12.833,28.688,28.688,28.688S76.5,599.148,76.5,583.312V267.75h39.436
                        c6.216,79.98,38.327,153,94.439,153c4.953,0,9.888-0.612,14.611-1.855l0,0l339.947-86.865
                        c34.73-8.855,47.066-55.635,47.066-92.967S599.664,154.951,564.952,146.096z M210.738,363.337
                        c-8.625,1.186-31.805-31.748-37.389-95.587h73.899C241.95,325.067,221.869,360.487,210.738,363.337z M173.349,210.375
                        c5.565-62.826,28.419-95.567,37.428-95.567h0.019c11.092,2.83,31.154,38.25,36.452,95.567H173.349z M380.014,320.057
                        l-89.792,22.95C300.875,311.719,306,274.692,306,239.062s-5.125-72.656-15.778-103.944l89.792,22.95
                        c6.445,3.806,21.611,32.149,21.611,80.994S386.459,316.251,380.014,320.057z M546.898,277.427l-95.587,24.422
                        c5.164-19.89,7.688-41.654,7.688-62.787c0-21.114-2.524-42.897-7.688-62.787l95.587,24.422
                        c3.003,4.858,7.727,18.169,7.727,38.365S549.901,272.569,546.898,277.427z"/>
                </svg>
                <div class="weather__subinfo">{{ apiData.wind.speed }}m/s, {{ windDir }}</div>
            </div>
            <div class="weather__subinfo-block">
                <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                    <path d="M398.592,14H115.409A100.522,100.522,0,0,0,15,114.409V397.592A100.522,100.522,0,0,0,115.409,498H398.592A100.522,100.522,0,0,0,499,397.592V114.409A100.522,100.522,0,0,0,398.592,14ZM487,397.592A88.509,88.509,0,0,1,398.592,486H115.409A88.509,88.509,0,0,1,27,397.592V114.409A88.509,88.509,0,0,1,115.409,26H398.592A88.509,88.509,0,0,1,487,114.409Z"/><path d="M397.792,203.786c-19.9,0-32.258,15.178-32.258,39.61,0,18.233,11.784,40.771,26.258,45.887v80.676a40.739,40.739,0,1,1-81.478,0V344.975h16.065a17.566,17.566,0,0,0,17.546-17.546V220.282a17.566,17.566,0,0,0-17.546-17.546H194.024a17.566,17.566,0,0,0-17.546,17.546V327.429a17.566,17.566,0,0,0,17.546,17.546h83.015A71.807,71.807,0,0,1,205.585,410.7h-8.4a71.8,71.8,0,0,1-71.723-71.723V182.918a16.84,16.84,0,0,0,13.654-16.51V158.73a37.507,37.507,0,1,0-39.308,0v7.676a16.841,16.841,0,0,0,13.654,16.51V338.975A83.818,83.818,0,0,0,197.182,422.7h8.4a83.816,83.816,0,0,0,83.485-77.723h9.244v24.984a52.739,52.739,0,1,0,105.478,0V289.283c14.474-5.116,26.259-27.654,26.259-45.887C430.051,218.964,417.69,203.786,397.792,203.786ZM119.459,101.3A25.511,25.511,0,0,1,130.5,149.81a25.163,25.163,0,0,1-11.043,2.511c-.533,0-1.063-.02-1.59-.051a25.07,25.07,0,0,1-8.155-1.877l-.036-.016q-.642-.269-1.272-.572a25.511,25.511,0,0,1,11.053-48.5Zm-7.654,65.106v-2.864c.249.052.5.089.753.136.286.053.572.108.86.154.364.059.731.106,1.1.154.307.04.614.085.924.117.355.038.712.062,1.069.089.318.025.634.056.953.072.432.022.864.028,1.3.036.233,0,.465.019.7.019s.481-.016.723-.02c.424-.008.848-.013,1.271-.035.331-.017.659-.049.988-.075s.688-.049,1.03-.085c.322-.034.641-.08.961-.122.353-.046.706-.092,1.056-.148.3-.048.6-.106.9-.162.241-.045.484-.08.723-.13v2.864a4.824,4.824,0,0,1-4.818,4.819h-5.671A4.825,4.825,0,0,1,111.805,166.408Zm76.673,161.021V220.282a5.552,5.552,0,0,1,5.546-5.546H326.379a5.552,5.552,0,0,1,5.546,5.546V327.429a5.553,5.553,0,0,1-5.546,5.546H194.024A5.553,5.553,0,0,1,188.478,327.429Zm209.314-49.071c-8.183,0-20.258-18.417-20.258-34.962,0-10.312,2.632-27.61,20.258-27.61s20.259,17.3,20.259,27.61C418.051,259.941,405.976,278.358,397.792,278.358Z"/><path d="M319.768,320.069V291.711a6,6,0,0,0-6-6H265.453a6,6,0,0,0-6,6v28.358a6,6,0,0,0,6,6h48.315A6,6,0,0,0,319.768,320.069Zm-12-6H271.453V297.711h36.315Z"/>
                    <path d="M274.9,244.145h38.863a6,6,0,0,0,0-12H274.9a6,6,0,0,0,0,12Z"/>
                    <path d="M313.768,255.252H294.861a6,6,0,0,0,0,12h18.907a6,6,0,0,0,0-12Z"/>
                </svg>
                <div class="weather__subinfo">{{ apiData.main.pressure }} hPa</div>
            </div>
        </div>
        <div class="weather__other-info">
            <div class="weather__info-block">Humidity: {{ apiData.main.humidity }}%</div>
            <div class="weather__info-block">Visibility: {{ visibilityToMeters }} km</div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['apiData'],
    emits: ['handle-option-click'],
    computed: {
        windDir() {
            const directions = ['north', 'northeast', 'east', 'southeast', 'south', 'southwest', 'west', 'northwest'];
            let degrees = this.apiData.wind.deg * 8 / 360;
            degrees = Math.round(degrees, 0);
            degrees = (degrees + 8) % 8;
            return directions[degrees]
        },
        visibilityToMeters() {
            return (this.apiData.visibility / 1000).toFixed(1);
        }
    },
    methods: {
        roundDigit(digit) {
            return Math.round(digit)
        },
    },
}
</script>

<style lang="scss" scoped>
.weather {
    text-align: center;
    background: #FFFFFF;
    box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.07);
    border-radius: 10px;
    padding: 15px 20px;
    height: min-content;
    transition: .3s all;
    width: 340px;
    position: relative;
    height: 290px;
    box-sizing: border-box;
    &__other-info {
        display: flex;
        margin-top: 20px;
        justify-content: space-between;
    }
    &__subinfo-info {
        display: flex;
        align-items: flex-end;
        margin-top: 20px;
        justify-content: space-between;
    }
    &__subinfo-block {
        display: flex;
        align-items: center;
        gap: 10px;
        & svg {
            width: 10px;
            height: 10px;
        }
    }
    &__title {
        font-weight: 600;
        color: #626262;
        text-align: center;
        transition: .3s all;
    }
    &__weather {
        display: flex;
        align-items: center;
        gap: 7px;
        margin-top: 8px;
        margin-bottom: 6px;
    }
    &__counter {
        font-style: normal;
        font-weight: 400;
        font-size: 24px;
        line-height: 100%;
        text-align: center;
        &_max {
            color: #E83D46;
            transition: .3s all;
        }
        &_min {
            color: #A7A7A7;
            transition: .3s all;
        }
    }
}
</style>