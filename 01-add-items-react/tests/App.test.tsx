import React from 'react'
import userEvent from '@testing-library/user-event'
import {describe, test, expect} from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '../src/App'

describe('<App/>', () =>{
    test('should work', ()=> {
        render(<App/>)

        expect(
            screen.getByText('Mi prueba técnica')
        ).toBeDefined()
    })

    test('should add items and remove them', async() => {
        const user = userEvent.setup()

        render(<App />)

        // Search Input
        const input = screen.getByRole('textbox')
        expect(input).toBeDefined()

        // Search form
        const form = screen.getByRole('form')
        expect(form).toBeDefined()

        const button = form.querySelector('button')
        expect(button).toBeDefined()

        const randomUUID = crypto.randomUUID()
        await user.type(input, randomUUID)
        await user.click(button!)

        // Asegurar que el elemento se ha agregado
        const list = screen.getByRole('list')
        expect(list).toBeDefined()
        expect(list.childNodes.length).toBe(1)

        // Asegurarnos que lo podemos borrar
        const item = screen.getByText(randomUUID)
        const removeButton = item.querySelector('button')
        expect(removeButton).toBeDefined()

        await user.click(removeButton!)

        const noResult = screen.getByText('No hay elementos en la lista')
        expect(noResult).toBeDefined()
    })
})