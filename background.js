let activeTab = "";

let startTime = Date.now();

chrome.tabs.onActivated.addListener(
    async (activeInfo) => {

        const tab =
        await chrome.tabs.get(
            activeInfo.tabId
        );

        updateTime();

        try {

            activeTab =
            new URL(tab.url).hostname;

        } catch {

            activeTab = "Unknown";

        }

        startTime = Date.now();

    }
);

function updateTime() {

    if (!activeTab) return;

    const timeSpent =
    Date.now() - startTime;

    chrome.storage.local.get(
        ["timeData"],
        (result) => {

            const data =
            result.timeData || {};

            if (!data[activeTab]) {

                data[activeTab] = 0;

            }

            data[activeTab] +=
            timeSpent;

            chrome.storage.local.set(
                { timeData: data }
            );

        }
    );
}