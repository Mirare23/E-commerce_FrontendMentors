<template>
  <nav
    class="container flex justify-between border-b-2 max-sm:px-3 sm:max-md:px-0"
  >
    <div
      v-if="sideBar"
      class="fixed left-0 z-40 w-full h-full bg-black bg-opacity-20"
    ></div>
    <aside
      class="fixed top-0 z-50 w-1/2 h-full p-4 duration-300 ease-in-out bg-white md:hidden"
      :class="{
        ' left-0': sideBar,
        ' -left-96': !sideBar,
      }"
    >
      <img
        @click.prevent="sideBar = !sideBar"
        src="/img/icon-close.svg"
        alt=""
      />
      <ul class="flex flex-col gap-4 mt-10">
        <li v-for="link in links" class="font-semibold text-black">
          <router-link :to="link.link">{{ link.name }}</router-link>
        </li>
      </ul>
    </aside>

    <ul
      class="flex items-center h-full gap-10 py-10 list-none md:max-lg:gap-5 max-md:gap-5 max-md:py-5"
    >
      <li @click.prevent="sideBar = !sideBar" class="md:hidden">
        <img src="/img/icon-menu.svg" alt="" />
      </li>
      <li class="list-none me-10 md:max-lg:me-5">
        <router-link to="/" class="">
          <img src="/img/logo.svg" alt="" />
        </router-link>
      </li>
      <li v-for="link in links" class="max-md:hidden">
        <router-link
          :to="link.link"
          class="text-lg text-gray-600 hover:py-10 hover:border-b-4 hover:border-b-orange-400"
        >
          {{ link.name }}</router-link
        >
      </li>
    </ul>
    <ul class="flex items-center gap-10">
      <li class="relative flex flex-col items-center justify-center">
        <div class="relative flex items-center justify-center size-10">
          <img
            @click.prevent="modal = !modal"
            src="/img/icon-cart.svg"
            class="cursor-pointer"
            alt=""
          />
          <div
            v-if="cart.cart.length > 0"
            class="absolute top-0 right-0 flex items-center justify-center text-sm text-white bg-orange-500 rounded-full size-5"
          >
            {{ cart.cart.length }}
          </div>
        </div>
        <div
          v-if="modal"
          id="modal"
          class="absolute z-30 py-4 bg-white divide-y rounded-lg w-80 h-fit top-10 max-md:left-1/2 max-md:-translate-x-1/2 max-md:top-16 max-md:fixed max-md:w-11/12 drop-shadow-xl"
        >
          <h3 class="px-4 py-2 font-bold">Cart</h3>
          <div
            v-if="cart.cart.length == 0"
            class="flex items-center justify-center h-20 font-semibold text-gray-600"
          >
            Your cart is empty
          </div>
          <div v-else class="flex flex-col gap-4 px-4">
            <div
              v-for="(items, index) in cart.cart"
              class="flex items-center justify-between py-4"
            >
              <img
                src="/img/image-product-1-thumbnail.jpg"
                class="size-10"
                alt=""
              />
              <div class="flex-col">
                <h3 class="text-sm">{{ items.name }}</h3>
                <div class="flex gap-2">
                  <span>$125.00</span>
                  <span>x</span>
                  <span>{{ items.quantity }}</span>
                  <span class="font-bold">${{ items.quantity * 125 }}.00</span>
                </div>
              </div>
              <img
                @click.prevent="cart.cart.splice(index, 1)"
                src="/img/icon-delete.svg"
                class="cursor-pointer size-4"
                alt=""
              />
            </div>
            <button
              class="w-full py-4 font-bold text-white bg-orange-400 rounded-xl"
            >
              Checkout
            </button>
          </div>
        </div>
      </li>
      <li
        class="flex items-center justify-center rounded-full size-10 hover:ring-orange-400 hover:ring-2"
      >
        <img src="/img/image-avatar.png" alt="" />
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useCartStore } from "@/stores/counter"

const cart = useCartStore()
const modal = ref(false)
const sideBar = ref(false)

const router = useRouter()
const links = ref([
  {
    name: "Collection",
    link: "/Collection",
  },
  {
    name: "Men",
    link: "/Men",
  },
  {
    name: "Women",
    link: "/",
  },
  {
    name: "About",
    link: "/About",
  },
  {
    name: "Contact",
    link: "/Contact",
  },
])
</script>

<style scoped>
.router-link-active {
  @apply text-black font-semibold;
}
</style>
