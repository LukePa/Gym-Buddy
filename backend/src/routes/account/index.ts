import {Router} from "express";
import * as UserAuthService from "../../services/userAuthService";
import * as UserService from "../../services/userService";

const router = Router();

// TODO: REMOVE
/**
 * @swagger
 * 
 * /account/test:
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
//TODO: REMOVE
// router.get("/", (req, res) => {
//     res.send("Auth base route")
// })

/**
 * @swagger
 * 
 * /account/login:
 *  post:
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/definitions/requests/UsernamePassword'
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
    let formattedRequest: UsernamePasswordRequest;
    try {
        formattedRequest = UsernamePasswordRequest.fromRequestBody(req.body)
    } catch(e) {
        res.status(400)
            .send({error: UsernamePasswordRequest.failMessage})
        return;
    }
    
    const verified = await UserAuthService.verifyLogin(
        formattedRequest.username,
        formattedRequest.password
    )
    
    if (!verified) {
        res.status(401).send({error: "Invalid username or password"});
        return;
    }
    
    const user = await UserService.getUserByName(formattedRequest.username);
    if (!user) throw new Error();
    
    const jwt = await UserAuthService.generateJWT(user.id)
    
    res.status(200).send({token: jwt})
})

/**
 * @swagger
 * 
 * /account/create:
 *  post:
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/definitions/requests/UsernamePassword'
 *      responses:
 *          201:
 *              description: User created
 *              type: string
 *              content:
 *                  text/plain:
 *                      schema:
 *                          type: string              
 *          400:
 *              description: Invalid request
 *              content:
 *                  text/plain:
 *                      schema:
 *                          type: string
 */
router.post("/create", async (req, res) => {
    let formattedRequest: UsernamePasswordRequest;
    try {
        formattedRequest = UsernamePasswordRequest.fromRequestBody(req.body)
    } catch(e) {
        res.status(400)
            .send({error: UsernamePasswordRequest.failMessage})
        return;
    }
    
    await UserService.createNewUser(formattedRequest.username, formattedRequest.password)
    res.status(201).send("User created successfully")
})

export default router;