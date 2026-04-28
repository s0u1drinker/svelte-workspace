<script lang="ts"></script>

<div class="mq-placeholder">
  <div class="mq-placeholder__content">
    <h3>Уп-с... не работает =(</h3>
    <p>Я, конечно, дико извиняюсь, но приложение недоступно при разрешении экрана менее 1280х800px, т.к. дизайн для маленьких экранов не готов. Ещё раз приношу тысячу извинений за предоставленное неудобство.</p>
  </div>
</div>

<style lang="postcss">
  .mq-placeholder {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.25);
    backdrop-filter: var(--filter-blur);
    z-index: 100;
    display: flex;

    @media(--xl-down-placeholder) {
      display: none;
    }

    &__content {
      width: clamp(280px, 80%, 30rem);
      background-color: var(--color-white);
      border: var(--border);
      border-radius: var(--radius);
      box-shadow: var(--shadow-sm);
      margin: auto;
      padding: 1rem;
      box-sizing: border-box;

      h3 {
        text-align: center;
      }

      p {
        margin-top: 1rem;
      }
    }
  }
</style>