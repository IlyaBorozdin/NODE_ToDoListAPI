class Cmd {

    parse(raw) {
        const parts = raw.trim().split(' ');

        return {
            method: parts[0],
            path: parts[1],
            data: parts.length > 2 ? JSON.parse(parts.slice(2).join(' ')) : undefined
        };
    }
}

module.exports = new Cmd();