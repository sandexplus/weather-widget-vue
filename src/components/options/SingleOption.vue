<template>
    <div 
        :data-id="city.id"
        class="city" 
        :draggable="true"
        @dragstart="startDrag($event)"  
        @dragover.prevent 
        @dragenter.prevent
        @drop="onDrop($event)"
    >
        <button draggable="false" class="city__drag">
            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <path d="M28,10H4A1,1,0,0,1,4,8H28a1,1,0,0,1,0,2Z"/>
                <path d="M28,17H4a1,1,0,0,1,0-2H28a1,1,0,0,1,0,2Z"/>
                <path d="M28,24H4a1,1,0,0,1,0-2H28a1,1,0,0,1,0,2Z"/>
            </svg>
        </button>
            {{ city.name }}
        <button draggable="false" @click="deleteCity" class="city__delete">
            <svg version="1.1" viewBox="0 0 98 137" width="98px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <path d="M75.6,44.8v73c0,3.4-2.8,6.2-6.2,6.2H21.3c-3.4,0-6.2-2.8-6.2-6.2v-73H75.6L75.6,44.8z M59.9,52.9v62.8h3.6V52.9H59.9  L59.9,52.9z M43.6,52.9v62.8h3.6V52.9H43.6L43.6,52.9z M27.3,52.9v62.8h3.6V52.9H27.3L27.3,52.9z M31.3,27.9v-5.2  c0-3.3,2.6-5.9,5.9-5.9h16.4c3.3,0,5.9,2.6,5.9,5.9v5.2h18.1c3.4,0,6.2,2.8,6.2,6.2v4.3H7V34c0-3.4,2.8-6.2,6.2-6.2H31.3L31.3,27.9z   M37.2,20.8c-1,0-1.8,0.8-1.8,1.8v5.2h20.1v-5.2c0-1-0.8-1.8-1.8-1.8H37.2L37.2,20.8z"/>
            </svg>
        </button>
    </div>
</template>

<script>
export default {
    props: ['city'],
    emits: ['handle-delete', 'handle-drag'],
    data() {
        return {
            elemPos: {
                x: 0,
                y: 0
            }
        }
    },
    methods: {
        deleteCity() {
            this.$emit('handle-delete', this.city.id)
        },
        dragCity() {
            this.$emit('handle-drag', this.city.id)
        },
        startDrag(evt) {
            // Setting the dataTransfer object to the city.id.
            evt.dataTransfer.dropEffect = 'move'
            evt.dataTransfer.effectAllowed = 'move'
            evt.dataTransfer.setData('itemID', this.city.id)
        },
        onDrop(evt) {
            // This is the code that is executed when the user drops the item. It gets the data from
            // the dataTransfer object and the data-id attribute of the element that the item was
            // dropped on. It then emits the handle-drag event with the two IDs.
            const dragItemID = evt.dataTransfer.getData('itemID');
            const dropItemID = evt.target.closest('[data-id]').dataset.id;
            this.$emit('handle-drag', {drag: dragItemID, drop: dropItemID})
        },
    },
}
</script>

<style lang="scss" scoped>
.city {
    width: 100%;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #fff;
    &__drag {
        width: 25px;
        height: 25px;
        border: none;
        background: transparent;
        & svg {
            width: 100%;
            height: 100%;
        }
    }
    &__delete {
        width: 25px;
        height: 25px;
        border: none;
        background: transparent;
        cursor: pointer;
        & svg {
            width: 100%;
            height: 100%;
        }
    }
}
</style>