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

    React.useEffect(() => {
        function geoLoc() {
            console.log("Avviata")
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

        fetch(url)
        .then(response => response.json())
        .then(data => {
            setTemp(data.current_weather.temperature)
            if (data.current_weather.is_day == 0) {
                setDay("Notte")
            } else {
                setDay("Giorno")
            }
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
                <div>{cit}</div>
                <div>{temp}</div>
                <div>{day}</div>
            </main>
        </>
    )
}

function Footer() {
    return (
        <>
            <footer>
                FOOTER
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