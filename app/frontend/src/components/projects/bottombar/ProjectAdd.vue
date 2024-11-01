<script lang="ts" setup>



</script>

<template>
    <div class="project-details-add">
        <div class="project-details-add-button">
            <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 0 24 24" width="48px" fill="#5f6368">
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path
                    d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z" />
            </svg>
        </div>
    </div>
</template>
<style lang="scss">
.project-details-add {
    &-button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 2.75rem;
        height: 2.75rem;
        cursor: pointer;
        transition: all .15s ease-in-out;
        border-radius: .25rem;

        svg {
            width: 1.75rem;
            height: 1.75rem;
            fill: white;
            pointer-events: none;
        }
    }
}
</style>