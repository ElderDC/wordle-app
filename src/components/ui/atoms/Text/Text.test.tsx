import { render, screen, fireEvent } from '@testing-library/react'
import Text from './Text'

describe('Text', () => {
    // runs before each test
    // beforeEach(() => {
    //     render(<Text>Test</Text>)
    // })

    test('should be defined', () => {
        render(<Text>Test</Text>)
        expect(screen.getByText('Test')).toBeDefined()
    })
})