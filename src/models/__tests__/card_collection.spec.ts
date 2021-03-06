import { Card } from "../cards";
import { CardCollection } from "../card_collention";

describe('Test CardCollection', () => {
  class TestCard extends Card { }
  class TestCollection extends CardCollection { }

  const c1 = new TestCard()
  const c2 = new TestCard()
  const c3 = new TestCard()
  const c4 = new TestCard()
  const cards = [c1, c2, c3, c4]

  describe('constructor', () => {
    const collection = new TestCollection(cards)

    it('カードの配列を引数に与えて生成できる', () => {
      expect(collection).toBeInstanceOf(TestCollection)
    })
  })

  describe('get', () => {
    const collection = new TestCollection(cards)

    describe('length', () => {
      it('生成時与えられたカードの長さであること', () => {
        expect(collection.length).toBe(cards.length)
      })
    })
  })

  describe('slice', () => {
    const collection = new TestCollection(cards)

    describe('引数なし', () => {
      it('コレクションの中に存在するカードの配列が取得されること', () => {
        expect(collection.slice()).toStrictEqual([c1, c2, c3, c4])
      })
    })

    describe('startを与えたとき', () => {
      it('引数で与えたindexから最後まで取得されること', () => {
        expect(collection.slice(2)).toStrictEqual([c3, c4])
      })
    })

    describe('start, endを与えたとき', () => {
      it('startとして与えたindexからendとして与えたindexの前取得されること', () => {
        expect(collection.slice(1, 3)).toStrictEqual([c2, c3])
      })
    })
  })

  describe('追加系', () => {
    const c5 = new TestCard()
    const c6 = new TestCard()
    const add = [c5, c6]

    describe('addToTop', () => {
      it('上に任意の数追加されること', () => {
        const base = new TestCollection(cards)
        base.addToTop(add)
        expect(base.slice()).toStrictEqual([c5, c6, c1, c2, c3, c4])
      })
    })

    describe('addToBottom', () => {
      it('下に任意の数追加されること', () => {
        const base = new TestCollection(cards)
        base.addToBottom(add)
        expect(base.slice()).toStrictEqual([c1, c2, c3, c4, c5, c6])
      })
    })

  })

  describe('take', () => {
    describe('引数なし', () => {
      const c = new TestCollection(cards)
      const r = c.take()

      it('1枚1番上から取得されること', () => {
        expect(r).toStrictEqual([c1])
      })
      it('1番上を除いた残りになること', () => {
        expect(c.slice()).toStrictEqual([c2, c3, c4])
      })
    })

    describe('引数あり', () => {
      const collection = new TestCollection(cards)
      const recieved = collection.take(3)

      it('上から引数に与えた分だけ取得されること', () => {
        expect(recieved).toStrictEqual([c1, c2, c3])
      })
      it('与えた引数分除かれた残りになること', () => {
        expect(collection.slice()).toStrictEqual([c4])
      })
    })

    describe('コレクションの長さを上回る引数の場合', () => {
      const collection = new TestCollection(cards)
      const recieved = collection.take(100)
      it('全て取得されること', () => {
        expect(recieved).toStrictEqual([c1, c2, c3, c4])
      })
      it('取得元は空になること', () => {
        expect(collection.slice()).toStrictEqual([])
      })
    })
  })
})
