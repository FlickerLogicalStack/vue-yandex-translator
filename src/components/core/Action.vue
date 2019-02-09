<template>
    <div class="action-component">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'Action'
    };
</script>

<style scoped>
    .action-component {
        font-size: 0.9em;
        transition: var(--default-transition-time);
        height: 100%;
    }

    .action-component#erase-cache {
        font-size: 0.8em;
    }

    .action-component#erase-cache svg {
        height: 16px;
        width: 16px;
    }

    .action-component#erase-cache > .action-button:hover {
        background-color: var(--bloody-red);
    }

    .action-component.disabled {
        pointer-events: none;

        opacity: 0.75;
    }

    .action-button {
        display: flex;

        padding: 5px 15px;

        cursor: pointer;
        user-select: none;
        transition: var(--default-transition-time);

        align-items: center;
    }

    .action-button > svg {
        width: 13px;
        height: 13px;

        fill: currentColor;
    }

    .action-button > svg + .action-title {
        margin-left: 5px;
    }

    .action-button:hover {
        color: var(--light-grey);
        background-color: var(--light-blue);
    }
</style>
