import { Router } from "express";
import { checkJwt } from "../middlewares/access-rules/CheckJwt";
import { checkUserRole } from "../middlewares/access-rules/CheckRole";
import { AppConstants } from "../config/AppConstants";
import { CompaniesController } from "../controllers/CompaniesController";
import { CompaniesRequestMiddleware } from "../middlewares/CompaniesRequestMiddleware";

export class CompaniesRoutes {
    private companiesController = new CompaniesController()

    public routes(router: any) {
        router.get(
            '/companies',
            checkJwt,
            checkUserRole([AppConstants.USER_ROLES.Admin, AppConstants.USER_ROLES.User]),
            this.companiesController.getList
        )
        router.get(
            '/companies/:id',
            checkJwt,
            checkUserRole([AppConstants.USER_ROLES.Admin, AppConstants.USER_ROLES.User]),
            this.companiesController.getById
        )
        router.post(
            '/companies',
            checkJwt,
            checkUserRole([AppConstants.USER_ROLES.Admin]),
            CompaniesRequestMiddleware.verifyCreateRequest,
            this.companiesController.create
        )
        router.put(
            '/companies/:id',
            checkJwt,
            checkUserRole([AppConstants.USER_ROLES.Admin]),
            CompaniesRequestMiddleware.verifyUpdateRequest,
            this.companiesController.update
        )


    }
}