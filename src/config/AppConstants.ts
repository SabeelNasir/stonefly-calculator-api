export class AppConstants {
  static APP_NAME: string = "StoneFlyCalculator";
  static COOKIE_EXPIRY_TIME: number = 1 * (60 * (60 * 1000))   // 1 hour // expressed in milliseconds
  static COOKIE_NAME: string = 'access_token'
  static TOKEN_EXPIRY_TIME: number = AppConstants.COOKIE_EXPIRY_TIME / 1000 // expressed in seconds
  static DEFAULT_DATE_FORMAT: string = "YYYY-MM-DD";
  static DEFAULT_DATE_FORMAT_DB: string = "YYYY-MM-DD HH:MM:SS";
  static DEFAULT_DATE_TIME_FORMAT: string = "YYYY-MM-DD HH:MM:SS";
  static RESPONSE_CODES: any = {
    OK: "OK",
    FAIL: "FAIL",
    NOT_FOUND: "NOT_FOUND"
  };
  static JWT_KEY = process.env.JWT_KEY || "AXSWERTYCHSNSKDYNR@@$$##HFJKSNJD";
  static FILE_UPLOAD_FOLDER = "uploads/";
  static FILE_UPLOAD_MAX_COUNT = 12;
  static FILE_UPLOAD_MAX_SIZE = 5; // in mb
  static USER_TYPES: any = [
    "NOT SET",
    "ADMIN",
    "DATA_OPERATOR"
  ];
  static DEFAULT_PAGE_LIMIT = 50;
  static USER_ROLES: any = {
    Admin: 'Admin',
    User: 'User'
  }
  static jwtSecret = process.env.JWT_SECRET || "jwtSecret"
  static cookieExpiry = 1 * (60 * (60 * 1000))   // 1 hour // expressed in milliseconds
  static ALLOWED_ORIGIN: any = [
    "http://localhost:8081",
    "http://localhost:8080",
    "http://localhost:5000"
  ]
  static corsOptions: any = {
    origin: AppConstants.ALLOWED_ORIGIN.push("http://localhost:" + process.env.PORT),
    credentials: true           // Allow cookie to add automatically in request-headers from client //
  }
  static sessionOptions: any = {
    secret: 'stonefly-calculator',
    resave: 'false',
    saveUninitialized: 'false',
    cookie: {
      secure: true,
      maxAge: AppConstants.cookieExpiry,
    }
  }
}
