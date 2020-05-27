import { Router } from "express";
import { checkJwt } from "../middlewares/access-rules/CheckJwt";
import { checkUserRole } from "../middlewares/access-rules/CheckRole";
import { AppConstants } from "../config/AppConstants";
import { ProductsController } from "../controllers/ProductsController";
import { ProductsRequestMiddleware } from "../middlewares/ProductsRequestMiddleware";

export class ProductsRoutes {
    private productsController = new ProductsController()

    public routes(router: any) {
        router.get(
            '/products',
            checkJwt,
            checkUserRole([AppConstants.USER_ROLES.User, AppConstants.USER_ROLES.Admin]),
            this.productsController.getProducts
        )
        router.get(
            '/products/:id',
            checkJwt,
            checkUserRole([AppConstants.USER_ROLES.User, AppConstants.USER_ROLES.Admin]),
            this.productsController.getProductById
        )
        router.post(
            '/products',
            checkJwt,
            checkUserRole([AppConstants.USER_ROLES.Admin]),
            ProductsRequestMiddleware.verifyCreateRequest,
            this.productsController.createProduct
        )
        router.put(
            '/products/:id',
            checkJwt,
            checkUserRole([AppConstants.USER_ROLES.Admin]),
            ProductsRequestMiddleware.verifyUpdateRequest,
            this.productsController.updateProduct
        )
        router.post(
            '/products/upload-image',
            this.productsController.uploadImage
        )

    }
}