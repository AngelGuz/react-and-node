import './App.css'
import { Item } from './components/item'
import { useItems } from './hooks/useItems'
import { useSEO } from './hooks/useSEO'

export type ItemId = `${string}-${string}-${string}-${string}-${string}`

export interface Item {
  id: ItemId,
  timestamp: number,
  text: string
}

function App() {
  const {items, addItem, removeItem} = useItems()
  useSEO({
    title: `[${items.length}]  Prueba de React`,
    description: 'Añadir y eliminar elementos de la lista'
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const { elements } = event.currentTarget
    const input = elements.namedItem('item')

    const isInput = input instanceof HTMLInputElement
    if (!isInput ||input==null) return

    addItem(input.value)

    input.value = ''
  }

  // funcion de orden superior
  const createHandleRemoveItem = (id: ItemId) => () => {
    removeItem(id)
  }

  return (
    <main>
        <h1>Mi prueba técnica</h1>
        <h2>Añadir y eliminar elementos de una lista</h2>
        <aside>
          <form onSubmit={handleSubmit} aria-label='Añadir elementos a la lista'>
            <label>
              Elemento a introducir:
              <input
                name='item'
                required
                type='text'
                placeholder='Agregue algo a la lista'
              />
            </label>
            <button>Añadir elementoa la lista</button>
          </form>
        </aside>
        <section>
          <h2>Lista de elementos</h2>
            {
              items.length === 0 ?
              (
                <p><strong>No hay elementos en la lista</strong></p>
              ) : (
                <ul>
                  {
                    items.map(item => {
                      return <Item 
                        handleClick={createHandleRemoveItem(item.id)} 
                        key={item.id}
                        {...item} 
                      />
                    })
                  }
                </ul>
              )
            }
        </section>
    </main>
  )
}

export default App
