import { ref, computed } from "vue"
import { defineStore } from "pinia"
import type { Ref } from "vue"

interface cartItem {
  name: string
  price: string
  quantity: number
}

export const useCounterStore = defineStore("counter", () => {
  const count = ref(0)
  function increment() {
    count.value++
  }

  function decrement() {
    if (count.value == 0) {
      return
    }
    count.value--
  }

  return { count, increment, decrement }
})

export const useCartStore = defineStore("cart", () => {
  const cart: Ref<cartItem[]> = ref([])

  return { cart }
})
