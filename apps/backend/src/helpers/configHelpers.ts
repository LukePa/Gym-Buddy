


export function getJwtSecret(): Buffer {
    if (typeof process.env.JWT_SECRET !== "string") throw new Error("Must include JWT_SECRET in env")
    return Buffer.from(process.env.JWT_SECRET);
}

export function getJwtExpiryTime(): number {
    if (typeof process.env.JWT_EXPIRY === "string") {
        const parsedNumber = Number.parseInt(process.env.JWT_EXPIRY);
        if (Number.isNaN(parsedNumber)) throw new Error("JWT_EXPIRY env variable must be an integer")
        return parsedNumber;
    }
    
    return 900; // 15 minutes
}