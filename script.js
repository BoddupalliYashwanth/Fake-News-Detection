async function checkNews(){

    const text = document.getElementById("news").value;
    const result = document.getElementById("result");
    const loading = document.getElementById("loading");

    if(text.trim() === ""){
        result.innerText = "Please enter news text";
        return;
    }

    loading.classList.remove("hidden");
    result.innerText = "";

    try {
        const response = await fetch("http://127.0.0.1:5000/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ news: text })
        });

        const data = await response.json();

        loading.classList.add("hidden");

        result.innerText = data.prediction;

        if(data.prediction === "REAL"){
            result.className = "real";
        } else {
            result.className = "fake";
        }

    } catch (error){
        loading.classList.add("hidden");
        result.innerText = "Server Error";
    }
}