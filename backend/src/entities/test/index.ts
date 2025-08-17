/**
 * @swagger
 * 
 * definitions:
 *  schemas:
 *      Test:
 *          type: object
 *          properties:
 *              property1:
 *                  type: string
 *              property2: 
 *                  type: string
 */

class Test {
    property1: string;
    property2: string;
    
    constructor(
        property1: string,
        property2: string
    ) {
        this.property1 = property1;
        this.property2 = property2;
    }
}