<template>
  <main
    class="container grid grid-cols-2 md:mt-20 max-md:grid-cols-1 max-md:px-0"
  >
    <div
      v-if="lightbox"
      class="fixed top-0 left-0 z-40 w-full h-full bg-black bg-opacity-80"
    ></div>
    <div
      v-if="lightbox"
      id="lightbox"
      class="fixed z-50 grid w-1/2 grid-cols-4 -translate-x-1/2 -translate-y-1/2 gap-y-4 gap-x-4 top-1/2 left-1/2"
    >
      <img
        @click.prevent="lightbox = !lightbox"
        class="flex col-span-4 justify-self-end"
        src="/img/icon-close.svg"
        alt=""
      />
      <div class="relative col-span-4">
        <img
          class="object-cover w-full h-full rounded-lg"
          :src="`/img/image-product-` + imgSrc + `.jpg`"
          alt=""
        />

        <button
          @click.prevent="imgSrc == 1 ? (imgSrc = 4) : imgSrc--"
          class="absolute p-3 -translate-y-1/2 bg-white rounded-full top-1/2 -left-5"
        >
          <img
            src="/img/icon-previous.svg"
            class="object-contain size-3"
            alt=""
          />
        </button>
        <button
          @click.prevent="imgSrc % 4 == 0 ? (imgSrc = 1) : imgSrc++"
          class="absolute p-3 -translate-y-1/2 bg-white rounded-full top-1/2 -right-5"
        >
          <img src="/img/icon-next.svg" class="object-contain size-3" alt="" />
        </button>
      </div>
      <img class="rounded-lg" src="/img/image-product-1.jpg" alt="" />
      <img class="rounded-lg" src="/img/image-product-2.jpg" alt="" />
      <img class="rounded-lg" src="/img/image-product-3.jpg" alt="" />
      <img class="rounded-lg" src="/img/image-product-4.jpg" alt="" />
    </div>
    <div
      :class="{
        ' max-h-40 opacity-100': modalSucces,
        '  max-h-0 opacity-0': !modalSucces,
      }"
      class="fixed z-50 flex items-center justify-center px-4 py-4 font-bold text-orange-500 transition-all delay-300 -translate-x-1/2 -translate-y-1/2 bg-white top-1/2 left-1/2 succesmodal w-80 ring-orange-500 ring"
    >
      Succesfully Add to Cart
    </div>
    <div
      :class="{
        ' max-h-40 opacity-100': modalError,
        '  max-h-0 opacity-0': !modalError,
      }"
      class="fixed z-50 flex items-center justify-center px-4 py-4 font-bold text-orange-500 transition-all delay-300 -translate-x-1/2 -translate-y-1/2 bg-white top-1/2 left-1/2 succesmodal w-80 ring-orange-500 ring"
    >
      Sorry but your quantity is 0
    </div>
    <div class="relative w-full h-80 md:hidden">
      <img
        class="object-cover w-full h-full"
        :src="`/img/image-product-` + imgSrc + `.jpg`"
        alt=""
      />
      <div
        class="absolute left-0 flex items-center justify-between w-full px-5 -translate-y-1/2 top-1/2"
      >
        <button
          @click.prevent="imgSrc == 1 ? (imgSrc = 4) : imgSrc--"
          class="p-3 bg-white rounded-full"
        >
          <img
            src="/img/icon-previous.svg"
            class="object-contain size-3"
            alt=""
          />
        </button>
        <button
          @click.prevent="imgSrc % 4 == 0 ? (imgSrc = 1) : imgSrc++"
          class="p-3 bg-white rounded-full"
        >
          <img src="/img/icon-next.svg" class="object-contain size-3" alt="" />
        </button>
      </div>
    </div>
    <div class="flex flex-col gap-x-7 gap-y-5 max-md:hidden">
      <img
        @click.prevent="lightbox = !lightbox"
        class="rounded-xl h-[500px] object-cover cursor-pointer"
        src="/img/image-product-1.jpg"
        alt=""
      />
      <div class="grid grid-cols-4 gap-x-4">
        <img
          @click.prevent="lightbox = !lightbox"
          class="cursor-pointer rounded-xl"
          src="/img/image-product-1.jpg"
          alt=""
        />
        <img
          @click.prevent="lightbox = !lightbox"
          class="cursor-pointer rounded-xl"
          src="/img/image-product-2.jpg"
          alt=""
        />
        <img
          @click.prevent="lightbox = !lightbox"
          class="cursor-pointer rounded-xl"
          src="/img/image-product-3.jpg"
          alt=""
        />
        <img
          @click.prevent="lightbox = !lightbox"
          class="cursor-pointer rounded-xl"
          src="/img/image-product-4.jpg"
          alt=""
        />
      </div>
    </div>
    <div class="flex flex-col justify-center p-5 md:ps-20">
      <h2 class="font-bold text-orange-600">SNEAKER COMPANY</h2>
      <h1 class="mt-5 text-5xl font-bold max-md:text-3xl max-md:mt-3">
        Fall Limited Edition Sneakers
      </h1>
      <p class="mt-10 text-lg text-gray-500 max-md:text-sm max-md:mt-5">
        These low-profile sneakers are your prefect casual wear companion.
        Featuring a durable rubber outer sole, they'll withstand everything the
        weather can offer.
      </p>
      <div class="flex justify-between mt-5 max-md:items-center md:flex-col">
        <div class="flex items-center gap-4">
          <span class="text-xl font-bold">$125.00</span>
          <span class="px-2 font-bold text-orange-500 bg-orange-100">50%</span>
        </div>
        <span class="font-semibold text-gray-500 line-through">$250.00</span>
      </div>
      <div class="flex items-center flex-1 gap-4 mt-10 max-lg:flex-col">
        <div
          class="flex items-center justify-between w-full px-4 py-4 bg-gray-100 rounded-xl"
        >
          <button @click.prevent="countStore.decrement">
            <img src="/img/icon-minus.svg" alt="" />
          </button>
          <span class="font-semibold">{{ countStore.count }}</span>
          <button @click.prevent="countStore.increment">
            <img src="/img/icon-plus.svg" alt="" />
          </button>
        </div>
        <button
          @click.prevent="onAddtoCart"
          class="flex items-center justify-center w-full gap-4 px-4 py-4 text-sm font-semibold text-white bg-orange-400 rounded-xl"
        >
          <img class="object-contain size-5" src="/img/icon-cart.svg" alt="" />
          Add to cart
        </button>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useCounterStore, useCartStore } from "@/stores/counter"

const countStore = useCounterStore()
const cartStore = useCartStore()
const modalSucces = ref(false)
const modalError = ref(false)
const imgSrc = ref(1)
const lightbox = ref(false)

const onAddtoCart = () => {
  if (countStore.count == 0) {
    modalError.value = true

    setTimeout(() => {
      clearInterval
      modalError.value = false
    }, 2000)
    return
  }
  const input = ref({
    name: "Fall Limited Edition Sneakers",
    price: "$125.00",
    quantity: countStore.count,
  })

  modalSucces.value = true

  setTimeout(() => {
    clearInterval
    modalSucces.value = false
  }, 2000)

  cartStore.cart.push(input.value)
}
</script>

<style scoped></style>
