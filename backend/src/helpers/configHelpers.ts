


export function getJwtSecret(): Buffer {
    if (typeof process.env.JWT_SECRET !== "string") throw new Error("Must include JWT_SECRET in env")
    return Buffer.from(process.env.JWT_SECRET);
}