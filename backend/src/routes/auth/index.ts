import {Router} from "express";
import * as UserAuthService from "../../services/userAuthService";
import * as UserService from "../../services/userService";

const router = Router();

/**
 * @swagger
 * 
 * /auth/test:
 *  get:
 *      produces:
 *          - application/json
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/definitions/schemas/Test'
 *      responses:
 *          200:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/schemas/Test2'
 * 
 */
router.get("/", (req, res) => {
    res.send("Auth base route")
})

/**
 * @swagger
 * 
 * /auth/login:
 *  post:
 *      produces:
 *          - application/json
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          username:
 *                              type: string
 *                          password:
 *                              type: string
 *               
 *      responses:
 *          200:
 *              description: json web token
 *              content:
 *                  application/json:
 *                      schema: 
 *                          type: object
 *                          properties:
 *                            token:
 *                              type: string
 *          401:
 *              description: Unauthorised
 *          400:
 *              description: Invalid request
 *          
 *          
 */
router.post("/login", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    
    if (typeof username !== "string" || typeof password !== "string") {
        res.status(400).send({error: "Must supply username and password"})
    }
    
    const verified = await UserAuthService.verifyLogin(username, password)
    
    if (!verified) {
        res.status(401).send({error: "Invalid username or password"});
        return;
    }
    
    const user = await UserService.getUserByName(username);
    if (!user) throw new Error();
    
    const jwt = await UserAuthService.generateJWT(user.id)
    
    res.status(200).send({token: jwt})
})



export default router;