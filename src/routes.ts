import { Request, Response } from "express";
import { ResponseWrapperUtil } from "./utils/ResponseWrapperUtil";
import { CommonUtil } from "./utils/CommonUtil";
import { AppConstants } from "./config/AppConstants";
import { UserController } from "./controllers/UserController";
import { UserRequestMiddleware } from "./middlewares/UserRequestMiddleware";
import { ProductsRoutes } from "./routes/products";
import { CompaniesRoutes } from "./routes/companies";
import { QuotationsRoutes } from "./routes/quotations";
import { Router } from 'express'
import path from 'path'

const router = Router()

export class Routes {
  private userController = new UserController();
  constructor() { }
  public routes(app: any): Router {
    router.get("/test", (req: Request, res: Response) => {
      ResponseWrapperUtil.sendSuccessResponse(res, {
        apiId: CommonUtil.getApiId("test"),
        responseCode: AppConstants.RESPONSE_CODES.OK,
        message: "Welcome"
      });
    });

    router.get("/files/:fileName", function (req: any, res: any) {
      try {
        res.sendFile(
          path.join(__dirname + "/../uploads/" + req.params.fileName)
        );
      } catch (err) {
        res.status(404).send(err);
      }
    });

    router.post('/generate-password', this.userController.generatePassword)

    router.post('/login', UserRequestMiddleware.verifyUserLoginRequest, this.userController.userLogin)
    router.post('/logout', this.userController.logout)

    let companiesRoutes = new CompaniesRoutes()
    companiesRoutes.routes(router)

    let productsRoutes: ProductsRoutes = new ProductsRoutes()
    productsRoutes.routes(router)

    let quotationsRoutes: QuotationsRoutes = new QuotationsRoutes()
    quotationsRoutes.routes(router)

    return router
  }
}
