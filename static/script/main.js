function Header() {
    return (
        <>
            <header>
                <img src="../../img/logo.png" />
                <div className="title">App meteo</div>
            </header>
        </>
    )
}

function Main() {
    let [temp, setTemp] = React.useState("")
    let [cit, setCit] = React.useState("")
    let [day, setDay] = React.useState("")
    let [met, setMet] = React.useState("")

    React.useEffect(() => {
        function geoLoc() {
            navigator.geolocation.getCurrentPosition((pos) => {
                try {
                    let lat = pos.coords.latitude;
                    let lon = pos.coords.longitude;

                    meteo(lat, lon)
                } catch(error) {    
                    console.log(errore)
                }
            })
        }

        geoLoc()
    }, [])

    async function meteo(lat, lon) {
        let url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
        let url_citta = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=it`;

        const weatherCodes = {
            0: "Cielo sereno",
            1: "Principalmente sereno",
            2: "Parzialmente nuvoloso",
            3: "Nuvoloso / Coperto",
            45: "Nebbia",
            48: "Nebbia con brina",
            51: "Pioggerella leggera",
            53: "Pioggerella moderata",
            55: "Pioggerella intensa",
            56: "Pioggia congelante leggera",
            57: "Pioggia congelante intensa",
            61: "Pioggia leggera",
            63: "Pioggia moderata",
            65: "Pioggia intensa",
            66: "Pioggia congelante leggera",
            67: "Pioggia congelante intensa",
            71: "Neve leggera",
            73: "Neve moderata",
            75: "Neve intensa",
            77: "Granelli di neve",
            80: "Rovesci di pioggia leggeri",
            81: "Rovesci di pioggia moderati",
            82: "Rovesci di pioggia forti",
            85: "Rovesci di neve leggeri",
            86: "Rovesci di neve forti",
            95: "Temporale",
            96: "Temporale con grandine leggera",
            99: "Temporale con grandine intensa"
        };

        fetch(url)
        .then(response => response.json())
        .then(data => {
            setTemp(data.current_weather.temperature)
            if (data.current_weather.is_day == 0) {
                setDay("Notte")
            } else {
                setDay("Giorno")
            }
            let codice = data.current_weather.weathercode;
            setMet(weatherCodes[codice] || "Non disponibile");
        })

        fetch(url_citta)
        .then(response => response.json())
        .then(data => {
            setCit(data.city)
        })
    }

    return (
        <>
            <main>
                <div><span className="utiity">Ti trovi a:</span> {cit}</div>
                <div><span className="utiity">Una temperatura di:</span> {temp}°C</div>
                <div><span className="utiity">Siamo di:</span> {day}</div>
                <div><span className="utiity">Tempo fuori:</span> {met}</div>
            </main>
        </>
    )
}

function Footer() {
    return (
        <>
            <footer>
                developed by @Mattia De Vincentis
            </footer>
        </>
    )
}

function App() {
    return (
        <>
            <div className="container">
                <Header />
                <Main />
                <Footer />
            </div>
        </>
    )
}

const root = ReactDOM.createRoot(document.getElementById('app'))
root.render(<App />)