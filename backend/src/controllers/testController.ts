import {
    Body,
    Controller,
    Get,
    Path,
    Post,
    Query,
    Route, Security,
    SuccessResponse,
    Request
} from "tsoa";
import {Test} from "../models/test";
import {Request as exRequest} from "express"


@Route("test")
export class TestController extends Controller {
 
    @Get("{prop1}")
    public async getTest(
        @Request() request: exRequest,
        @Path() prop1: string, 
        @Query() prop2?: string, 
    ): Promise<Test> {
        console.log(request.userId)
        const t: Test =  {
            prop1,
            prop2: prop2 ?? "undefined prop 2"
        }
        return t
    }
}