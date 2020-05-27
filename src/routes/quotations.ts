import { Router } from "express";
import { checkJwt } from "../middlewares/access-rules/CheckJwt";
import { checkUserRole } from "../middlewares/access-rules/CheckRole";
import { AppConstants } from "../config/AppConstants";
import { ProductsRequestMiddleware } from "../middlewares/ProductsRequestMiddleware";
import { QuotationsController } from "../controllers/QuotationsController";
import { QuotationsRequestMiddleware } from "../middlewares/QuotationsRequestMiddleware";

export class QuotationsRoutes {
    private controller = new QuotationsController()

    public routes(router: any) {
        router.get(
            '/quotations',
            checkJwt,
            checkUserRole([AppConstants.USER_ROLES.Admin, AppConstants.USER_ROLES.User]),
            this.controller.getQuotations
        )
        router.get(
            '/quotations/:id',
            checkJwt,
            checkUserRole([AppConstants.USER_ROLES.Admin, AppConstants.USER_ROLES.User]),
            this.controller.getQuotationById
        )
        router.post(
            '/quotations',
            checkJwt,
            checkUserRole([AppConstants.USER_ROLES.Admin]),
            QuotationsRequestMiddleware.verifyCreateRequest,
            this.controller.create
        )
        router.put(
            '/quotations/:id',
            checkJwt,
            checkUserRole([AppConstants.USER_ROLES.Admin]),
            QuotationsRequestMiddleware.verifyUpdateRequest,
            this.controller.update
        )
        router.delete(
            '/quotations/:id',
            checkJwt,
            checkUserRole([AppConstants.USER_ROLES.Admin]),
            this.controller.delete
        )

    }
}