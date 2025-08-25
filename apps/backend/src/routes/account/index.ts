import {Router} from "express";
import * as UserAuthService from "../../services/userAuthService";
import * as UserService from "../../services/userService";
import {PostLoginRequestMapper, PostLoginResponseMapper} from "@gym-buddy/requestresponsetypes/mappers/routes/account/PostLogin"
import type {PostCreateRequest, PostLoginRequest} from "@gym-buddy/requestresponsetypes/models/requests/account";
import {
    PostCreateRequestMapper,
    PostCreateResponseMapper
} from "@gym-buddy/requestresponsetypes/mappers/routes/account/PostCreate";
import {ErrorResponseMapper} from "@gym-buddy/requestresponsetypes/mappers/errorResponse";

const router = Router();

router.post("/login", async (req, res) => {
    let formattedRequest: PostLoginRequest;
    try {
        formattedRequest = PostLoginRequestMapper.fromAny(req.body);
    } catch(e) {
        res.status(400)
            .send(ErrorResponseMapper.create("Invalid request shape for account/login"))
        return;
    }
    
    const verified = await UserAuthService.verifyLogin(
        formattedRequest.username,
        formattedRequest.password
    )
    
    if (!verified) {
        res.status(401).send(ErrorResponseMapper.create("Invalid username or password"));
        return;
    }
    
    const user = await UserService.getUserByName(formattedRequest.username);
    if (!user) throw new Error();
    
    const jwt = await UserAuthService.generateJWT(user.id)
    const response = PostLoginResponseMapper.create(jwt);
    res.status(200).send(response)
})

router.post("/create", async (req, res) => {
    let formattedRequest: PostCreateRequest;
    try {
        formattedRequest = PostCreateRequestMapper.fromAny(req.body)
    } catch(e) {
        res.status(400)
            .send(ErrorResponseMapper.create("Invalid request shape for account/create"));
        return;
    }
    
    const hasExistingUser = await UserService.hasExistingUser(formattedRequest.username);
    
    if (hasExistingUser) {
        res.status(400)
            .send({error: "Can not have duplicate username"})
    }
    
    const id = await UserService.createNewUser(formattedRequest.username, formattedRequest.password)
    const token = await UserAuthService.generateJWT(id);
    res.status(201).send(PostCreateResponseMapper.create(token))
})

export default router;