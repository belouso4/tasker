import mobileNav from "./modules/mobile-nav";
mobileNav()

console.log('ok')

const func = () => {
    // let num1 = 88
    // let num2 = 88

    // console.log(num1 + num2)

    class sums {
        constructor() {
            this.fruit = 23 
            this.strin = 'rot' 
        }
    }

    const cosr = new sums()

    if (Object.keys(cosr).length) {
        console.log(cosr.fruit + 44)
    }

    return [1,2,3,4,5,6,7,7,8,3]
}

let att = func()

console.log(...att)