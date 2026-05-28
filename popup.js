const websiteList =
document.getElementById("websiteList");

const totalTimeEl =
document.getElementById("totalTime");

const siteCountEl =
document.getElementById("siteCount");

const scoreEl =
document.getElementById("score");

chrome.storage.local.get(
    ["timeData"],
    (result) => {

        const data =
        result.timeData || {};

        let totalTime = 0;

        let productiveTime = 0;

        const productiveSites = [
            "github.com",
            "stackoverflow.com",
            "chat.openai.com"
        ];

        const sites =
        Object.keys(data);

        siteCountEl.textContent =
        sites.length;

        sites.forEach((site) => {

            totalTime += data[site];

            if (
                productiveSites.includes(site)
            ) {

                productiveTime += data[site];

            }

        });

        totalTimeEl.textContent =
        `${Math.floor(totalTime / 1000)} sec`;

        let score = 0;

        if (totalTime > 0) {

            score = Math.floor(
                (productiveTime / totalTime)
                * 100
            );

        }

        scoreEl.textContent =
        `${score}%`;

        sites.forEach((site) => {

            const time =
            Math.floor(data[site] / 1000);

            const percent =
            totalTime > 0
            ? (data[site] / totalTime) * 100
            : 0;

            const div =
            document.createElement("div");

            div.classList.add("website");

            div.innerHTML = `
                <strong>${site}</strong>
                <br>
                Time Spent: ${time} sec

                <div class="progress">
                    <div
                    class="progress-bar"
                    style="
                    width:${percent}%">
                    </div>
                </div>
            `;

            websiteList.appendChild(div);

        });

    }
);