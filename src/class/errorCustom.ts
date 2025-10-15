export class CustomError extends Error {
  statusCode: number;
  errors?: any;

  constructor(message: string, statusCode: number, errors?: any) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

export class NotFoundError extends CustomError {
  constructor(message: string = "Ressource non trouvée") {
    super(message, 404);
  }
}
