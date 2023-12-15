//Temperature
{
    const temperature = (celcius) => {
        const fahrenheit = (celcius * 9 / 5) + 32;
        return fahrenheit
    }
    // const tempc = 25 for checking
    // const tempf = temperature(tempc)
    // console.log(tempf)
}

//RGB
{
    const RGB = (r, g, b) => {
        const red = r.toString(16).padStart(2, '0');
        const green = g.toString(16).padStart(2, '0');
        const blue = b.toString(16).padStart(2, '0');
        const result = `${red}${green}${blue}`
        return result
    }
}

//Flats
