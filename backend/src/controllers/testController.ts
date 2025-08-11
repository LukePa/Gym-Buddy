import {
    Body,
    Controller,
    Get,
    Path,
    Post,
    Query,
    Route,
    SuccessResponse,
} from "tsoa";
import {Test} from "../models/test";


@Route("test")
export class TestController extends Controller {
 
    @Get("{prop1}")
    public async getTest(@Path() prop1: string, @Query() prop2?: string
    ): Promise<Test> {
        const t: Test =  {
            prop1,
            prop2: prop2 ?? "undefined prop 2"
        }
        return t
    }
}