export function readConfig(): Config {
    const config: Config = {
        showRoundNames: true,
        winnersOnly: false,
        losersOnly: false
    }

    const options: Array<string> = [];
    location.search.split("&").forEach((option) => options.push(option.toLocaleLowerCase()));

    if (options.includes("notext")) {
        config.showRoundNames = false;
    }

    if (options.includes("winners") || options.includes("w")) {
        config.winnersOnly = true;
    } else if (options.includes("losers") || options.includes("l")) {
        config.losersOnly = true;
    }

    return config;
}