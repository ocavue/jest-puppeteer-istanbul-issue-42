import React from 'react'

// This function will be coveraged
function doSomeMath1() {
    let sum = 0
    for (let i = 0; i < 100; i++) {
        sum += 1
    }
    return sum
}

// This function will NOT be coveraged
function doSomeMath2() {
    let sum = 0
    for (let i = 0; i < 100; i++) {
        sum += 2
    }
    return sum
}

const HelloWorld = () => {
    let sum = 0
    if (1+1 == 2) {
        sum = doSomeMath1()
    } else {
        sum = doSomeMath2()
    }

    return (
        <div className='hello-world'>
            <h1>Hello World</h1>
            <p>The math result is <span id="math-result">{sum}</span></p>
        </div>
    )
}

export default HelloWorld