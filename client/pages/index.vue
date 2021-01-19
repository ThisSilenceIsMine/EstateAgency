<template>
  <div id="nav">
    <sui-container>
      <sui-card-group :items-per-row="3" stackable>
        <sui-card>
          <sui-dimmer-dimmable
            @mouseenter.native="cardOneActive = true"
            @mouseleave.native="cardOneActive = false"
          >
            <div class="cardText" v-if="!cardOneActive">Для покупців</div>
            <sui-image src="img/interior-1.jpg" />
            <sui-dimmer blurring :active="cardOneActive">
              <sui-button inverted>Go</sui-button>
            </sui-dimmer>
          </sui-dimmer-dimmable>
        </sui-card>

        <sui-card>
          <sui-dimmer-dimmable
            @mouseenter.native="cardTwoActive = true"
            @mouseleave.native="cardTwoActive = false"
          >
            <div class="cardText" v-if="!cardTwoActive">Для власників</div>
            <sui-image src="img/interior-2.jpg" />
            <sui-dimmer blurring :active="cardTwoActive">
              <sui-button inverted>Go</sui-button>
            </sui-dimmer>
          </sui-dimmer-dimmable>
        </sui-card>

        <sui-card>
          <sui-dimmer-dimmable
            @mouseenter.native="cardThreeActive = true"
            @mouseleave.native="cardThreeActive = false"
          >
            <div class="cardText" v-if="!cardThreeActive">
              Для орендаторів
            </div>
            <sui-image src="img/interior-3.jpg" />
            <sui-dimmer blurring :active="cardThreeActive">
              <sui-button inverted>Go</sui-button>
            </sui-dimmer>
          </sui-dimmer-dimmable>
        </sui-card>
      </sui-card-group>
    </sui-container>
    <sui-divider horizontal> Нові пропозиції </sui-divider>
    <sui-container>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus maiores
      dignissimos, voluptatem tempore obcaecati alias officia quia distinctio
      voluptas fugiat corporis libero ducimus ex porro itaque eligendi magni
      velit corrupti.
    </sui-container>
    <sui-divider horizontal> Про нас </sui-divider>
    <sui-container>
      <!-- about us -->
      <sui-grid :columns="2" divided>
        <sui-grid-row stretched>
          <sui-grid-column>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
              aliquam reprehenderit asperiores id rem nobis explicabo blanditiis
              delectus laudantium, natus odio libero nam tenetur ut maxime dolor
              maiores itaque animi. Veniam similique impedit ea tempore laborum,
              nihil adipisci facere autem obcaecati, odit natus iste vero
              possimus. Provident at explicabo tenetur, quidem mollitia ullam
              perferendis maiores excepturi, nesciunt culpa ducimus voluptatem.
              Corrupti nisi, sapiente ut laudantium dolorum officiis illum dolor
              beatae dignissimos accusamus, harum velit facere quidem distinctio
              nemo ipsum aperiam corporis vitae tempore perspiciatis quas veniam
              soluta tenetur. Inventore, eligendi? Neque fugit corporis
              consequatur, iure similique dolores incidunt molestias illo quam
              reiciendis provident. Mollitia fugiat quas incidunt. Omnis, ullam
              nobis! Ducimus reprehenderit blanditiis sapiente dolorem nisi
              repudiandae tempore aliquid pariatur!
            </p>
          </sui-grid-column>
          <sui-grid-column>
            <h1 is="sui-header">
              Зворотній зв'язок
            </h1>
            <p>Відгуки та пропозиції: feedback@blagovist.ua</p>
            <p>Комерційні пропозиції: reklama@comfort.ua</p>
            <p>Прес-служба: press@comfort.ua</p>
            <p>Редактор сайту: webeditor@comfort.ua</p>
            <sui-button-group>
              <sui-button circular social="facebook" icon="facebook" />
              <sui-button circular social="twitter" icon="twitter" />
              <sui-button circular social="linkedin" icon="linkedin" />
              <sui-button circular social="google plus" icon="google plus" />
            </sui-button-group>
          </sui-grid-column>
        </sui-grid-row>
      </sui-grid>
    </sui-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cardOneActive: false,
      cardTwoActive: false,
      cardThreeActive: false
    };
  }
};
</script>

<style scoped>
#nav {
  margin-top: 1%;
}

.cardText {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -30%);
  z-index: 5;

  font-size: 35px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  color: #4a707a;
}
#about {
  position: relative;
}
</style>
