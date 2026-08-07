document.addEventListener("DOMContentLoaded", () => {
    const cityDatabase = {
        "moscow": { name: "Москве", phone: "+7 (495) 123-45-67" },
        "spb": { name: "Санкт-Петербурге", phone: "+7 (812) 987-65-43" },
        "sochi": { name: "Сочи", phone: "+7 (862) 000-00-00" },
        "default": { name: "вашем городе", phone: "8 (800) 000-00-00" }
    };

    let path = window.location.pathname.replace(/\//g, "").toLowerCase();
    let currentCity = cityDatabase[path] || cityDatabase["default"];

    function updateContent(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            node.nodeValue = node.nodeValue
                .replace(/{city}/g, currentCity.name)
                .replace(/{phone}/g, currentCity.phone);
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            Array.from(node.attributes).forEach(attr => {
                if (attr.value.includes('{city}') || attr.value.includes('{phone}')) {
                    attr.value = attr.value
                        .replace(/{city}/g, currentCity.name)
                        .replace(/{phone}/g, currentCity.phone);
                }
            });
            node.childNodes.forEach(updateContent);
        }
    }

    updateContent(document.documentElement);
    document.title = document.title.replace(/{city}/g, currentCity.name);
});
