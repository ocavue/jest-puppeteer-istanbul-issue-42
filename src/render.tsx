import React from 'react'
import ReactDOM from 'react-dom'
import HelloWorld from "./HelloWorld"

export function render() {
    ReactDOM.render(<HelloWorld />, document.querySelector('#app'))
}