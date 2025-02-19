
function laskePalkka() {
    var maa = document.getElementById("maa").value;
    var pvm = document.getElementById("pvm").value;
    var tuntipalkka = document.getElementById("tuntipalkka").value;
    var tuntimaara = document.getElementById("tuntimaara").value;

    // Tarkista tuntimäärät ja palkat
    if (tuntipalkka == "" || tuntipalkka <= 0) {
        alert("Tuntipalkka on tyhjä tai negatiivinen!\nTuntipalkan tulee olla positiivinen luku!");
        return;
    }
    if (tuntimaara == "" || tuntimaara <= 0) {
        alert("Tuntimäärä on tyhjä tai negatiivinen!\nTuntimäärän tulee olla positiivinen luku.");
        return;
    }

    if (pvm == "") {
        alert("Anna päivämäärä!");
        return;
    }
    //console.log("Syötetty maa: " + maa + " pvm: " + pvm);
    var pvmOsat = pvm.split('-');
    const HOLIDAY_API_KEY = "";
    const HOLIDAY_API_URL = "https://holidays.abstractapi.com/v1/?api_key=" + HOLIDAY_API_KEY + "&country=" + maa + "&year="+ pvmOsat[0] + "&month=" + pvmOsat[1] + "&day=" + pvmOsat[2];
    console.log("URL: " + HOLIDAY_API_URL);
    var xhttp= new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var juhlapyhaData = JSON.parse(this.responseText);
            //console.log(juhlapyhaData)
            var juhlapyhaLisa = 1.0;
            var juhlapyhaTeksti = "(normaali palkka)";
            var palkka = 0;
            var onJuhlapyha = false;

            for (let i = 0; i< juhlapyhaData.length; i++) {
                    console.log("juhlapyhä: " + JSON.stringify(juhlapyhaData[i]));
                    var juhlapyha = juhlapyhaData[i];
                    if (juhlapyha.type == "National")  {
                        onJuhlapyha = true;
                        juhlapyhaLisa = 2.0;
                        juhlapyhaTeksti = "(korotettu palkka)";
                        document.getElementById("juhlapyhaNimi").textContent = "Juhlapyhä: " + juhlapyha.name;
                    }
            }
            if (juhlapyhaData.length == 0 || !onJuhlapyha) {
                document.getElementById("juhlapyhaNimi").textContent = "Ei juhlapyhää";
            }
            palkka = tuntipalkka * tuntimaara * juhlapyhaLisa;
;
            document.getElementById("juhlapyhaTeksti").textContent = juhlapyhaTeksti;
            document.getElementById("palkkaMaara").textContent = palkka + " euroa";
        }
    };
    xhttp.open("GET", HOLIDAY_API_URL, true);
    xhttp.send();
}

// Aseta päivämääräksi tämä päivä
document.addEventListener("DOMContentLoaded", function(event) {
    document.getElementById("pvm").value = new Date().toISOString().slice(0, 10);
  });
