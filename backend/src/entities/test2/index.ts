/**
 * @swagger
 * 
 * definitions:
 *  schemas:
 *      Test2:
 *          type: object
 *          properties:
 *              property3:
 *                  type: string
 *              property4:
 *                  type: string
 */

class Test2 {
    property3: string;
    property4: string;

    constructor(
        property3: string,
        property4: string
    ) {
        this.property3 = property3;
        this.property4 = property4;
    }
}