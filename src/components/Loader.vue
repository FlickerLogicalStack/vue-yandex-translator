<template>
  <div class="loader-component">
    <svg viewBox="0 0 100 100">
      <g transform="translate(25,25)">
        <rect fill="var(--block-color1)">
          <animateTransform
            attributeName="transform"
            type="scale"
            calcMode="spline"
            values="1.1;0.5"
            keyTimes="0;1"
            dur="1s"
            keySplines="0 0.5 0.5 1"
            begin="-0.3s"
            repeatCount="indefinite"
          ></animateTransform>
        </rect>
      </g>
      <g transform="translate(75,25)">
        <rect fill="var(--block-color2)">
          <animateTransform
            attributeName="transform"
            type="scale"
            calcMode="spline"
            values="1.1;0.5"
            keyTimes="0;1"
            dur="1s"
            keySplines="0 0.5 0.5 1"
            begin="-0.2s"
            repeatCount="indefinite"
          ></animateTransform>
        </rect>
      </g>
      <g transform="translate(25,75)">
        <rect fill="var(--block-color3)">
          <animateTransform
            attributeName="transform"
            type="scale"
            calcMode="spline"
            values="1.1;0.5"
            keyTimes="0;1"
            dur="1s"
            keySplines="0 0.5 0.5 1"
            begin="0s"
            repeatCount="indefinite"
          ></animateTransform>
        </rect>
      </g>
      <g transform="translate(75,75)">
        <rect fill="var(--block-color4)">
          <animateTransform
            attributeName="transform"
            type="scale"
            calcMode="spline"
            values="1.1;0.5"
            keyTimes="0;1"
            dur="1s"
            keySplines="0 0.5 0.5 1"
            begin="-0.1s"
            repeatCount="indefinite"
          ></animateTransform>
        </rect>
      </g>
    </svg>
  </div>
</template>

<script>
export default {
    name: 'loader',
    mixins: [],
    components: {},
    props: {},
    data: () => ({}),
    computed: {},
    methods: {}
};
</script>

<style scoped>
.loader-component {
    height: 230px;
}

.loader-component > svg {
    height: 100%;
    width: 100%;
}

rect {
    x: -20px;
    y: -20px;

    height: 40px;
    width: 40px;
}
</style>
